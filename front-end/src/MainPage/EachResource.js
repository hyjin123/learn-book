import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import DeleteResourceButton from "./DeleteResourceButton";
import "./Resources.css";
import axios from "axios";

const EachResource = (props) => {
  //  destructure props
  const { topicId, id, name, description, link } = props;

  // when a user deletes a single resource
  const onDeleteResource = (event) => {
    event.preventDefault();
    // make an axios request to delete the resource
    axios
      .post("/resources/delete", {
        id,
      })
      .then((res) => {
        console.log(res.data);
        // refreshes the page whenever user deletes a resource, so that the list is updated
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="each-resource-section">
      <div className="resource-name">{name}</div>
      <div className="resource-description">{description}</div>
      <div>
        <LinkPreview url={link} width="400px" />
      </div>
      <DeleteResourceButton id={id} onDeleteResource={onDeleteResource} />
    </div>
  );
};

export default EachResource;
