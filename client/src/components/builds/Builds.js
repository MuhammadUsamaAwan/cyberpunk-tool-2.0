import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getBuilds,
  sortBuilds,
  searchBuilds,
} from '../../store/actions/builds';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Builds = ({
  getBuilds,
  builds: { builds, loading },
  sortBuilds,
  searchBuilds,
}) => {
  useEffect(() => {
    getBuilds(1, 20);
  }, []);

  const [searchText, setSearchText] = useState('');

  const onChange = (e) => setSearchText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    searchBuilds(1, 20, 'newest', searchText);
  };

  return (
    <React.Fragment>
      <h1 className='large text-center'>Builds</h1>
      <div className='flex-container-no-rs'>
        <form className='flex-container-no-rs' onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='By Title or Author...'
            className='search'
            value={searchText}
            onChange={onChange}
          />
          <button type='submit' className='search-icon'>
            <i className='fa fa-search'></i>
          </button>
        </form>
        <div className='dropdown'>
          <button>
            Sort Builds <i className='fa fa-sort-desc'></i>
          </button>
          <div className='dropdown-content'>
            <div
              onClick={() => sortBuilds(1, 20, 'upvotes')}
              className='dropdown-link'
            >
              By Upvotes
            </div>
            <div
              onClick={() => sortBuilds(1, 20, 'newest')}
              className='dropdown-link'
            >
              Newest First
            </div>
            <div
              onClick={() => sortBuilds(1, 20, 'oldest')}
              className='dropdown-link'
            >
              Oldest First
            </div>
          </div>
        </div>
      </div>
      {!loading ? (
        <table className='table'>
          <thead>
            <tr className='secondary'>
              <th>Title</th>
              <th>Upvotes</th>
              <th>Author</th>
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
                  <Link to={`/profile/${build.user}`} className='link'>
                    {build.name}
                  </Link>
                </td>
                <td>{build.date.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

Builds.propTypes = {
  getBuilds: PropTypes.func.isRequired,
  sortBuilds: PropTypes.func.isRequired,
  searchBuilds: PropTypes.func.isRequired,
  build: PropTypes.array,
};

const mapStateToProps = (state) => ({
  builds: state.builds,
});

export default connect(mapStateToProps, {
  getBuilds,
  sortBuilds,
  searchBuilds,
})(Builds);
