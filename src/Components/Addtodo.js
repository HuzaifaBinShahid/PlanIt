import React from "react";
import { useState } from "react";

const Addtodo = ({addTodo}) => {

  const  [title, setTitle] = useState("");
  const [desc , setDesc] = useState("");

  const submit = (e) =>{

    e.preventDefault();
    if (!title || !desc){
      alert("Title or Description cannot be empty");
    }
    else{

      addTodo(title , desc);
    setTitle("");
    setDesc("");
    }
    


  }



  return (
    <div className="container my-5">
        <h3>Add a Task</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="title">Title of Task</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title} onChange = {(e) =>{
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            value={desc} onChange = {(e) =>{
              setDesc(e.target.value)
            }}
          />
        </div>
      
    
        <button type="submit" className="btn btn-sm btn-primary">
          Add a Task
        </button>
      </form>
    </div>
  );
};

export default Addtodo;
