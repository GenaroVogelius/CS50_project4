import { useContext, useState, useEffect, } from "react";
import { useParams, useHistory} from "react-router-dom";
import { DatosDeContexto } from "../context/TestContext";
import { csrftoken } from "./CSRFToken";
import MgSpan from "./MgSpan";
import Spinner from "./Spinner"
import BtnFollow from "./BtnFollow";


//? useParams is a hook provided by React Router that allows you to extract parameters from the current URL. When you define a route with a parameter in your application.



function Perfil() {
  let [postsPerfil, setPostsPerfil] = useState();
  const { username } = useParams();

  const history = useHistory();



  // this use effect get the data of the profile
  useEffect(() => {
    async function fetchData() {
      const dataFromServer = await fetch(
        `http://127.0.0.1:8000/profile/${username}`
      );
      const postData = await dataFromServer.json();
      setPostsPerfil(postData);
    }
    fetchData();

  }, []);

  


  // ! {postsPerfil[0]?.user_poster} tenes el signo de pregunta antes del punto, eso significa que si encuentra que a la variable con ese atributo que acceda ahi, sino antes no va a acceder, sin esto te marcaba error. Es buena practica ponerle ? siempre antes del .



  

  if (postsPerfil) {

    return (
      <>
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
          <h3 className="mt-0 mb-0 ">{postsPerfil[0][0]?.user_poster}</h3>
          <h3 className="mt-0 mb-0 ">Twitts</h3>
          <div className="d-flex gap-3 align-items-center">
            <BtnFollow
              FollowInformation={{
                userPoster: postsPerfil[0][0]?.user_poster,
                btnState: postsPerfil[1][0]?.is_follower,
                followersNumber: postsPerfil[1][0]?.followers,
                followNumber: postsPerfil[1][0]?.following,
              }}
            />
          </div>
        </div>
      </>
    );
  }
  
  
  
  else {
    return (
      <>
        <div className="container">
          <Spinner />
        </div>
      </>
    );
  }
}


export default Perfil;
