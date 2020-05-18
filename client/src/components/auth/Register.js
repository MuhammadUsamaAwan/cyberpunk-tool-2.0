import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    }
    register({ name, email, password });
  };

  // Redirect is success
  if (isAuthenticated) {
    return <Redirect to='/builds' />;
  }

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
