import axios from "axios";
import React from "react";
import { useParams, useOutletContext } from "react-router";

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
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Delete Topic
      </button>
      {/* Modal - Confirmation for deleting topic */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Topic
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this topic? ALL your resources
              will be gone as well.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
