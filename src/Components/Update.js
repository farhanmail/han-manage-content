import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Update(props) {
    const history = useHistory();
    const [updateContent, setUpdateContent] = useState({
        title: "",
        content: "",
    });
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://limitless-forest-49003.herokuapp.com/posts/${props.match.params.id}`)
            .then((res) => {
                setGetData(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }, []
    )

    const handleUpdate = () => {
        axios
            .put(`https://limitless-forest-49003.herokuapp.com/posts/${props.match.params.id}`, updateContent)
            .then((res) => {
                history.replace('/')
            })
    }

    return (
        <div className="new-content">
            <h2>Update Content</h2>
            <form class="form-floating mb-3 needs-validation" novalidate>
                <div class="form-floating mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="floatingInput" 
                        placeholder="New Content"
                        defaultValue={getData.title} 
                        onChange={(e) => 
                            setUpdateContent({ ...updateContent, title: e.target.value})
                        }
                        required
                    />
                    <label for="validation1" id="validation1" required>New Title</label>
                    <div class="invalid-feedback">
                        Please provide a valid Title.
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <textarea 
                        style={{height:'250px'}} 
                        type="text" 
                        class="form-control" 
                        id="floatingInput" 
                        placeholder="New Content" 
                        defaultValue={getData.content} 
                        onChange={(e) => 
                            setUpdateContent({ ...updateContent, content: e.target.value })
                        }
                        required
                    />
                    <label for="validation2" id="validation2" required>Input Content</label>
                    <div class="invalid-feedback">
                        Please provide a valid Content.
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button  style={{marginTop:'20px', paddingLeft:'20px', paddingRight:'20px'}} class="btn btn-primary" type="submit">Submit Validate</button>
                </div>
                <div className="d-flex justify-content-end">
                    <button 
                        style={{marginTop:'20px', paddingLeft:'20px', paddingRight:'20px'}} 
                        type="submit" 
                        class="btn btn-primary" 
                        onClick={(e) => {
                            e.preventDefault()
                            handleUpdate();
                        }}>Submit</button> 
                    <button style={{marginTop:'20px', paddingLeft:'20px', paddingRight:'20px', marginLeft:'10px'}} type="submit" class="btn btn-danger" onClick={() => history.push(`/`)}>Cencel</button> 
                </div>
            </form>
        </div>
    )
};
