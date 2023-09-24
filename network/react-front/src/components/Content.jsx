import { DatosDeContexto } from "../context/TestContext";
import { useState, useContext, useEffect, useRef } from "react";
import { csrftoken } from "./CSRFToken";

function Content(props) {
  const [contentInformation, setContentInformation] = useState(
    props.contentInformation
  );
  const { isEditing, setIsEditing, idBtnClickGlobal, setIdBtnClickGlobal } =
    useContext(DatosDeContexto);
  const [content, setContent] = useState(props.contentInformation.content);

  const [height, setHeight] = useState(null);
  const textareaRef = useRef(null);

  // const [initialHeight, setinitalHeight] = useState(document.querySelector(".content").offsetHeight);

  
  useEffect(() => {
    // !aca te preguntas si el contenido actual es distinto al prop que recibe, si es true entra a ejecutar esto, y este useeffect se va a ejecutar cada vez que haya cambios en el prop de content que vendria a se cuando se haga una paginación.
    if (content !== props.contentInformation.content) {
      setContentInformation(props.contentInformation);
      setContent(props.contentInformation.content);
    }
    
  }, [props.contentInformation.content]);

  // TODO que el height inicial del text area sea correspondiente al texto que tiene.
  // TODO que la barra de escribir en el text area este al final.
   
  function HandleSubmit(event) {
    event.preventDefault();
    let input = event.target.editContent;

    // este es para que se te actualize el twitt con la nueva edición.
    setContent(input.value);
    setIdBtnClickGlobal("");
    // setEditBtnInformation((editBtnInformation.click = false));


    fetch("http://127.0.0.1:8000/posts/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        content: input.value,
        pk: contentInformation.id,
      }),
    });
  }

  function HandleChange() {
    const textarea = textareaRef.current;
    // textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  if (
    contentInformation.id === idBtnClickGlobal
  ) {
    return (
      <form onSubmit={HandleSubmit} action="">
        <textarea
          ref={textareaRef}
          onChange={HandleChange}
          className="text-area-content form-control p-2"
          name="editContent"
          defaultValue={content}
          style={{ height: `100%` }}
          autoFocus
        ></textarea>
        <div className="d-grid gap-2 d-flex justify-content-end mt-2">
          <input
            className="btn btn-outline-success "
            type="submit"
            id="send"
            value="Save changes"
          />
        </div>
      </form>
    );
  } else {
    return <p className="content p-2">{content}</p>;
  }
}

export default Content;
