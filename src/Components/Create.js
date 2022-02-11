import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const handleCreateData = (event) => {
    event.preventDefault();
    const input = { title, content };
    axios
      .post("https://limitless-forest-49003.herokuapp.com/posts", input)
      .then((res) => {
        history.replace("/");
      });
  };
  return (
    <div className="new-content">
      <h2>Create New Content</h2>
      <form
        className="form-floating mb-3 needs-validation"
        onSubmit={handleCreateData}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="New Content"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label for="validation1" id="validation1" required>
            New Title
          </label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            style={{ height: "250px" }}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="New Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <label for="validation2" id="validation2" required>
            Input Content
          </label>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            style={{ marginLeft: "10px" }}
            type="submit"
            className="btn btn-danger"
            onClick={() => history.push(`/`)}
          >
            Cencel
          </button>
        </div>
      </form>
    </div>
  );
}
