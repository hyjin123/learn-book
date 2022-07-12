import React from "react";
import "./Button.css";

const AddButton = (props) => {
  const { onDelete } = props;
  // when user adds a resource
  const onAdd = (event) => {
    event.preventDefault();
    // save the form info
    console.log("hello");
    const name = event.target.name.value;
    console.log(event.target);
  };

  return (
    <div className="homepage">
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
              <form className="resource-form" id="form1" onSubmit={onAdd}>
                <div className="mb-3">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    rows="3"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
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
              <button
                type="submit"
                form="form1"
                className="btn btn-primary"
                data-dismiss="modal"
              >
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
