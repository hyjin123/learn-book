import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import EachResource from "./EachResource";

const Resources = (props) => {
  const [resources, setResources] = useState([]);
  // use context that was sent down as prop to know which topic has been selected
  const [selectedTopic] = useOutletContext();
  // get the user ID and topic ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
  const topicId = parseFloat(localStorage.getItem("topic"));
  // make an axios request to retrive all resources for this particular topic
  useEffect(() => {
    axios
      .get("/resources", {
        params: {
          topicId,
        },
      })
      .then((res) => {
        setResources(res.data.resources);
      })
      .catch((err) => console.log(err));
  }, [topicId]);

  // when user clicks to delete the topic
  const onDelete = (event) => {
    event.preventDefault();
    // make an axios put request to delete the topic
    axios
      .post("/topics/delete", {
        userInfo,
        selectedTopic,
      })
      .then((res) => {
        // refreshes the page whenever user deletes a topic, so that the list is updated
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  // make the list of all the resources, map through them and display EachResource component for each resource
  const resourceList = resources.map((resource) => {
    return (
      <EachResource
        id={resource.topic_id}
        name={resource.name}
        description={resource.description}
        link={resource.link}
      />
    );
  });
  return (
    <div>
      <DeleteButton onDelete={onDelete} />
      {resourceList}
      <AddButton userInfo={userInfo} selectedTopic={selectedTopic} />
    </div>
  );
};

export default Resources;
