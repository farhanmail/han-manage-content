import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Create() {
    const history = useHistory();
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const handleCreateData = (event) => {
        event.preventDefault();
        const input = { title, content }
        axios
            .post("https://limitless-forest-49003.herokuapp.com/posts", input)
            .then((res) => {
                history.replace('/')
            })
    } 
    return (
        <div className="new-content">
            <h2>Create New Content</h2>
            <form class="form-floating mb-3 needs-validation" novalidate>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="New Content" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <label for="validation1" id="validation1" required>New Title</label>
                    <div class="invalid-feedback">
                        Please provide a valid Title.
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <textarea style={{height:'250px'}} type="text" className="form-control" id="floatingInput" placeholder="New Content" value={content} onChange={(e) => setContent(e.target.value)} required/>
                    <label for="validation2" id="validation2" required>Input Content</label>
                    <div class="invalid-feedback">
                        Please provide a valid Content.
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button  style={{marginTop:'20px', paddingLeft:'20px', paddingRight:'20px'}} class="btn btn-primary" type="submit">Submit Validate</button>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary" onClick={handleCreateData}>Submit</button> 
                    <button style={{marginLeft:'10px'}} type="submit" class="btn btn-danger" onClick={() => history.push(`/`)}>Cencel</button> 
                </div>
            </form>
        </div>
    )
};
