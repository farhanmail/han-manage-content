import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Line from "../assets/line.png";

function Home() {
  let history = useHistory();
  const [getAllData, setGetAllData] = useState([]);
  const [getAllTitle, setGetAllTitle] = useState([]);
  const [id, setId] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [lgShowDetail, setLgShowDetail] = useState(false);
  const [lgShowDelete, setLgShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://limitless-forest-49003.herokuapp.com/posts")
      .then((res) => {
        let results = res.data.map(({ title }) => ({ title }));
        setGetAllData(res.data);
        const sortTitle = results.sort((a, b) => {
          const prev = a.title.toUpperCase();
          const next = b.title.toUpperCase();
          if (prev < next) return -1;
          if (prev > next) return 1;
          return 0;
        });
        setGetAllTitle(sortTitle);
        setLoading(true);
        // console.log(sortTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteData = async (e) => {
    axios
      .delete("https://limitless-forest-49003.herokuapp.com/posts/" + id)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleModalDetail = (props) => {
    setLgShowDetail(true);
    setTitle(props.title);
    setContent(props.content);
    setId(props.id);
    console.log(props.id);
  };

  return (
    <div>
      <ScrollToTop smooth color="rgb(17, 128, 255)" />

      <Modal
        size="lg"
        show={lgShowDetail}
        onHide={() => setLgShowDetail(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-start">
          <Row>
            <Col>
              <div>
                <div>
                  <p>{content}</p>
                  <div
                    style={{ marginTop: "20px" }}
                    className="d-flex justify-content-end"
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => history.push(`/update/${id}`)}
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger"
                      onClick={() => setLgShowDelete(true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={lgShowDelete}
        onHide={() => setLgShowDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete This Content?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-end">
          <Row>
            <Col>
              <div>
                <div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger"
                      onClick={handleDeleteData}
                    >
                      Yesss . . .
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Row>
        <Col sm="3">
          <div className="left-event">
            <h4>Title</h4>
            <div className="d-flex justify-content-center">
              <img
                src={Line}
                width="180"
                height="30"
                alt="React Bootstrap logo"
              />
            </div>
            {loading ? (
              getAllTitle.map((e) => {
                return (
                  <div className="title-left" key={e.id}>
                    <div onClick={() => handleModalDetail(e)}>
                      <div>- {e.title}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <div
                  className="spinner-grow spiner-grow-sm text-primary"
                  role="status"
                ></div>
                <div
                  className="spinner-grow spiner-grow-sm text-primary"
                  role="status"
                ></div>
                <div
                  className="spinner-grow spiner-grow-sm text-primary"
                  role="status"
                ></div>
              </div>
            )}
          </div>
        </Col>
        <Col sm="9">
          <div className="right-event">
            <div style={{ marginTop: "10px" }}>
              <Row>
                <Col>
                  <h1>All Contents</h1>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => history.push(`/create`)}
                    >
                      Create Content
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              {loading ? (
                getAllData.map((e) => {
                  return (
                    <div className="content" key={e.id}>
                      <div onClick={() => handleModalDetail(e)}>
                        <h4>{e.title}</h4>
                        <p>{e.content}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    className="spinner-grow spiner-grow-sm text-primary"
                    role="status"
                  ></div>
                  <div
                    className="spinner-grow spiner-grow-sm text-primary"
                    role="status"
                  ></div>
                  <div
                    className="spinner-grow spiner-grow-sm text-primary"
                    role="status"
                  ></div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
