import { DatosDeContexto } from "../context/TestContext";
import { useState, useContext, useEffect } from "react";
import { CSRFToken, csrftoken } from "./CSRFToken";

function Content(props) {
    const [contentInformation, setContentInformation] = useState(
      props.contentInformation
    );
    const { isEditing, setIsEditing, setEditBtnInformation, editBtnInformation } =
      useContext(DatosDeContexto);
    const [content, setContent] = useState(props.contentInformation.content);

    useEffect(() => {
      setContentInformation(props.contentInformation);
      // !aca tenes un problema porque si pones esto que estaria bien para que al hacer la paginación se recargue como deberia, tenes el problema que al modificar no se te actualiza
      // setContent(props.contentInformation.content);
    }, [props.contentInformation]);
  



    function HandleSubmit(event) {
      
      let input = event.target.editContent;
      console.log(input.value)

      // ! aca esta el otro problema
      
      setContent(input.value)

      setEditBtnInformation(editBtnInformation.click = false )
      // setIsEditing(false)

        
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
    
  
    if (
      contentInformation.id === editBtnInformation.id &&
      editBtnInformation.click
    ) {
      return (
        <form onSubmit={HandleSubmit} action="">
          <CSRFToken />
          <textarea name="editContent" defaultValue={content}></textarea>
          <input
            className="btn btn-outline-success"
            type="submit"
            id="send"
            value="Save changes"
          />
        </form>
      );
    } else {
      return <p>{content}</p>;
    }

  
}

export default Content;
