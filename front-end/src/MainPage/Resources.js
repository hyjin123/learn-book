import React from "react";
import { useParams, useOutletContext } from "react-router";

const Resources = (props) => {
  // use context that was sent down as prop to know which topic has been selected
  const [selectedTopic] = useOutletContext();
  return <div className="homepage">{selectedTopic}</div>;
};

export default Resources;
