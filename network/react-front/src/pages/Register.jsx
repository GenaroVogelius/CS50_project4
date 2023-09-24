
import { Link } from "react-router-dom";
import { Title } from "../components/Title";
import { csrftoken } from "../components/CSRFToken";
import { useState, useEffect } from "react";

function Register() {

  const [showAlert, setShowAlert] = useState({ isTrue: false, message: "" });
  
  function changeHashRoute(route) {
    window.location.hash = `#${route}`;
  }

  function HandleSubmit(event) {
    event.preventDefault();
      
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordConfirmation = event.target.confirmation.value;

    if (password !== passwordConfirmation) {
      setShowAlert({ isTrue: true, message: "Passwords do not match" })
    }

    else {

      fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          username: username,
          mail: email,
          password : password,
        }),
      })
        
    .then((response) => response.json())
    .then((data) => {

      // Handle the response data
        if (data.message === "true") {
            changeHashRoute("/");
            location.reload();
      }
        else {
          setShowAlert({ isTrue: true, message: data.message});
      }
    })
    }
  }

    return (
      <div className="container p-0">
        <Title page={"Register"} />
        {showAlert.isTrue ? (
          <div class="alert alert-danger" role="alert">
            {showAlert.message}
          </div>
        ) : (
          ""
        )}
        <form action="" onSubmit={HandleSubmit}>
          <div class="form-group">
            <input
              class="form-control mt-2"
              autofocus
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control mt-2"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control mt-2"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control mt-2"
              type="password"
              name="confirmation"
              placeholder="Confirm Password"
            />
          </div>
          <div class="d-flex justify-content-end mt-2">
            <input class="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
        <div class="d-flex justify-content-end align-items-baseline mt-2">
          <p className="mr-2" id="validation">
            Already have an account?
          </p>
          <Link to={`/login`}>Log In Here</Link>
        </div>
      </div>
    );

    

}




export default Register