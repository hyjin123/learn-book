import axios from "axios";
import React, { useState, useEffect } from "react";

const HomePage = (props) => {
  // state for the user's topics
  const [topics, setTopics] = useState([]);
  // destructure props
  const { token, user } = props;
  console.log(user);
  // retrive the topics for a specific user in the database
  useEffect(() => {
    axios
      .get("/topics", {
        user,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // handles when user submits a topic, sends the data to the backend and saves the topic in the database
  const onSubmit = (event) => {
    event.preventDefault();
    // save the topic
    const topic = event.target.topic.value;
    // send an axios post request to input the new topic into the database
    axios
      .post("/topics", {
        user,
        topic,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="homepage">My Resources</h2>
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group">
          <label for="topic">Topic</label>
          <textarea className="form-control" id="topic" rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-primary my-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
