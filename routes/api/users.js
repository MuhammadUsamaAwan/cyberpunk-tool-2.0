const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Build = require('../../models/Build');
const auth = require('../../middlewave/auth');
const nodemailer = require('nodemailer');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name must be between 6 and 20 characters').isLength({
      min: 6,
      max: 20,
    }),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password between 6 and 20 characters'
    ).isLength({ min: 6, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      } else if (await User.findOne({ name })) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Username already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password -token');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/me
// @desc     Get current user
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -token');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/user/:id
// @desc     Get user by user ID
// @access   Public
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -token');
    if (!user) return res.status(400).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/changename
// @desc     Change username
// @access   Private
router.post(
  '/changename',
  [
    auth,
    [
      check('name', 'Name must be between 6 and 20 characters').isLength({
        min: 6,
        max: 20,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
      if (await User.findOne({ name })) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Username already exists' }] });
      }
      const user = await User.findOneAndUpdate(req.user.id, { name: name });
      res.json('Username changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/changepassword
// @desc     Change password
// @access   Private
router.post(
  '/changepassword',
  [
    auth,
    [
      check('password', 'Old password is required').exists(),
      check(
        'newPassword',
        'Please enter a new password between 6 and 20 characters'
      ).isLength({ min: 6, max: 20 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { password, newPassword } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Old password is not correct' }] });
      }

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(req.user.id, {
        password: newPassword,
      });
      res.json('Password changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/resetpassword
// @desc     resets user password
// @access   Public
router.post(
  '/resetpassword',
  [
    check(
      'password',
      'Please enter a password between 6 and 20 characters'
    ).isLength({ min: 6, max: 20 }),
    check('token', 'Token not valid').isLength({ min: 19, max: 21 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { password, token } = req.body;
    try {
      const user = await User.findOne({ token });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Token not valid' }] });
      }

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { token },
        {
          password,
        }
      );
      res.json('Password changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/forgotpassword
// @desc     Sends password through email
// @access   Public
router.post(
  '/forgotpassword',
  [check('email', 'Email is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User do not exist' }] });
      }
      async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: config.get('gmailUser'), // generated ethereal user
            pass: config.get('gmailPass'), // generated ethereal password
          },
        });
        function makeid(length) {
          var result = '';
          var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        const token = makeid(20);
        await User.findOneAndUpdate(
          { email },
          {
            token,
          }
        );
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '<noreply@cyberpunktool.com>', // sender address
          to: user.email, // list of receivers
          subject: 'Reset your cyberpunktool password', // Subject line
          html:
            '<h3>Hello ' +
            user.name +
            "</h3><p>Someone has requested a link to change your password. You can do this through the link below.</p><a href='http://localhost:3000/changepassword/'>Change my Password</a> <h4>Your Token is " +
            token +
            "</h4> <p>If you didn't request this, please ignore this email. Your password won't change until you access the link above and use the token to create a new one<p>", // html body
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email Sent');
      }

      main().catch(console.error);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
