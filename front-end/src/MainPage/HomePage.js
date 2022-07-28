import axios from "axios";
import axios1 from "../axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Topics from "./Topics";
import "./HomePage.css";

const HomePage = (props) => {
  // state for the user's topics
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);
  // Hook used to save the value typed in the add new topic field
  const [topic, setTopic] = useState("");

  // destructure props
  const { token } = props;
  // get the user ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
  // disable the button if no topic is typed
  const isTextAreaDisabled = topic.length === 0;

  // retrive the topics for a specific user in the database
  useEffect(() => {
    axios1
      .get("api/topics", {
        params: {
          userInfo,
        },
      })
      .then((res) => {
        const topicsRetrieved = res.data.topics;
        setTopics(topicsRetrieved);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  // handles when user submits a topic, sends the data to the backend and saves the topic in the database
  const onSubmit = (event) => {
    event.preventDefault();
    // save the topic
    const topicAdded = event.target.topic.value;
    // send an axios post request to input the new topic into the database
    axios1
      .post("api/topics", {
        userInfo,
        topic: topicAdded,
      })
      .then((res) => setTopic(""))
      .catch((err) => console.log(err));
    // refreshes the page whenever user inputs new topic, so that the list is updated
    window.location.reload(false);
  };
  console.log(selectedTopic);
  // map through the topics and display a well formatted component for each of them
  const formattedTopics = topics.map((topic) => {
    return (
      <Topics
        key={topic.id}
        topicId={topic.id}
        topicName={topic.name}
        setSelectedTopic={setSelectedTopic}
      />
    );
  });

  return (
    <div>
      <div className="homepage-heading">
        <h2>My Resources</h2>
        <div className="topics">{formattedTopics}</div>
        <form className="form-inline" onSubmit={onSubmit}>
          <div className="form-group form1">
            <input
              type="text"
              className="form-control search-bar"
              id="topic"
              rows="3"
              placeholder="Add New Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            ></input>
            <button
              type="submit"
              className="btn btn-primary my-1"
              disabled={isTextAreaDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Outlet context={[selectedTopic]} />
    </div>
  );
};

export default HomePage;
