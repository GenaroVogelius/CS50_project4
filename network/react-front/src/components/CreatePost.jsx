import { useContext, useState, useEffect } from "react";
import { DatosDeContexto } from "../context/TestContext";
import { CSRFToken, csrftoken } from "./CSRFToken";

function CreatePost() {
  let { bodyPost, setBodyPost, CreatePost, userRequest } = useContext(DatosDeContexto);


  function HandleSubmit(event) {
    event.preventDefault();
    let input = event.target.input_post;

    fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        content: bodyPost,
        timestamp: new Date().toLocaleString(),
      }),
    });
    
    input.value = '';
    

    // esto es para formatear la fecha que te da
    const options = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  
}; 
    const newPost = {
      // vas a requerirle al back-end el nombre del usuario
      user_poster: userRequest,
      content: bodyPost,
      timestamp: new Date().toLocaleString('en-US', options),
      // mg lo pusiste como null ya que no mostrará la posibilidad de poner mg.
      mg_state: null,
      contadorMg: 0,
    };

    CreatePost(newPost)
    
  }



  return (
    <form onSubmit={HandleSubmit} action="">
      <CSRFToken />
      <div className="form-floating">
        <h2>New Post</h2>
        <textarea
          name="input_post"
          onChange={(event) => setBodyPost(event.target.value)}
          className="form-control"
          placeholder="Post something new!"
          id="floatingTextarea2"
        ></textarea>
        <div
          id="divButton"
          className="d-grid gap-2 d-md-flex justify-content-md-end mt-2"
        >
          <input
            type="submit"
            id="send"
            value="Post"
            className="btn btn-primary"
          />
        </div>
      </div>
      <hr />
    </form>
  );
}

export default CreatePost;
