import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment, removeComment } from '../../store/actions/buildDetail';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Comments = ({
  addComment,
  removeComment,
  isAuthenticated,
  comments,
  buildID,
  user,
}) => {
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    addComment(buildID, text);
    setText('');
  };
  if (isAuthenticated) {
    return (
      <React.Fragment>
        {comments.map(comment => (
          <div key={comment._id}>
            <span>{comment.name} </span>
            <span>
              <Moment fromNow>{comment.date}</Moment> Said:
            </span>
            <div>{comment.text}</div>
            {user._id === comment.user && (
              <i
                onClick={() => {
                  removeComment(buildID, comment._id);
                  setText('');
                }}
                className='fa fa-trash danger'
              />
            )}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <textarea
            value={text}
            onChange={onChange}
            placeholder='Leave a Comment'
          />
          <input value='Add Comment' type='submit' />
        </form>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div>
        {comments.map(comment => (
          <div key={comment._id}>
            <span>{comment.name} </span>
            <span>
              <Moment fromNow>{comment.date}</Moment> Said:
            </span>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
      <div>Log in to comment</div>
    </React.Fragment>
  );
};

Comments.propTypes = {
  addComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userID: PropTypes.string,
};

const mapStateToProps = state => ({
  buildDetail: state.buildDetail,
  isAuthenticated: state.auth.isAuthenticated,
  comments: state.buildDetail.detail.comments,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addComment, removeComment })(
  Comments
);
