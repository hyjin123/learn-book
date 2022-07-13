import React from "react";

const EachResource = (props) => {
  //  destructure props
  const { id, name, description, link } = props;

  return (
    <div className="homepage">
      <div>{name}</div>
      <div>{description}</div>
      <div>{link}</div>
    </div>
  );
};

export default EachResource;
