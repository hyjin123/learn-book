import React from "react";
import { useParams, useOutletContext } from "react-router";

const Resources = (props) => {
  // use context that was sent down as prop to know which topic has been selected
  const [selectedTopic] = useOutletContext();
  // when user clicks to delete the topic
  const onDelete = (event) => {
    event.preventDefault();
    // make an axios put request to delete the topic
  };

  return (
    <div>
      <div className="homepage">{selectedTopic}</div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={onDelete}
      >
        Delete Topic
      </button>
      {/* Modal - Confirmation for deleting topic */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete Topic
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this topic?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
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
