import React, { useState, useEffect } from "react";
import axios from "axios";
import EachResource from "./EachResource";

const Saved = (props) => {
  // state hook for saved resources
  const [saved, setSaved] = useState([]);
  // get the user ID and topic ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
  // make a request to retrive all the saved resources for this user
  useEffect(() => {
    axios
      .get("api/resources/saved", {
        params: {
          userInfo,
        },
      })
      .then((res) => {
        console.log(res.data.resources);
        const resources = res.data.resources;
        setSaved(resources);
      })
      .catch((err) => console.log(err));
  }, []);

  // make the list of all the resources, map through them and display EachResource component for each resource
  const resourceList = saved.map((resource) => {
    return (
      <EachResource
        key={resource.id}
        topicId={resource.topic_id}
        userId={userInfo}
        ownerId={resource.ownerid}
        ownerFirstName={resource.first_name}
        ownerLastName={resource.last_name}
        id={resource.id}
        name={resource.name}
        description={resource.description}
        link={resource.link}
      />
    );
  });

  return (
    <div>
      <div className="homepage-heading">
        <h2>Saved Resources</h2>
      </div>
      <div className="resource-list">{resourceList}</div>
    </div>
  );
};

export default Saved;
