import Perfil from "../components/Perfil";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";

import { DatosDeContexto } from "../context/TestContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";




function Profile() {
  const { GettingPostData, setFromNumberOfPagination, fromNumberOfPagination } =
    useContext(DatosDeContexto);
  
  const { username } = useParams();

  useEffect(() => {
      setFromNumberOfPagination(0);
  }, []);
  
  
  useEffect(() => {
      GettingPostData(`profile/${username}`);
  }, [fromNumberOfPagination]);

    return (
      <div className="container p-0">
        <div className="card">
          <Perfil />
          <Posts />
        </div>
        <Pagination link={`${username}`} />
      </div>
    );
    
}


export default Profile