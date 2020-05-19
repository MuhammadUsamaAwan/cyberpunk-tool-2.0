import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../store/actions/auth';
import ForgotPassword from './ForgotPassword';

const ResetPassword = ({ resetPassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    token: '',
  });

  const { password, password2, token } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    resetPassword(password, password2, token);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/builds' />;
  }

  return (
    <React.Fragment>
      <h1 className='large primary'>Reset Password</h1>
      <p className='lead'>
        <i className='fa fa-user' /> Check Email for Token
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='New Password'
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
            minLength='6'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Token From Email'
            name='token'
            value={token}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Reset' />
      </form>
    </React.Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
