import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export function Edit(props) {

let { id } = useParams();

const [title, setTitle] = useState("");
const [cover, setCover] = useState("");
const [author, setAuthor] = useState("");

const navigate = useNavigate();

useEffect(() => {

axios.get('http://localhost:4000/api/book/' + id)
.then((response) => {
   
    setTitle(response.data.title);
    setCover(response.data.cover);
    setAuthor(response.data.author);
    })
    .catch(function (error) {
    console.log(error);
    })
    }, []);
    const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
    id: id,
    title: title,
    cover: cover,
    author: author
    };
    axios.put('http://localhost:4000/api/books/' + id, newBook)
    .then((res) => {
    console.log(res.data);
    navigate('/read');
    });
    }
    return (
    <div>
        <h2>Edit Component</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label>Edit Book Title: </label>
    <input type="text"
    className="form-control"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    </div>
    <div className="form-group">
    <label>Edit Book Cover: </label>
    <input type="text"
    className="form-control"

    value={cover}
onChange={(e) => setCover(e.target.value)}
/>
</div>
<div className="form-group">
<label>Edit Book Author: </label>
<input type="text"
className="form-control"
value={author}
onChange={(e) => setAuthor(e.target.value)}
/>
</div>
<div className="form-group">
<input type="submit" value="Edit Book" className="btn btn-primary" />
</div>
</form>
</div>
);
}

