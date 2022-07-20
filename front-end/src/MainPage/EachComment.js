import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

const EachComment = (props) => {
  const {
    comment,
    replies,
    currentUserId,
    addComment,
    deleteComment,
    activeComment,
    setActiveComment,
    parentId = null,
    updateComment,
  } = props;

  // if five minutes has passed, user cannot edit or reply the comment
  const fiveMin = 300000;
  const timePassed = new Date() - comment.posted_date > fiveMin;
  // make boolean variables for user permission to manage the comments
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.user_id && !timePassed;
  const canDelete = currentUserId === comment.user_id && !timePassed;

  // format the date to look nicely
  const createdAt = new Date(comment.posted_date).toLocaleDateString();

  const isReplying =
    activeComment &&
    activeComment.type === "reply" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "edit" &&
    activeComment.id === comment.id;

  // if we reply on reply, we will put it to the parent comment
  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="/download.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">
            {comment.first_name} {comment.last_name}
          </div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.comment}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.comment}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ type: "reply", id: comment.id })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() => setActiveComment({ type: "edit", id: comment.id })}
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <EachComment
                key={reply.id}
                comment={reply}
                replies={[]}
                addComment={addComment}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                parentId={comment.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EachComment;
