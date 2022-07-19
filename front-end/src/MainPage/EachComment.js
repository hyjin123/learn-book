import React, { useState, useEffect } from "react";

const EachComment = (props) => {
  const { comment } = props;
  console.log(comment);

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
          <div>{comment.posted_date}</div>
        </div>
        <div className="comment-text">{comment.comment}</div>
      </div>
    </div>
  );
};

export default EachComment;
