import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router";
import Topics from "./Topics";
import "./HomePage.css";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./Avatar";

const User = (props) => {
  // state for the user's topics
  const [topics, setTopics] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // get the ownerId from the URL
  const { ownerId } = useParams();

  const navigate = useNavigate();

  // get the topics for this selected user
  // check if the resource is already liked by this user or not. Set the like to true if it is or false if it isnt
  useEffect(() => {
    Promise.all([
      axios.get("/topics", {
        params: {
          userInfo: ownerId,
        },
      }),
      axios.get("/profile", {
        params: {
          userInfo: ownerId,
        },
      }),
    ])
      .then((all) => {
        const topicsRetrieved = all[0].data.topics;
        const firstName = all[1].data.name[0].first_name;
        const lastName = all[1].data.name[0].last_name;
        setFirstName(firstName);
        setLastName(lastName);
        setTopics(topicsRetrieved);
      })
      .catch((err) => console.log(err));
  }, []);

  // map through the topics and display a well formatted component for each of them
  const formattedTopics = topics.map((topic) => {
    return <Topics key={topic.id} topicId={topic.id} topicName={topic.name} />;
  });

  return (
    <div>
      <div className="homepage-heading">
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
        <h2>Profile</h2>
        <Avatar
          style={{ width: "200px", height: "200px" }}
          avatarStyle="Circle"
          {...generateRandomAvatarOptions()}
        />
        <h5>First Name: {firstName}</h5>
        <h5>Last Name: {lastName}</h5>
        <div className="topics">
          <h6>Topics:</h6>
          {formattedTopics}
        </div>
      </div>
    </div>
  );
};

export default User;
