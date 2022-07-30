import React, { useState } from "react";
import "./Button.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";

const DeleteResourceButton = (props) => {
  // state for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, onDeleteResource } = props;

  return (
    <>
      <Button
        className=" resource-delete-button"
        variant="primary"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this resource? (You will not be able
          to reverse this action)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            onClick={onDeleteResource}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteResourceButton;
