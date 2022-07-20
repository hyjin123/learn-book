import React, { useState } from "react";
import "./Button.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteCommentButton = (props) => {
  // state for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { deleteComment, commentId } = props;

  return (
    <>
      <div className="comment-action" onClick={handleShow}>
        Delete
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            onClick={() => deleteComment(commentId)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCommentButton;
