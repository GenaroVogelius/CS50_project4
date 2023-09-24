import { useState, useEffect, useContext } from "react";
import MgSpan from "./MgSpan";
import Spinner from "./Spinner";
import EditBtn from "./EditBtn";
import { Link } from "react-router-dom";
import { DatosDeContexto } from "../context/TestContext";
import Content from "./Content";


function Posts() {
  // let [postsData, setPostsData] = useState();

  const { userRequest, postsData, setPostsData } = useContext(DatosDeContexto);

  
  useEffect(() => {
    // aca pone como dependencia que mire a la variable global que cuando es actualizada en base a eso cambia el estado de la variable local.
    setPostsData(postsData)
  }, [postsData]);



  // chequeas que haya data en post y que no haya un mensaje en postData, ya que si hay un mensaje será en este caso el que te dice que no hay seguidos.
  if (postsData.posts) {
    
    
  return (
    <div className="posts p-3">
      {postsData.posts.map((post, index) => {
        return (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <div className="container-fluid d-flex flex-wrap gap-2 w-100 justify-content-between mb-3 px-2">
                <Link to={`/profile/${post.user_poster}`}>
                  <h2 className="userTitle" id={index}>
                    {post.user_poster}
                  </h2>
                </Link>
                {/* ! CHANGE == */}
                <EditBtn
                  editInformation={{
                    isEditable: userRequest == post.user_poster ? true : false,
                    id: post.id,
                  }}
                />
              </div>

              <Content
                contentInformation={{ content: post.content, id: post.id }}
              />

              <small className="text-nowrap d-grid gap-2 d-flex justify-content-end mt-2">
                {post.timestamp}
              </small>
              <p className="text-nowrap d-grid gap-2 d-flex justify-content-end mt-2">
                <MgSpan
                  PostInformation={{
                    mgState: post.mg_state,
                    userPoster: post.user_poster,
                    contadorMg: post.contadorMg,
                    id: post.id,
                    index: index,
                  }}
                />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  } 
  else if (postsData.message) {
    return <h1 className="text-center">{postsData.message}</h1>;
  }
  
  else {
    return (
      <>
        <div className="container">
          <Spinner />
          LOADING
        </div>
      </>
    );
    
  }
}

export default Posts;
