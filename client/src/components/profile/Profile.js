import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserBuilds } from '../../store/actions/builds';
import Spinner from '../layout/Spinner';
import Pagination from '../../ultis/Pagination';
import Moment from 'react-moment';

const Profile = ({
  getUserBuilds,
  builds: { builds, loading },
  isAuthenticated,
  profile: { user },
  profile,
}) => {
  const [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    getUserBuilds(currPage, 20, 'newest', user._id);
  }, [currPage, user._id]);
  //redirect if not logged in
  if (!isAuthenticated) {
    return <Redirect to='/builds' />;
  }

  let length = 0;
  if (!loading) {
    builds.results.map((build) => (length = build.upvotes.length + length));
  }

  return (
    <React.Fragment>
      {!profile.loading && !loading ? (
        <div>
          <div className='flex-container'>
            <div className='large'>{user.name}</div>
            <p>{user.email}</p>
            <p>{builds.results.length} Total Builds</p>
            <p>{length} Total Upvotes</p>
            <p>
              Joined <Moment fromNow>{user.date}</Moment>
            </p>
            <p>
              <Link to='/changepassword'>Change Password?</Link>
            </p>
          </div>
          <div>
            <table className='table'>
              <thead>
                <tr className='secondary'>
                  <th>Title</th>
                  <th>Upvotes</th>
                  <th>Private</th>
                  <th>Created On</th>
                </tr>
              </thead>

              <tbody className='primary'>
                {builds.results.map((build) => (
                  <tr key={build._id}>
                    <td>
                      {' '}
                      <Link to={`/builds/${build._id}`} className='link'>
                        {build.title}
                      </Link>{' '}
                    </td>
                    <td>{build.upvotes.length}</td>
                    <td>
                      <Link to={`/profile/${build.private}`} className='link'>
                        {build.name}
                      </Link>
                    </td>
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

Profile.propTypes = {
  getUserBuilds: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  builds: state.profile,
  profile: state.auth,
});

export default connect(mapStateToProps, { getUserBuilds })(Profile);
