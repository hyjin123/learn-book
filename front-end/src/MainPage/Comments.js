import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EachComment from "./EachComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import "./Comments.css";

const Comments = (props) => {
  // Hook for Modal
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  const { resourceId } = props;

  // filter root comments only
  const rootComments = comments.filter((comment) => comment.parent_id === null);

  const handleClose = () => {
    setShow(false);
  };
  // when a user adds a resource to their own topic
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

  console.log(comments);
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
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <EachComment key={rootComment.id} comment={rootComment} />
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
