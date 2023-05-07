import { useContext, useState, useEffect } from "react";
import { DatosDeContexto } from "../context/TestContext";
import { csrftoken } from "./CSRFToken";




function MgSpan(props) {
    let { userRequest } = useContext(DatosDeContexto);
    
    let [profilePostInformation, setProfilePostInformation] = useState(
      props.PostInformation
    );

    useEffect(() => {
      setProfilePostInformation(props.PostInformation);
    }, [props.PostInformation]);

    const handleCorazonClick = (event) => {
    
    //? a id si podes acceder con event.target.id; , pero al resto de atributos que creees tenes que acceder con getAttribute
    //? let post_pk = event.target.getAttribute('post_pk');
    //? esto igualmente no lo hiciste porque podes obtener la pk haciendo esto:
    // !cambiar esto
    let post_pk = profilePostInformation.id;
    let is_mg_positive_bolean = !profilePostInformation.mgState;
      
    //   ?When using the useState hook, you should always pass a new value to the state updater function. However, in your code, you are modifying the existing state directly and then returning it from the updater function. This will not trigger a re-render because React only checks if the state reference has changed, and since you are returning the same reference, it thinks that nothing has changed. To fix this issue, you can create a new object by spreading the existing state and then updating the relevant properties
      
        setProfilePostInformation((prevState) => {
          return {
            ...prevState,
            mgState: is_mg_positive_bolean,
            contadorMg: is_mg_positive_bolean
              ? prevState.contadorMg + 1
              : prevState.contadorMg - 1,
          };
        });
      

    // actualizas la base de datos
    fetch(`http://127.0.0.1:8000/postlike/${post_pk}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        is_mg_positive: is_mg_positive_bolean,
      }),
    });
  };

    

    if (profilePostInformation.mgState === null || profilePostInformation.userPoster == userRequest) {
            return (
                <span > ❤️ {profilePostInformation.contadorMg} </span>
            );
            
        } else if (profilePostInformation.mgState === true) {
          return (
            <span
              className="contadorAndMg"
              id={profilePostInformation.index}
              post_pk={profilePostInformation.id}
              onClick={handleCorazonClick}
            >
              ❤️ {profilePostInformation.contadorMg}
            </span>
          );
        } else if (profilePostInformation.mgState === false) {
          return (
            <span
              className="contadorAndMg"
              id={profilePostInformation.index}
              post_pk={profilePostInformation.id}
              onClick={handleCorazonClick}
            >
              🤍 {profilePostInformation.contadorMg}
            </span>
          );
        }
    
}

export default MgSpan;
