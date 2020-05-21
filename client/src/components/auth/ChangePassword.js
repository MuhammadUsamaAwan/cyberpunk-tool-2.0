import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword } from '../../store/actions/auth';
import { setAlert } from '../../store/actions/alert';

const ChangePassword = ({ setAlert, changePassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    currPassword: '',
    password: '',
    password2: '',
  });

  const { currPassword, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) setAlert('Passwords do not match', 'danger');
    else changePassword(currPassword, password);
  };

  //redirect if not logged in
  if (!isAuthenticated) {
    return <Redirect to='/builds' />;
  }

  return (
    <React.Fragment>
      <h1 className='large primary'>Change Password</h1>
      <p className='lead'>
        <i className='fa fa-user' /> Check Email for Token
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Current Password'
            name='currPassword'
            value={currPassword}
            onChange={onChange}
            required
          />
        </div>
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
            placeholder='Confirm New Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Change' />
      </form>
    </React.Fragment>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  etAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, changePassword })(
  ChangePassword
);
