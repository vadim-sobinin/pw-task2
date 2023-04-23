import React from 'react';
import { IComment, IUser } from '../../@types/types';
import { Comment, IactiveComment } from './Comment';
import { CommentForm } from './CommentForm';
import './comments.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { addNewComment, editComment, removeComment } from '../../redux/slices/commentsSlice';

interface CommentsProps {
  currentUser: IUser | undefined;
  currentCardId: string;
}

export const Comments: React.FC<CommentsProps> = ({ currentUser, currentCardId }) => {
  const dispatch = useAppDispatch();

  const allComments = useAppSelector((state) => state.comments);

  const [activeComment, setActiveComment] = React.useState<null | IactiveComment>(null);

  const comments = allComments.filter((comment) => comment.cardId === currentCardId);

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getReplies = (commentId: string) => {
    return comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => Number(a.id) - Number(b.id));
  };

  const addComment = (text: string, parentId: string | null) => {
    if (currentUser) {
      const newComment: IComment = {
        id: Date.now().toString(),
        parentId: parentId,
        cardId: currentCardId,
        body: text,
        userId: currentUser.id,
        userName: currentUser.name,
      };

      dispatch(addNewComment(newComment));
      setActiveComment(null);
    }
  };

  const updateComment = (text: string, commentId: string) => {
    dispatch(editComment({ commentId: commentId, newBody: text }));
    setActiveComment(null);
  };

  const deleteComment = (commentId: string) => {
    if (window.confirm('Are you sure that you want to delete this comment?'))
      dispatch(removeComment(commentId));
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};
