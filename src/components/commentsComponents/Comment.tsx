import React from 'react';
import { IComment } from '../../@types/types';
import userIcon from '../../assets/img/user-icon.png';
import { CommentForm } from './CommentForm';
import { useAppSelector } from '../../hooks/hook';

interface CommentProps {
  comment: IComment;
  replies: IComment[];
  deleteComment: (commentId: string) => void;
  activeComment: IactiveComment | null;
  setActiveComment: React.Dispatch<React.SetStateAction<IactiveComment | null>>;
  parentId?: null | string;
  addComment: (text: string, replyId: string | null) => void;
  updateComment: (text: string, commentId: string) => void;
}

export interface IactiveComment {
  id: string;
  type: string;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  replies,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  updateComment,
}) => {
  const currentUserId = useAppSelector((state) => state.users.currentUser.id);

  const canEdit = currentUserId === comment.userId;
  const canReply = !Boolean(comment.parentId);

  const isReplying =
    activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
  const isEditing =
    activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  const createdAt =
    new Date(Number(comment.id)).toLocaleTimeString() +
    ' ' +
    new Date(Number(comment.id)).toLocaleDateString();

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={userIcon} alt="user icon" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userName}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleFormSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>
              Edit
            </div>
          )}
          {canEdit && (
            <div className="comment-action" onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>

        {isReplying && (
          <CommentForm submitLabel="Reply" handleFormSubmit={(text) => addComment(text, replyId)} />
        )}
        {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                deleteComment={deleteComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
                addComment={addComment}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
