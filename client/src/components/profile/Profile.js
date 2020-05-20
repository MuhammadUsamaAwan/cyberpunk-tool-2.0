import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserBuilds } from '../../store/actions/userBuilds';
import Spinner from '../layout/Spinner';
import Pagination from '../../ultis/Pagination';
import Moment from 'react-moment';

const Profile = ({
  getUserBuilds,
  builds: { builds, loading },
  profile: { user },
}) => {
  const [currPage, setCurrPage] = useState(1);
  useEffect(() => {
    getUserBuilds(currPage, 20, 'newest', user._id, 'true');
  }, [currPage, user._id, getUserBuilds]);

  return (
    <React.Fragment>
      {!loading ? (
        <div>
          <div className='flex-container-col'>
            <div className='large'>{user.name}</div>
            <p>{user.email}</p>
            <p>{builds.total} Total Builds</p>
            <p>{builds.upvotes} Total Upvotes</p>
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
                    <td>{build.private ? 'Yes' : 'No'}</td>
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  builds: state.userBuilds,
  profile: state.auth,
});

export default connect(mapStateToProps, { getUserBuilds })(Profile);
