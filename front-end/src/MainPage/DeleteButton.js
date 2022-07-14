import React from "react";
import "./Button.css";

const DeleteTopicButton = (props) => {
  const { onDelete } = props;
  return (
    <div className="resource-delete-button">
      {/* Button to delete the topic */}
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
              will be gone as well. (You will not be able to reverse this
              action)
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

export default DeleteTopicButton;
