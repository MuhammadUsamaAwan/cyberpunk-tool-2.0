import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getBuilds } from '../../store/actions/userBuilds';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Pagination from '../../ultis/Pagination';
import Moment from 'react-moment';

const Builds = ({ getBuilds, builds: { builds, loading } }) => {
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [sort, setSort] = useState('');

  useEffect(() => {
    getBuilds(currPage, 20, sort, text);
  }, [currPage, sort, text, getBuilds]);

  const onChange = e => setSearchText(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    setCurrPage(1);
    setText(searchText);
  };
  const onClick = e => {
    setCurrPage(1);
    setSort(e.target.id);
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
            <a
              id='upvotes'
              href='#!'
              onClick={onClick}
              className='dropdown-link'
            >
              By Upvotes
            </a>
            <a
              id='newest'
              href='#!'
              onClick={onClick}
              className='dropdown-link'
            >
              Newest First
            </a>
            <a
              id='oldest'
              href='#!'
              onClick={onClick}
              className='dropdown-link'
            >
              Oldest First
            </a>
          </div>
        </div>
      </div>
      {!loading ? (
        <div>
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
                    <Link to={`/profile/${build.user}`} className='link'>
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
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

Builds.propTypes = {
  getBuilds: PropTypes.func.isRequired,
  build: PropTypes.array,
};

const mapStateToProps = state => ({
  builds: state.builds,
});

export default connect(mapStateToProps, { getBuilds })(Builds);
