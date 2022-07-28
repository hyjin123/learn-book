import axios from "axios";
import axios1 from "../axios";
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
  const [selectedTopic, setSelectedTopic] = useState(0);

  // get the ownerId from the URL
  const { ownerId } = useParams();

  const navigate = useNavigate();

  // get the topics for this selected user
  // check if the resource is already liked by this user or not. Set the like to true if it is or false if it isnt
  useEffect(() => {
    Promise.all([
      axios1.get("api/topics", {
        params: {
          userInfo: ownerId,
        },
      }),
      axios1.get("api/profile", {
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
    return (
      <Topics
        key={topic.id}
        ownerId={ownerId}
        topicId={topic.id}
        topicName={topic.name}
        setSelectedTopic={setSelectedTopic}
      />
    );
  });

  return (
    <div>
      <div className="homepage-heading">
        <button
          onClick={() => navigate("/explore")}
          className="btn btn-primary"
        >
          Go Back to Exploring
        </button>
        <h2 className="profile-header">Profile</h2>
        <Avatar
          style={{ width: "200px", height: "200px" }}
          avatarStyle="Circle"
          topType="LongHairMiaWallace"
          accessoriesType="Prescription02"
          hairColor="BrownDark"
          facialHairType="Blank"
          clotheType="Hoodie"
          clotheColor="PastelBlue"
          eyeType="Happy"
          eyebrowType="Default"
          mouthType="Smile"
          skinColor="Light"
        />
        <div className="profile-name">
          {firstName} {lastName}
        </div>
        <div className="topics">
          <h6>Topics:</h6>
          {formattedTopics}
        </div>
      </div>
      <Outlet context={[selectedTopic, ownerId]} />
    </div>
  );
};

export default User;
