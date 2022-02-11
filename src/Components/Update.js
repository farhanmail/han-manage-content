import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Update(props) {
  const history = useHistory();
  const [updateContent, setUpdateContent] = useState({
    title: "",
    content: "",
  });
  const [data, setGetData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://limitless-forest-49003.herokuapp.com/posts/${props.match.params.id}`
      )
      .then((res) => {
        setGetData(res.data);
        setUpdateContent({ title: res.data.title, content: res.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://limitless-forest-49003.herokuapp.com/posts/${props.match.params.id}`,
        updateContent
      )
      .then((res) => {
        history.replace("/");
      });
  };

  const handleChangeContent = (e) => {
    e.preventDefault();
    if (e.target) {
      setUpdateContent((prev) => ({
        ...prev,
        content: e.target.value,
      }));
    }
  };

  return (
    <div className="new-content">
      <h2>Update Content</h2>
      <form className="form-floating mb-3 needs-validation">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="New Content"
            defaultValue={data.title}
            onChange={(e) => {
              e.preventDefault();
              setUpdateContent((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            required
          />
          <label for="validation1" id="validation1" required>
            New Title
          </label>
          <div className="invalid-feedback">Please provide a valid Title.</div>
        </div>
        <div className="form-floating mb-3">
          <textarea
            style={{ height: "250px" }}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="New Content"
            defaultValue={data.content}
            onChange={handleChangeContent}
            required
          />
          <label for="validation2" id="validation2" required>
            Input Content
          </label>
          <div className="invalid-feedback">
            Please provide a valid Content.
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            style={{
              marginTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            type="submit"
            class="btn btn-primary"
            onClick={handleUpdate}
          >
            Submit
          </button>
          <button
            style={{
              marginTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              marginLeft: "10px",
            }}
            type="submit"
            class="btn btn-danger"
            onClick={() => history.push(`/`)}
          >
            Cencel
          </button>
        </div>
      </form>
    </div>
  );
}
