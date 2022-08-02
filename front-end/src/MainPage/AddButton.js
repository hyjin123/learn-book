import axios from "axios";
import axios1 from "../axios";
import React, { useState, useEffect } from "react";
import "./Button.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddButton = (props) => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { userInfo, topicId } = props;

  const handleClose = () => {
    setShow(false);
    setConfirm(false);
  };

  // when a user adds a resource to their own topic
  const handleShow = () => setShow(true);

  // when user adds a resource
  const handleAdd = (event) => {
    event.preventDefault();
    // when user adds a resource
    const data = new FormData(event.currentTarget);
    // save all the data
    const name = data.get("name");
    const description = data.get("description");
    const url = data.get("url");
    // make an axios request to add the new resource to the database
    axios1
      .post("api/resources/add", {
        topicId,
        name,
        description,
        url,
      })
      .then((res) => {
        console.log(res.data);
        // refreshes the page whenever user adds a new resource, so that the list is updated
        // window.location.reload(false);
        // show confirmation that the resource has been added once it's successful in the backend
        setConfirm(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button
        className="resource-add-button"
        variant="primary"
        onClick={handleShow}
      >
        Add Resource
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleAdd} id="form">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="search-bar2"
                name="name"
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="search-bar2"
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter Description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                className="search-bar2"
                name="url"
                type="text"
                placeholder="Enter URL"
              />
            </Form.Group>
          </Form>
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
      <Modal show={confirm} onHide={handleClose}>
        <Modal.Body as="h5">
          This resource has been successfully added to your profile!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddButton;
