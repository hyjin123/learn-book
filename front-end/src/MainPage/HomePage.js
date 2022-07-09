import axios from "axios";
import React, { useState, useEffect } from "react";

const HomePage = (props) => {
  // state for the user's topics
  const [topics, setTopics] = useState([]);
  // destructure props
  const { token, user } = props;
  // useEffect(() => {
  //   axios
  //     .get("/resources", {})
  //     .then((data) => {
  //       console.log(data.rows);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div>
      <h2 className="homepage">My Resources</h2>
      <div></div>
    </div>
  );
};

export default HomePage;
