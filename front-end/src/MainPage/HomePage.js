import axios from "axios";
import React, { useState, useEffect } from "react";
import Topics from "./Topics";

const HomePage = (props) => {
  // state for the user's topics
  const [topics, setTopics] = useState([]);
  // destructure props
  const { token } = props;
  // get the user ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
  // retrive the topics for a specific user in the database
  useEffect(() => {
    axios
      .get("/topics", {
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
    const topic = event.target.topic.value;
    // send an axios post request to input the new topic into the database
    axios
      .post("/topics", {
        userInfo,
        topic,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // refreshes the page whenever user inputs new topic, so that the list is updated
    window.location.reload(false);
  };
  console.log(topics);
  // map through the topics and display a well formatted component for each of them
  const formattedTopics = topics.map((topic) => {
    return <Topics key={topic.id} topic={topic.name} />;
  });

  return (
    <div>
      <h2 className="homepage">My Resources</h2>
      <div className="topics">{formattedTopics}</div>
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
