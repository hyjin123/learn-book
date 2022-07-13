import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Topics.css";

const Topics = (props) => {
  // destrucure props
  const { topicId, topicName, setSelectedTopic } = props;
  // when a user clicks on the specific 1 topic
  const onSelect = (event) => {
    event.preventDefault();
    // change the state to the selected topic
    setSelectedTopic(topicId);
  };
  // add dash to all the spaces. If this is not done, the navLink active state does not work!! for some reason
  const topicURL = topicName.replaceAll(" ", "-");

  return (
    <div className="topic" onClick={onSelect}>
      <NavLink
        exact
        className={({ isActive }) => (isActive ? "activeBtn" : "topic1")}
        to={`/home/${topicURL}`}
        end
      >
        {topicName}
      </NavLink>
    </div>
  );
};

export default Topics;
