import React, { useState, useEffect } from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import DeleteResourceButton from "./DeleteResourceButton";
import "./Resources.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faSolidThumbsUp,
  faBookmark as faSolidBookmark,
} from "@fortawesome/free-solid-svg-icons";

const EachResource = (props) => {
  // use hook to set the state of liked or saved resource
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  //  destructure props
  const {
    topicId,
    ownerFirstName,
    ownerLastName,
    userId,
    id,
    name,
    description,
    link,
  } = props;

  // check if the resource is already liked by this user or not. Set the like to true if it is or false if it isnt
  useEffect(() => {
    Promise.all([
      axios.get("/likes", {
        params: {
          id,
          userId,
        },
      }),
      axios.get("/saves", {
        params: {
          id,
          userId,
        },
      }),
    ]).then((all) => {
      const likesArray = all[0].data.likes;
      const savesArray = all[1].data.saves;
      //  if the resource is liked by this user, set like state to true. if not, false
      if (likesArray.length >= 1) {
        setLike(true);
      } else {
        setLike(false);
      }
      //  if the resource is saved by this user, set save state to true. if not, false
      if (savesArray.length >= 1) {
        setSave(true);
      } else {
        setSave(false);
      }
    });
  }, []);

  // when a user likes a resource
  const onLike = (event) => {
    event.preventDefault();
    // toggle between true and false
    setLike((current) => !current);
    // make an axios request to change likes
    axios
      .post("/likes", {
        like,
        id,
        userId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // when a user saves a resource
  const onSave = (event) => {
    event.preventDefault();
    // toggle between true and false to display different icon
    setSave((current) => !current);
    // make an axios request to change saves
    axios
      .post("/saves", {
        save,
        id,
        userId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

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
      <div className="resource-preview">
        <LinkPreview url={link} width="400px" />
      </div>
      {ownerFirstName && (
        <div>
          By {ownerFirstName} {ownerLastName}
        </div>
      )}
      <div className="icons">
        {!like ? (
          <FontAwesomeIcon
            className="icon"
            icon={faThumbsUp}
            onClick={onLike}
          />
        ) : (
          <FontAwesomeIcon
            className="icon"
            icon={faSolidThumbsUp}
            onClick={onLike}
          />
        )}
        {!save ? (
          <FontAwesomeIcon
            className="icon"
            icon={faBookmark}
            onClick={onSave}
          />
        ) : (
          <FontAwesomeIcon
            className="icon"
            icon={faSolidBookmark}
            onClick={onSave}
          />
        )}
      </div>
      <DeleteResourceButton id={id} onDeleteResource={onDeleteResource} />
    </div>
  );
};

export default EachResource;
