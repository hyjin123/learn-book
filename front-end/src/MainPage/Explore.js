import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import EachResource from "./EachResource";
import "./Explore.css";
import axios from "axios";
import axios1 from "../axios";

const Explore = (props) => {
  // state hook to keep track of the search bar
  const [search, setSearch] = useState("");
  // state hook to store the searched resources (to be displayed)
  const [searched, setSearched] = useState([]);
  // get the user ID and topic ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
  // change the value of search everytime there is a change in the search bar
  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // send a request to the backend with the search value and return the filtered list
  useEffect(() => {
    axios1
      .get("api/resources/search", {
        params: {
          search,
        },
      })
      .then((res) => {
        setSearched(res.data.resources);
      })
      .catch((err) => console.log(err));
  }, [search]);

  // make the list of all the resources, map through them and display EachResource component for each resource
  const resourceList = searched.map((resource) => {
    return (
      <EachResource
        key={resource.id}
        topicId={resource.topic_id}
        userId={userInfo}
        ownerId={resource.userid}
        ownerFirstName={resource.first_name}
        ownerLastName={resource.last_name}
        id={resource.id}
        name={resource.name}
        description={resource.description}
        link={resource.link}
      />
    );
  });
  return (
    <div className="explore-page">
      <Form>
        <Form.Group
          className="mb-3 search-button"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label className="search-text">
            Explore Other Resources
          </Form.Label>
          <Form.Control
            className="search-bar"
            size="md"
            as="input"
            rows={1}
            value={search}
            placeholder="Search"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <div className="resource-list">{resourceList}</div>
    </div>
  );
};

export default Explore;
