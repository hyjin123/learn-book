import React, { useState, useEffect } from "react";
import axios from "axios";
import Topics from "./Topics";
import Avatar from "avataaars";
import "./Profile.css";
import { generateRandomAvatarOptions } from "./Avatar";

const Profile = () => {
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  // get the user ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));

  useEffect(() => {
    Promise.all([
      axios.get("api/profile", {
        params: {
          userInfo,
        },
      }),
      axios.get("api/topics", {
        params: {
          userInfo,
        },
      }),
    ])
      .then((all) => {
        const user = all[0].data.name[0];
        const topicsArray = all[1].data.topics;
        setTopics(topicsArray);
        setUser(user);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  // map through the topics and display a well formatted component for each of them
  const formattedTopics = topics.map((topic) => {
    return <Topics key={topic.id} topicId={topic.id} topicName={topic.name} />;
  });

  return (
    <div>
      <div className="homepage-heading">
        <h2>Your Profile</h2>
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
          {user["first_name"]} {user["last_name"]}
        </div>

        <div className="topics">
          <h6>Your Topics:</h6>
          {formattedTopics}
        </div>
      </div>
    </div>
  );
};

export default Profile;
