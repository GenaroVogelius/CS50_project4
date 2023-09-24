import { DatosDeContexto } from "../context/TestContext";

import { useState, useEffect, useContext } from "react";


function EditBtn(props) {
    let [editInformation, setEditInformation] = useState(props.editInformation);
    const {
      idBtnClickGlobal,
      setIdBtnClickGlobal,
    } = useContext(DatosDeContexto);
    

  
    
  // ! esto es clave cuando recibis data por medio de hooks, sino no se te actualiza por ej. cuando haces la paginación
  useEffect(() => {
      // aca pone como dependencia que mire a la variable global que cuando es actualizada en base a eso cambia el estado de la variable local.
      setEditInformation(props.editInformation);
  }, [props.editInformation]);
  

    
  function handleEdit() {

    // significa que lo estas cerrando
    if (idBtnClickGlobal === editInformation.id) {
      setIdBtnClickGlobal("");

    // significa que lo estas abriendo
    } else {
      setIdBtnClickGlobal(editInformation.id);
    }
    }


    if (editInformation.isEditable) {
        return (
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={() => handleEdit()}
          >
            {idBtnClickGlobal === editInformation.id ? "Cancel Edit" : "Edit"}
          </button>
        );
        
    } else {
      return "";
    }
    
}

export default EditBtn