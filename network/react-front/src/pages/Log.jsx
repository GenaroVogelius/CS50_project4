
import { Title } from "../components/Title";
import { csrftoken } from "../components/CSRFToken";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";


function Log() {


  const [showAlert, setShowAlert] = useState(false)

    function changeHashRoute(route) {
      window.location.hash = `#${route}`;
    }



    function HandleSubmit(event){
        event.preventDefault();

        const usernameData = event.target.username.value;
        const password = event.target.password.value;

        fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          username: usernameData,
          password: password,
        }),
  })
    .then((response) => response.json())
    .then((data) => {

      // Handle the response data
        if (data.is_log_in === "true") {
            changeHashRoute("/");
            location.reload();
      }
        else {
          setShowAlert(true)
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
    }


        return (
          <div className="container p-0">
            <Title page={"Log in"} />
            {showAlert ?
              <div class="alert alert-danger" role="alert">
                Username or password incorrect
              </div> : ""}
            <form onSubmit={HandleSubmit} action="">
              <div class="form-group mt-2">
                <input
                  autofocus
                  class="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div class="form-group mt-2">
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div class="d-flex justify-content-end mt-2 ">
                <input class="btn btn-primary" type="submit" value="Login" />
              </div>
            </form>
            <div class="d-flex justify-content-end align-items-baseline mt-2">
              <p className="mr-2" id="validation">
                Don't have an account?
              </p>
              <Link to={`/register`}>Register here</Link>
            </div>
          </div>
        );
}


export default Log