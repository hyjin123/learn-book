import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EachComment from "./EachComment";
import CommentForm from "./CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import "./Comments.css";

const Comments = (props) => {
  // Hook for Modal
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const { resourceId, userId } = props;

  // filter root comments only
  const rootComments = comments
    .filter((comment) => comment.parent_id === null)
    .sort(
      (a, b) =>
        new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
    );

  // function to get replies for a specific comment, display in descending order for posted date
  const getReplies = (commentId) => {
    return comments
      .filter((comment) => comment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.posted_date).getTime() - new Date(b.posted_date).getTime()
      );
  };

  // function to add comment
  const addComment = (text, parentId) => {
    console.log("addcomment", text, parentId);
    // make an axios request to save the comment to the database
    axios
      .post("/comments", {
        text,
        parentId,
        resourceId,
        userId,
      })
      .then((res) => {
        const comment = res.data.comment[0];
        setComments([comment, ...comments]);
        setActiveComment(null);
      })
      .catch((err) => console.log(err));
  };

  // fetch replies
  const handleClose = () => {
    setShow(false);
  };
  // get all comments for this resource
  const handleShow = () => {
    setShow(true);
    // get all the comments from the backend when the comment button is clicked
    axios
      .get("/comments", {
        params: {
          resourceId,
        },
      })
      .then((res) => {
        const comments = res.data.comments;
        setComments(comments);
      })
      .catch((err) => console.log(err));
  };

  // deleting a comment
  const deleteComment = (commentId) => {
    // make a backend request to delete the comment from the database
    axios
      .post("/comments/delete", {
        commentId,
      })
      .then((res) => {
        // once delete is successful, make a update list of comments
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
      })
      .catch((err) => console.log(err));
  };

  // update a comment
  const updateComment = (text, commentId) => {
    // make a backend request to update the comment from the database
    axios
      .post("/comments/update", {
        text,
        commentId,
      })
      .then((res) => {
        // once update is successful, make a update list of comments
        console.log(res.data.comment[0]);
        // update the list with the new text
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, comment: text };
          }
          return comment;
        });
        setComments(updatedComments);
        setActiveComment(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <FontAwesomeIcon
        className="icon"
        icon={faCommentDots}
        onClick={handleShow}
      />
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="comments">
            <div className="comment-form-title">Write a Comment</div>
            <CommentForm submitLabel="Comment" handleSubmit={addComment} />
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <EachComment
                  key={rootComment.id}
                  currentUserId={userId}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            form="form"
            type="submit"
            variant="primary"
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comments;
