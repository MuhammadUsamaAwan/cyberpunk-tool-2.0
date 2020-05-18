import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <li>
      <a onClick={logout} href='#!'>
        <i className='fa fa-sign-out' /> <span className='hide-sm'>Logout</span>
      </a>
    </li>
  );
  const guestLinks = (
    <li>
      <Link to='/login'>Login</Link>
    </li>
  );
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>Cyberpunk Tool</Link>
      </h1>
      <ul>
        <li>
          <Link to='/planner'>Planner</Link>
        </li>
        <li>
          <Link to='/builds'>Builds</Link>
        </li>

        {!loading && (
          <React.Fragment>
            {isAuthenticated ? authLinks : guestLinks}
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
