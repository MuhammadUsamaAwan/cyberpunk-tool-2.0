import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    human: false,
  });

  const { name, email, password, password2, human } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) setAlert('Passwords do not match', 'danger');
    else if (human === false)
      setAlert('Please verify that you are human', 'danger');
    else register({ name, email, password });
  };

  // Redirect is success
  if (isAuthenticated) {
    return <Redirect to='/builds' />;
  }

  const verifyCallback = () => setFormData({ ...formData, human: true });
  const expiredCallback = () => setFormData({ ...formData, human: false });

  return (
    <React.Fragment>
      <h1 className='large primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fa fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <Recaptcha
          sitekey='6LdXFfcUAAAAADxbTZEZ4-vwouOQCAHC0FX4t3Hm'
          render='explicit'
          verifyCallback={verifyCallback}
          expiredCallback={expiredCallback}
          theme='dark'
        />
        <input type='submit' className='btn' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link className='primary' to='/login'>
          Sign In
        </Link>
      </p>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
