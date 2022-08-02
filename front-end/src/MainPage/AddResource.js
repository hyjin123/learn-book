import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./Explore.css";
import axios from "axios";
import axios1 from "../axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const AddResource = ({
  userId,
  link,
  add,
  topicId,
  name,
  description,
  resourceId,
}) => {
  // Hook for Modal
  const [show, setShow] = useState(false);
  const [topics, setTopics] = useState([]);
  // shows modal once resource has been successfully added
  const [confirm, setConfirm] = useState(false);
  const [inputName, setInputName] = useState(name);
  const [inputDescription, setInputDescription] = useState(description);

  console.log(userId, link, add, topicId, name, description, resourceId);

  const handleClose = () => {
    setShow(false);
    setConfirm(false);
  };

  // when a user adds a resource to their own topic
  const handleShow = () => setShow(true);

  // retrive all topics for the user so they can choose where to add it to
  useEffect(() => {
    axios1
      .get("api/topics", {
        params: {
          userInfo: userId,
        },
      })
      .then((res) => {
        setTopics(res.data.topics);
      })
      .catch((err) => console.log(err));
  }, []);

  // map through the topics and output options for the dropdown menu, if the topic ids match, keep it selected
  const options = topics.map((topic) => {
    return (
      <option
        key={topic.id}
        value={topic.id}
        selected={topicId === topic.id ? "selected" : ""}
      >
        {topic.name}
      </option>
    );
  });

  // handle when user adds the resource to their own profile
  const handleSubmit = (event) => {
    event.preventDefault();
    if (add) {
      // when user adds a resource
      const data = new FormData(event.currentTarget);
      // save all the data
      const topicId = data.get("topic");
      const name = inputName;
      const description = inputDescription;
      const url = data.get("url");
      axios1
        .post("api/resources/add", {
          topicId,
          name,
          description,
          url,
          add,
        })
        .then((res) => {
          // show confirmation that the resource has been added once it's successful in the backend
          setConfirm(true);
        })
        .catch((err) => console.log(err));
    } else {
      // when user edits a resource
      const data = new FormData(event.currentTarget);
      // save all the data
      const topicId = data.get("topic");
      const name = inputName;
      const description = inputDescription;
      const url = data.get("url");
      axios1
        .post("api/resources/edit", {
          topicId,
          name,
          description,
          url,
          resourceId,
          add,
        })
        .then((res) => {
          // show confirmation that the resource has been edited once it's successful in the backend
          setConfirm(true);
        })
        .catch((err) => console.log(err));
    }
  };

  // change the value of name as user edits
  const handleName = (event) => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  // change the value of description as user edits
  const handleDescription = (event) => {
    event.preventDefault();
    setInputDescription(event.target.value);
  };

  return (
    <>
      {add ? (
        <FontAwesomeIcon
          className="icon"
          icon={faPlusSquare}
          onClick={handleShow}
        />
      ) : (
        <Button
          className=" resource-delete-button"
          variant="primary"
          onClick={handleShow}
        >
          Edit
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {add ? (
            <Modal.Title>Add Resource</Modal.Title>
          ) : (
            <Modal.Title>Edit Resource</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="name">
              <Form.Select
                className="search-bar2"
                name="topic"
                aria-label="Topic"
              >
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
                value={inputName}
                onChange={handleName}
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
                value={inputDescription}
                onChange={handleDescription}
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
        {add ? (
          <Modal.Body as="h5">
            This resource has been successfully added to your profile!
          </Modal.Body>
        ) : (
          <Modal.Body as="h5">
            This resource has been successfully edited!
          </Modal.Body>
        )}
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
