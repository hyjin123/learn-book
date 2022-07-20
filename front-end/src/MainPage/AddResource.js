import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Explore.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlusSquare as faSolidPlusSquare } from "@fortawesome/free-solid-svg-icons";

const AddResource = (props) => {
  // Hook for Modal
  const [show, setShow] = useState(false);
  const [topics, setTopics] = useState([]);
  // shows modal once resource has been successfully added
  const [confirm, setConfirm] = useState(false);

  const { userId, link } = props;

  const handleClose = () => {
    setShow(false);
    setConfirm(false);
  };
  // when a user adds a resource to their own topic
  const handleShow = () => setShow(true);

  // retrive all topics for the user so they can choose where to add it to
  useEffect(() => {
    axios
      .get("/topics", {
        params: {
          userInfo: userId,
        },
      })
      .then((res) => {
        setTopics(res.data.topics);
      })
      .catch((err) => console.log(err));
  }, []);

  // map through the topics and output options for the dropdown menu
  const options = topics.map((topic) => {
    return (
      <option key={topic.id} value={topic.id}>
        {topic.name}
      </option>
    );
  });

  // handle when user adds the resource to their own profile
  const handleAdd = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // save all the data
    const topicId = data.get("topic");
    const name = data.get("name");
    const description = data.get("description");
    const url = data.get("url");
    console.log(topicId, name, description, url);
    axios
      .post("/resources/add", {
        topicId,
        name,
        description,
        url,
      })
      .then((res) => {
        // show confirmation that the resource has been added once it's successful in the backend
        setConfirm(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FontAwesomeIcon
        className="icon"
        icon={faPlusSquare}
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleAdd} id="form">
            <Form.Group className="mb-3" controlId="name">
              <Form.Select
                className="search-bar2"
                name="topic"
                aria-label="Topic"
              >
                <option>Select topic</option>
                {options}
              </Form.Select>
            </Form.Group>

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
                readOnly
                name="url"
                value={link}
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
          This resource has been added to your profile!
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

export default AddResource;
