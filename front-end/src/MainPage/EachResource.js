import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DeleteResourceButton from "./DeleteResourceButton";
import "./Resources.css";
import axios1 from "../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faSolidThumbsUp,
  faBookmark as faSolidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import AddResource from "./AddResource";
import Comments from "./Comments";

const EachResource = (props) => {
  // use hook to set the state of liked or saved resource
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [urlData, setUrlData] = useState(null);

  const navigate = useNavigate();
  const userInfo = parseFloat(localStorage.getItem("userinfo"));

  //  destructure props
  const {
    topicId,
    ownerId,
    ownerFirstName,
    ownerLastName,
    userId,
    id,
    name,
    description,
    link,
  } = props;

  // boolean to determine if the resource is theirs, if so, they can delete and edit the resource
  const canEditDelete = userInfo === ownerId;

  // check if the resource is already liked by this user or not. Set the like to true if it is or false if it isnt
  useEffect(() => {
    Promise.all([
      axios1.get("api/likes", {
        params: {
          id,
          userId,
        },
      }),
      axios1.get("api/saves", {
        params: {
          id,
          userId,
        },
      }),
      axios1.get("api/likes/count", {
        params: {
          id,
        },
      }),
    ])
      .then((all) => {
        const likesArray = all[0].data.likes;
        const savesArray = all[1].data.saves;
        const likesCount = all[2].data.likes[0].count;
        setLikeCount(likesCount);
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
      })
      .catch((err) => console.log(err));

    axios1
      .get("api/resources/opengraph", {
        params: {
          url: link,
        },
      })
      .then((res) => {
        setUrlData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // when a user likes a resource
  const onLike = (event) => {
    event.preventDefault();
    // toggle between true and false
    setLike((current) => !current);
    // make an axios request to change likes (POST to /likes) and get likes count (GET to /likes.)
    Promise.all([
      axios1.post("api/likes", {
        like,
        id,
        userId,
      }),
      axios1.get("api/likes/count", {
        params: {
          id,
        },
      }),
    ]).then((all) => {
      const likesCount = all[1].data.likes[0].count;
      console.log(likesCount);
      setLikeCount(likesCount);
    });
  };

  // when a user saves a resource
  const onSave = (event) => {
    event.preventDefault();
    // toggle between true and false to display different icon
    setSave((current) => !current);
    // make an axios request to change saves
    axios1
      .post("api/saves", {
        save,
        id,
        userId,
        ownerId,
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
    axios1
      .post("api/resources/delete", {
        id,
      })
      .then((res) => {
        console.log(res.data);
        // refreshes the page whenever user deletes a resource, so that the list is updated
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  // when a user clicks on other user's name
  const userClick = (event) => {
    event.preventDefault();
    // navigate to the profile of the other user
    navigate(`/user/${ownerId}`);
  };

  return (
    <div className="resource-container">
      <div className="each-resource-section">
        <div className="resource-name">{name}</div>
        <div className="resource-description">{description}</div>
        <div className="resource-preview">
          {/* <MyCustomCard url={link} contrast size="large" /> */}
          <div>{urlData?.title}</div>
          <div>{urlData?.description}</div>
          <img className="url-image" src={urlData.image} />
        </div>
        {ownerFirstName && (
          <div className="user" onClick={userClick}>
            {ownerFirstName} {ownerLastName}
          </div>
        )}
        <div className="icons">
          {likeCount}
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
          <AddResource
            add={true}
            name={name}
            description={description}
            userId={userId}
            link={link}
            topicId={topicId}
          />
          <Comments resourceId={id} userId={userId} />
        </div>
      </div>
      <div className="edit-delete-container">
        {canEditDelete ? (
          <>
            <DeleteResourceButton id={id} onDeleteResource={onDeleteResource} />
            <AddResource
              userId={userId}
              add={false}
              id={id}
              name={name}
              description={description}
              link={link}
              topicId={topicId}
              resourceId={id}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EachResource;
