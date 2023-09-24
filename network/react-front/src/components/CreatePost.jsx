import { useContext, useState, useEffect, useRef } from "react";
import { DatosDeContexto } from "../context/TestContext";
import { csrftoken } from "./CSRFToken";

function CreatePost() {
  let { bodyPost, setBodyPost, CreatePost, userRequest } =
    useContext(DatosDeContexto);
  const textareaRef = useRef(null);

  const [showAlert, setShowAlert] = useState(false);

  function HandleSubmit(event) {
    event.preventDefault();
    let input = event.target.input_post;

    if (userRequest === "AnonymousUser") {
      setShowAlert(true)
    }

    else {
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

      input.value = "";

      // esto es para formatear la fecha que te da
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const newPost = {
        // vas a requerirle al back-end el nombre del usuario
        user_poster: userRequest,
        content: bodyPost,
        timestamp: new Date().toLocaleString("en-US", options),
        // mg lo pusiste como null ya que no mostrará la posibilidad de poner mg.
        mg_state: null,
        contadorMg: 0,
      };

      CreatePost(newPost);
    }
  }

  function HandleOnChange(event) {
    setBodyPost(event.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  return (
    <>
      {showAlert ? (
        <div className="alert alert-danger" role="alert">
          You must be sign in to post.
        </div>
      ) : (
        ""
      )}

      <form onSubmit={HandleSubmit} action="" className="CreatePost px-4">
        <div className="form-floating">
          <textarea
            ref={textareaRef}
            name="input_post"
            style={{ minHeight: "5rem" }}
            onChange={HandleOnChange}
            className="text-area-create-post form-control"
            placeholder="Post something new!"
            id="floatingTextarea2"
          ></textarea>
          <label className="text-center" htmlFor="floatingInput">
            What are you thinking?
          </label>
          <div
            id="divButton"
            className="d-grid gap-2 d-flex justify-content-end mt-2"
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
    </>
  );
}

export default CreatePost;
