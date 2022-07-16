import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Explore.css";
import axios from "axios";

const Explore = (props) => {
  // state hook to keep track of the search bar
  const [search, setSearch] = useState("");

  // change the value of search everytime there is a change in the search bar
  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // send a request to the backend with the search value and return the filtered list
  useEffect(() => {
    axios
      .get("resources/search", {
        params: {
          search,
        },
      })
      .then((res) => {
        console.log(res.data.resources);
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <div className="explore-page">
      <Form>
        <Form.Group
          className="mb-3 search-button"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Search</Form.Label>
          <Form.Control
            size="sm"
            as="textarea"
            rows={1}
            value={search}
            placeholder="Search"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Explore;
