import React from 'react';
import Hero from './Hero';
import { Redirect } from 'react-router-dom';
import Features from './Features';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/builds' />;
  }
  return (
    <React.Fragment>
      <Hero />
      <Features />
    </React.Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
