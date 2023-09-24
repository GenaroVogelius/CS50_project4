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
              <span className="mg-span"> 
                {" "}
                <svg
                  aria-label="Ya no me gusta"
                  className="mr-1"
                  color="rgb(255, 48, 64)"
                  fill="rgb(255, 48, 64)"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <title>Ya no me gusta</title>
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
                {profilePostInformation.contadorMg}
              </span>
            );
            
        } else if (profilePostInformation.mgState === true) {
          return (
            <span
              className="mg-span-animated"
              id={profilePostInformation.index}
              post_pk={profilePostInformation.id}
              onClick={handleCorazonClick}
            >
              <svg
                aria-label="Ya no me gusta"
                className="mr-1"
                color="rgb(255, 48, 64)"
                fill="rgb(255, 48, 64)"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <title>Ya no me gusta</title>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
              {profilePostInformation.contadorMg}
            </span>
          );
        } else if (profilePostInformation.mgState === false) {
          return (
            <span
              className="mg-span"
              id={profilePostInformation.index}
              post_pk={profilePostInformation.id}
              onClick={handleCorazonClick}
            >
              <svg
                aria-label="Me gusta"
                className="mr-1"
                color="rgb(38, 38, 38)"
                fill="rgb(38, 38, 38)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Me gusta</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
              {profilePostInformation.contadorMg}
            </span>
          );
        }
    
}

export default MgSpan;
