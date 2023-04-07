import React from 'react';
import CommentItem from './CommentItem';
interface ICommentFeed {
  comments?: Record<string, any>[];
}
const CommentFeed: React.FC<ICommentFeed> = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <CommentItem key={comment.id} data={comment} />
        </div>
      ))}
    </>
  );
};

export default CommentFeed;
