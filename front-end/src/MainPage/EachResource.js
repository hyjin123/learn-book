import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { Link } from "react-router-dom";
import "./Resources.css";

const EachResource = (props) => {
  //  destructure props
  const { id, name, description, link } = props;

  return (
    <div className="homepage">
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <LinkPreview url={link} width="400px" />
      </div>
    </div>
  );
};

export default EachResource;
