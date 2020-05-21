import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../store/actions/profiles';
import { getUserBuilds } from '../../store/actions/userBuilds';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import Pagination from '../../ultis/Pagination';

const Profiles = ({
  getProfile,
  profile,
  match,
  getUserBuilds,
  builds: { builds, loading },
}) => {
  const [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    getProfile(match.params.id);
    getUserBuilds(currPage, 20, 'newest', match.params.id, 'false');
  }, [currPage, match.params.id, getProfile, getUserBuilds]);

  return (
    <React.Fragment>
      {!profile.loading && !loading ? (
        <div>
          <div className='flex-container-col'>
            <div className='large'>{profile.user.name}</div>
            <p>{builds.total} Total Builds</p>
            <p>{builds.upvotes} Total Upvotes</p>
            <p>
              Joined <Moment fromNow>{profile.user.date}</Moment>
            </p>
          </div>
          <div>
            <table className='table'>
              <thead>
                <tr className='secondary'>
                  <th>Title</th>
                  <th>Upvotes</th>
                  <th>Created On</th>
                </tr>
              </thead>

              <tbody className='primary'>
                {builds.results.map(build => (
                  <tr key={build._id}>
                    <td>
                      {' '}
                      <Link to={`/builds/${build._id}`} className='link'>
                        {build.title}
                      </Link>{' '}
                    </td>
                    <td>{build.upvotes.length}</td>
                    <td>
                      <Moment fromNow>{build.date}</Moment>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currPage={currPage}
              setCurrPage={setCurrPage}
              totalPage={builds.pages}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

Profiles.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getUserBuilds: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profiles,
  builds: state.userBuilds,
});

export default connect(mapStateToProps, {
  getProfile,
  getUserBuilds,
})(Profiles);
