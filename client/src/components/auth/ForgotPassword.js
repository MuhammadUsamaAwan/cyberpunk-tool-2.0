import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPassword } from '../../store/actions/auth';

const ForgotPassword = ({ forgotPassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/builds' />;
  }

  return (
    <React.Fragment>
      <h1 className='large primary'>Forgot Password?</h1>
      <p className='lead'>
        <i className='fa fa-user' /> Enter Your Email
      </p>
      <form className='form' onSubmit={onSubmit}>
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
        <input type='submit' className='btn btn-primary' value='Send Email' />
      </form>
      <p className='my-1'>
        Don't have an account?{' '}
        <Link className='primary' to='/register'>
          Sign Up
        </Link>
      </p>
    </React.Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
