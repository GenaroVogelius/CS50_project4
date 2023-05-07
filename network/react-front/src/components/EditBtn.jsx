import { DatosDeContexto } from "../context/TestContext";
import { CSRFToken, csrftoken } from "./CSRFToken";
import { useState, useEffect, useContext } from "react";


function EditBtn(props) {
    let [editInformation, setEditInformation] = useState(props.editInformation);
    const {
      setIsEditing,
      isEditing,
      setEditBtnInformation,
      isButtonClickGlobal,
      setIsButtonClickGlobal,
      editBtnInformation,
    } = useContext(DatosDeContexto);
    
    console.log(isButtonClickGlobal)
  const [isButtonClickLocal, setIsButtonClickLocal] = useState(false);

  
    
  // ! esto es clave cuando recibis data por medio de hooks, sino no se te actualiza por ej. cuando haces la paginación
  useEffect(() => {
      // aca pone como dependencia que mire a la variable global que cuando es actualizada en base a eso cambia el estado de la variable local.
      setEditInformation(props.editInformation);
  }, [props.editInformation]);
  
  useEffect(() => {

    // significa que tocaste de nuevo el mismo boton que antes abriste
    
    
    if (isButtonClickGlobal.contador === 2) {
        // lo que pasa es que va modificando de arriba hacia abajo, pensa que este use effect entra por cada editbtn, entonces al primero si va a ser 2, pero al segundo no.
        setIsButtonClickGlobal({
          contador: (isButtonClickGlobal.contador = 1),
          lastClickId: editBtnInformation.id,
        });
        setIsButtonClickLocal(false);

        console.log(isButtonClickGlobal.lastClickId);
        if (isButtonClickGlobal.lastClickId === editInformation.id) {
          setIsButtonClickLocal(isButtonClickLocal ? false : true);
        }
      }
    
    
    
  }, [isButtonClickGlobal]);
    
  function handleEdit() {
      
    setEditBtnInformation({ id: editInformation.id, click: !isButtonClickLocal });
    setIsButtonClickLocal(isButtonClickLocal ? false : true);


    if (isButtonClickGlobal.lastClickId === editInformation.id) {
      
      setIsButtonClickGlobal({
        contador: (isButtonClickGlobal.contador = 0),
        lastClickId: "",
      });
      
    }
    else {
      setIsButtonClickGlobal({ contador: isButtonClickGlobal.contador + 1, lastClickId: editInformation.id })
    }
    }


    if (editInformation.isEditable) {
        return (
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={() => handleEdit()}
          >
            {isButtonClickLocal ? "Cancel Edit" : "Edit"}
          </button>
        );
        
    } else {
      return "";
    }
    
}

export default EditBtn