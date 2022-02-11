import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Line from "../assets/line.png"

function Home() {
    let history = useHistory()
    const [getAllData, setGetAllData] = useState([])
    const [getAllTitle, setGetAllTitle] = useState([])
    const [getData, setGetData] = useState()
    const [id, setId] = useState([])
    const [title, setTitle] = useState([])
    const [content, setContent] = useState([])
    const [oldData, setOldData] = useState([])
    const [lgShowDetail, setLgShowDetail] = useState(false);
    const [lgShowDelete, setLgShowDelete] = useState(false);
    const [LgShowUpdate, setLgShowUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("https://limitless-forest-49003.herokuapp.com/posts")
            .then((res) => {
                let results = res.data.map(({title}) => ({title}))
                setGetAllData(res.data);
                console.log(results);
                // let sortTitle = res.data.sort((a, b) => a - b)
                setGetAllTitle(res.data);
                setLoading(true);
                // console.log(sortTitle);
            })
            .catch((err) => {
                console.log(err);
            })
        axios
            .get("https://limitless-forest-49003.herokuapp.com/posts/513")
            .then((res) => {
                setGetData(res.data)
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }, []
    )
    

    const handleCreateData = (event) => {
        event.preventDefault();
        const input = { title, content }
        axios
            .post("https://limitless-forest-49003.herokuapp.com/posts", input)
            .then((res) => {
                // console.log(res.data);
            })
    } 

    const handleEditData = () => {
        axios  
            .put("https://limitless-forest-49003.herokuapp.com/posts/513", {title: title, content: content})
            .then((res) => {
                // console.log(res.data);
            })
    }

    const handleDeleteData = async (e) => {
        axios
            .delete('https://limitless-forest-49003.herokuapp.com/posts/' + id)
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    }

    const handleModalDetail = (props) => {
        setLgShowDetail(true)
        setTitle(props.title)
        setContent(props.content)
        setId(props.id)
        console.log(props.id);
    }

    const [updateContent, setUpdateContent] = useState({
        title: "",
        content: "",
    })

    const handleModalUpdate = (props) => {
        setLgShowUpdate(true);
        setUpdateContent({
            title: props.title,
            content: props.content,
        })
        setOldData(props)
        console.log(props.id);
    }

    const handleUpdate = () => {
        // console.log("https://limitless-forest-49003.herokuapp.com/posts/" + oldData.id);
        axios
            .put("https://limitless-forest-49003.herokuapp.com/posts/" + oldData.id, updateContent)
            .then((res) => {
                setLgShowUpdate(false);
                if (res.status === 200) {
                    window.location.reload();
                }
            })
    }

    const handleDetailUpdate = () => {
        // console.log("https://limitless-forest-49003.herokuapp.com/posts/" + oldData.id);
        axios
            .put("https://limitless-forest-49003.herokuapp.com/posts/" + id, updateContent)
            .then((res) => {
                setLgShowUpdate(false);
                if (res.status === 200) {
                    window.location.reload();
                }
            })
    }

    

    if (error) return <h1>{error}</h1>;

    return (
      <div>
          <ScrollToTop smooth color="rgb(17, 128, 255)"/>
            {/* <Modal
                size="lg"
                show={lgShowDetail}
                onHide={() => setLgShowDetail(false)}
            >
                <Modal.Header closeButton>
                <Modal.Title id="modal-detail-produk">Detail Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                <Row>
                    <Col>
                    <div>
                        <div>
                        <h4 style={{ textAlign: "center" }}>{title}</h4>
                        <h4>{content}</h4>
                        <p>Kategori Produk</p>
                        
                        <div className="d-flex justify-content-center">
                            
                            <button type="submit" class="btn btn-primary" onClick={() => handleModalUpdate()}>Update</button>
                            <Button
                            as="input"
                            type="submit"
                            value="Hapus"
                            className="button-cencel-prosuksi"
                            />
                        </div>
                        </div>
                    </div>
                    </Col>
                </Row>
                </Modal.Body>
            </Modal>

            <Modal
                size=""
                show={LgShowUpdate}
                onHide={() => setLgShowUpdate(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="modal-ubah-pegawai">Update Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row style={{ marginTop: "2%" }}>
                    <Col>
                    <Row>
                        <form className="form-floating">
                            <div className="form-floating mb-3">
                                <label for="floatingInput">Update Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder="Tittle Name" 
                                    defaultValue={oldData.title} 
                                    onChange={(e) => 
                                        setUpdateContent({ ...updateContent, title: e.target.value})
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Content</label>
                                <textarea 
                                    style={{height:'250px'}} 
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={oldData.content} 
                                    onChange={(e) => 
                                        setUpdateContent({ ...updateContent, content: e.target.value })
                                    }
                                />
                            </div>
                            <Button
                                value="Ubah"
                                onClick={() => {
                                  handleUpdate();
                                }}
                                >Submit</Button>
                        </form>
                    </Row>
                    </Col>
                </Row>
                </Modal.Body>
            </Modal>
          <table>
              <tr>
                  <th width="50">#ID</th>
                  <th width="100">Title</th>
                  <th>Content</th>
                  <th>Action</th>
              </tr>
              {getAllData.map((e) => {
                    return (
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.title}</td>
                            <td>{e.content}</td>
                            <td>
                            <button type="submit" className="btn btn-primary" onClick={() => handleModalDetail(e)}>Detail</button>
                            <button type="submit" className="btn btn-primary" onClick={() => handleModalUpdate(e)}>Update</button>
                            </td>
                        </tr>
                    )
                })
              }
          </table>
            <button
                type="submit"
                onClick={() => history.push(`/create`)}
            >
                Create
            </button>
            <button
                type="submit"
                onClick={() => history.push(`/update/`)}
            >
                Update
            </button>
            <button
                type="submit"
                onClick={handleDeleteData}
            >
                Delete
            </button> */}







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
                        <text>{content}</text>
                        <div style={{marginTop:'20px'}} className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" onClick={() => history.push(`/update/${id}`)}>Update</button>
                            <button style={{marginLeft:'10px'}} className="btn btn-danger" onClick={() => setLgShowDelete(true)}>Delete</button>
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
                            <button className="btn btn-danger" onClick={handleDeleteData}>Yesss . . .</button>
                        </div>
                        </div>
                    </div>
                    </Col>
                </Row>
                </Modal.Body>
            </Modal>

            <Row>
                <Col sm='3'>
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
                        {loading ? (getAllTitle.map((e) => {
                            return (
                                <div className="title-left">
                                    <div onClick={() => handleModalDetail(e)}>
                                        <tr> 
                                            <td><text>- {e.title}</text></td>
                                        </tr>
                                    </div>
                                </div>
                            )
                        })
                        ) : (
                            <div style={{textAlign:'center', marginTop:'30px', marginBottom:'30px'}}>
                                <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                    {/* <span class="sr-only">Loading...</span> */}
                                </div>
                                <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                    {/* <span class="sr-only">Loading...</span> */}
                                </div>
                                <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                    {/* <span class="sr-only">Loading...</span> */}
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
                <Col sm='9'>
                    <div className="right-event">
                        <div style={{marginTop:'10px'}}>
                            <Row>
                                <Col>
                                    <h1>All Contents</h1>
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary" onClick={() => history.push(`/create`)}>Create Content</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            {loading ? (getAllData.map((e) => {
                                return (
                                    <div className="content">
                                        <div onClick={() => handleModalDetail(e)}>
                                            <tr> 
                                                <th><h4>{e.title}</h4></th>
                                            </tr>
                                            <tr>
                                                <td>{e.content}</td>
                                            </tr>
                                        </div>
                                    </div>
                                )
                            })
                            ) : (
                                <div style={{textAlign:'center', marginTop:'30px', marginBottom:'30px'}}>
                                    <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                        {/* <span class="sr-only">Loading...</span> */}
                                    </div>
                                    <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                        {/* <span class="sr-only">Loading...</span> */}
                                    </div>
                                    <div class="spinner-grow spiner-grow-sm text-primary" role="status">
                                        {/* <span class="sr-only">Loading...</span> */}
                                    </div>
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