import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { Link } from "react-router-dom";

const EachResource = (props) => {
  //  destructure props
  const { id, name, description, link } = props;

  return (
    <div className="homepage">
      <div>{name}</div>
      <div>{description}</div>
      <div>{link}</div>
      <div>
        <LinkPreview url={link} width="35%" />
      </div>
    </div>
  );
};

export default EachResource;
