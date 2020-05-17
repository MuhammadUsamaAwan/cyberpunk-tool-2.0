const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewave/auth');

const Build = require('../../models/Build');
const User = require('../../models/User');

// @route    POST api/builds
// @desc     Create a new build
// @access   Private
router.post(
  '/',
  [auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newBuild = new Build({
        text: req.body.text,
        title: req.body.title,
        name: user.name,
        user: req.user.id,
        private: req.body.private
      });

      const build = await newBuild.save();

      res.json(build);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/builds
// @desc     Get all builds
// @access   Public
router.get('/', async (req, res) => {
  try {
    const builds = await Build.find().sort({ date: -1 });
    res.json(builds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/builds/:id
// @desc     Get build by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    // Check for ObjectId format and build
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !build) {
      return res.status(404).json({ msg: 'Build not found' });
    }

    res.json(build);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/builds/:id
// @desc     Delete a build
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    // Check for ObjectId format and build
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !build) {
      return res.status(404).json({ msg: 'Build not found' });
    }

    // Check user
    if (build.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await build.remove();

    res.json({ msg: 'Build removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/builds/upvote/:id
// @desc     upvote a build
// @access   Private
router.put('/upvote/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    // Check if the build has already been upvoted
    if (
      build.upvotes.some((upvote) => upvote.user.toString() === req.user.id)
    ) {
      return res.status(400).json({ msg: 'Build already upvoted' });
    }

    build.upvotes.unshift({ user: req.user.id });

    await build.save();

    return res.json(build.upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/builds/devote/:id
// @desc     devote a build
// @access   Private
router.put('/devote/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    // Check if the build has already been upvoted
    if (
      !build.upvotes.some((upvote) => upvote.user.toString() === req.user.id)
    ) {
      return res.status(400).json({ msg: 'Build has not yet been upvoted' });
    }

    // remove the upvote
    build.upvotes = build.upvotes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await build.save();

    return res.json(build.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/builds/comment/:id
// @desc     Comment on a build
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const build = await Build.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      build.comments.push(newComment);

      await build.save();

      res.json(build.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/builds/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    // Pull out comment
    const comment = build.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    build.comments = build.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await build.save();

    return res.json(build.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    POST api/builds/comment/:id/:comment_id/reply
// @desc     Reply on a comment
// @access   Private
router.post(
  '/comment/:id/:comment_id/reply',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const build = await Build.findById(req.params.id);

      // Pull out comment
      const comment = build.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      const newReply = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      comment.replies.push(newReply);

      await build.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/builds/comment/:id/:comment_id/reply/:reply_id
// @desc     Delete reply on a comment
// @access   Private
router.delete(
  '/comment/:id/:comment_id/reply/:reply_id',
  auth,
  async (req, res) => {
    try {
      const build = await Build.findById(req.params.id);

      // Pull out comment
      const comment = build.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Pull out reply
      const reply = comment.replies.find(
        (reply) => reply.id === req.params.reply_id
      );
      // Make sure reply exists
      if (!reply) {
        return res.status(404).json({ msg: 'Reply does not exist' });
      }
      // Check user
      if (reply.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      comment.replies = comment.replies.filter(
        ({ id }) => id !== req.params.reply_id
      );

      await build.save();

      return res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
