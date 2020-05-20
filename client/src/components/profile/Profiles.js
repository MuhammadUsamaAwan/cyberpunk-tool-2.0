import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../store/actions/profiles';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfile, profile, match }) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, []);

  return (
    <React.Fragment>
      {!profile.loading ? (
        <div className='flex-container-col'>
          <div className='large'>{profile.user.name}</div>
          {/* <p>{builds.results.length} Total Builds</p>
            <p>{length} Total Upvotes</p> */}
          <p>
            Joined <Moment fromNow>{profile.user.date}</Moment>
          </p>
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

Profiles.propTypes = {
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profiles,
});

export default connect(mapStateToProps, { getProfile })(Profiles);
