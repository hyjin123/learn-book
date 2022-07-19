import React, { useState, useEffect } from "react";
import axios from "axios";
import Topics from "./Topics";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./Avatar";

const Profile = () => {
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  // get the user ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));

  useEffect(() => {
    Promise.all([
      axios.get("/profile", {
        params: {
          userInfo,
        },
      }),
      axios.get("/topics", {
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
        <h5>First Name: {user["first_name"]}</h5>
        <h5>Last Name: {user["last_name"]}</h5>

        <div className="topics">
          <h6>Your Topics:</h6>
          {formattedTopics}
        </div>
      </div>
    </div>
  );
};

export default Profile;
