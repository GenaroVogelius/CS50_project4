import Perfil from "../components/Perfil";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";



function Profile() {

    return (
      <div className="container">
        <div className="card">
          <Perfil />
          <Posts />
        </div>
      </div>
    );
    
}


export default Profile