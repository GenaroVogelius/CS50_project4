import { useContext, useState, useEffect, } from "react";
import { useParams, useHistory} from "react-router-dom";
import { DatosDeContexto } from "../context/TestContext";
import { csrftoken } from "./CSRFToken";
import MgSpan from "./MgSpan";
import Spinner from "./Spinner"
import BtnFollow from "./BtnFollow";


//? useParams is a hook provided by React Router that allows you to extract parameters from the current URL. When you define a route with a parameter in your application.




function Perfil() {
  // const [postsData, setpostsData] = useState(postData);


  const {
    userRequest,
    fromNumberOfPagination,
    setNextPaginationQuery,
    postsData

  } = useContext(DatosDeContexto);
  


  


  // ! {postsData[0]?.user_poster} tenes el signo de pregunta antes del punto, eso significa que si encuentra que a la variable con ese atributo que acceda ahi, sino antes no va a acceder, sin esto te marcaba error. Es buena practica ponerle ? siempre antes del .



  

  if (postsData.posts) {
    return (
      <>
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap px-4">
          <h3 className="mt-0 mb-0 ">{postsData.posts[0]?.user_poster}</h3>
          <h3 className="mt-0 mb-0 ml-5">Twitts</h3>
          <div className="d-flex gap-3 align-items-center">
            <BtnFollow
              FollowInformation={{
                userPoster: postsData.posts[0]?.user_poster,
                btnState: postsData.is_follower,
                followersNumber: postsData.followers,
                followNumber: postsData.following,
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
