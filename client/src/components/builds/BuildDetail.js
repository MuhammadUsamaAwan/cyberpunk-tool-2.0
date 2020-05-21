import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getBuildDetail,
  upvote,
  devote,
} from '../../store/actions/buildDetail';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import Comments from './Comments';

const BuildDetail = ({
  buildDetail: { loading, detail },
  getBuildDetail,
  upvote,
  devote,
  match,
  auth,
}) => {
  useEffect(() => {
    getBuildDetail(match.params.id);
  }, [getBuildDetail, match.params.id]);

  const onClick = e => {
    if (auth.isAuthenticated) {
      if (alreadyUpvoted) devote(detail._id);
      else upvote(detail._id);
    }
  };

  if (loading) return <Spinner />;
  let alreadyUpvoted = false;
  if (auth.isAuthenticated)
    alreadyUpvoted = detail.upvotes
      .map(upvote => upvote.user.includes(auth.user._id))
      .includes(true);
  return (
    <React.Fragment>
      <div className='flex-container-col'>
        <div className='large'>
          {detail.title}{' '}
          <i
            onClick={onClick}
            id='up'
            className={
              alreadyUpvoted
                ? 'fa fa-thumbs-up primary'
                : 'fa fa-thumbs-up white'
            }
          />
        </div>
        <p>Submitted by {detail.name}</p>
        <p>{detail.upvotes.length} Upvotes</p>
        <p>
          Submitted <Moment fromNow>{detail.date}</Moment>
        </p>
      </div>
      <Comments buildID={detail._id} />
    </React.Fragment>
  );
};

BuildDetail.propTypes = {
  getBuildDetail: PropTypes.func.isRequired,
  buildDetail: PropTypes.object,
  auth: PropTypes.object.isRequired,
  upvote: PropTypes.func.isRequired,
  devote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  buildDetail: state.buildDetail,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBuildDetail, upvote, devote })(
  BuildDetail
);
