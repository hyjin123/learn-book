import axios from "axios";
import React from "react";
import { useParams, useOutletContext } from "react-router";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";

const Resources = (props) => {
  // use context that was sent down as prop to know which topic has been selected
  const [selectedTopic] = useOutletContext();
  // get the user ID from the local storage
  const userInfo = parseFloat(localStorage.getItem("userinfo"));
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
  return (
    <div>
      <div className="homepage">{selectedTopic}</div>
      <DeleteButton onDelete={onDelete} />
      <AddButton onDelete={onDelete} />
    </div>
  );
};

export default Resources;
