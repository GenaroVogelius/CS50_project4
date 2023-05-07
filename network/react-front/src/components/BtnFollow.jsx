
import { useContext, useState, useEffect, } from "react";
import { DatosDeContexto } from "../context/TestContext";
import { csrftoken } from "./CSRFToken";
import { useParams } from "react-router-dom";




function BtnFollow(props) {
    let { userRequest } = useContext(DatosDeContexto);
    let [followInformation, setFollowInformation] = useState(props.FollowInformation);
    const { username } = useParams();


    function HandleFollow(requestFollow) {

        // front-end update
        setFollowInformation((prevState) => {
          return {
            ...prevState,
            btnState: requestFollow,
            followersNumber: requestFollow
              ? prevState.followersNumber + 1
              : prevState.followersNumber - 1,
          };
        });

        

    // back-end update
    fetch(`http://127.0.0.1:8000/profile/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        is_follow_user: requestFollow,
      }),
    });

    
  }


      if (followInformation.btnState) {
          return (
            <>
              <h5 className="btn btn-info mt-0 mb-0">
                Followers: {followInformation.followersNumber}
              </h5>
              <h5 className="btn btn-info mt-0 mb-0">
                Follow: {followInformation.followNumber}
              </h5>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => HandleFollow(false)}
              >
                Unfollow
              </button>
            </>
          );
      } else {
        
        if (userRequest == followInformation.userPoster) {
          return (
            <>
              <h5 className="btn btn-info mt-0 mb-0">
                Followers: {followInformation.followersNumber}
              </h5>
              <h5 className="btn btn-info mt-0 mb-0">
                Follow: {followInformation.followNumber}
              </h5>
            </>
          );
        }
        else {
            return (
              <>
                <h5 className="btn btn-info mt-0 mb-0">
                  Followers: {followInformation.followersNumber}
                </h5>
                <h5 className="btn btn-info mt-0 mb-0">
                  Follow: {followInformation.followNumber}
                </h5>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => HandleFollow(true)}
                >
                  Follow
                </button>
              </>
            );
        }
      }
    
}

export default BtnFollow