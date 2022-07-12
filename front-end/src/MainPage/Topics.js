import React from "react";
import { Link } from "react-router-dom";
import "./Topics.css";

const Topics = (props) => {
  // destrucure props
  const { topic, setSelectedTopic } = props;
  // when a user clicks on the specific 1 topic
  const onSelect = (event) => {
    event.preventDefault();
    // change the state to the selected topic
    setSelectedTopic(topic);
  };

  return (
    <div>
      <button className="topic" onClick={onSelect}>
        <Link className="topic1" to={`/home/${topic}`}>
          {topic}
        </Link>
      </button>
    </div>
  );
};

export default Topics;
