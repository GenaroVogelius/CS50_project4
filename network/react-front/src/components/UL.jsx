import { useContext } from "react";
import { Link } from "react-router-dom";
import { DatosDeContexto } from "../context/TestContext";

function UL(props) {
  const { setFromNumberOfPagination, userRequest } =
    useContext(DatosDeContexto);


    function logOut() {
      const fetchData = async () => {
        const dataFromServer = await fetch(`http://127.0.0.1:8000/logout`);
        const postData = await dataFromServer.json();
        location.reload();
      };
      fetchData();
    }

  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item d-flex align-items-center">
        {userRequest !== "AnonymousUser" ? (
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to={`/profile/${userRequest}`}
          >
            <strong>{userRequest}</strong>
          </Link>
        ) : (
          <Link
            onClick={() => setFromNumberOfPagination(0)}
            to={`/login`}
            className="nav-link"
          >
            <strong>Click here to sign in</strong>
          </Link>
        )}
      </li>
      <li className="nav-item">
        <Link
          onClick={() => setFromNumberOfPagination(0)}
          to={`/`}
          className="nav-link"
        >
          All Posts
        </Link>
      </li>
      {userRequest !== "AnonymousUser" ? (
        <li className="nav-item" data-bs-toggle="offcanvas">
          <Link
            onClick={() => setFromNumberOfPagination(0)}
            to={`/following`}
            className="nav-link"
          >
            Following
          </Link>
        </li>
      ) : (
        ""
      )}
      <li className="nav-item">
        {userRequest !== "AnonymousUser" ? (
          <Link onClick={() => logOut()} to={`/`} className="nav-link">
            Log Out
          </Link>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default UL;
