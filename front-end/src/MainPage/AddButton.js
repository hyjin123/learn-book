import axios from "axios";
import React from "react";
import "./Button.css";

const AddButton = (props) => {
  const { userInfo, topicId } = props;
  // when user adds a resource
  const onAdd = (event) => {
    event.preventDefault();
    // save the form info
    const name = event.target.name.value;
    const description = event.target.description.value;
    const url = event.target.url.value;
    // make an axios request to add the new resource to the database
    axios
      .post("/resources/add", {
        topicId,
        name,
        description,
        url,
      })
      .then((res) => {
        console.log(res.data);
        // refreshes the page whenever user adds a new resource, so that the list is updated
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="resource-add-button">
      {/* Button to add a resource */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal1"
      >
        Add Resource
      </button>
      {/* Modal - Form for adding a resource */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Resource
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
              <form className="resource-form" id="form" onSubmit={onAdd}>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    rows="3"
                  ></input>
                </div>
                <div className="form-group">
                  <label for="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label for="url">URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    rows="3"
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" form="form" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddButton;
