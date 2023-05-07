import { useState, useEffect, useContext } from "react";
import MgSpan from "./MgSpan";
import Spinner from "./Spinner";
import EditBtn from "./EditBtn";
import { useHistory, useParams, Link } from "react-router-dom";
import { DatosDeContexto } from "../context/TestContext";
import Content from "./Content";


function Posts() {
  let [postsData, setPostsData] = useState();
  const urlPath = useHistory().location.pathname;
  const { userRequest, fromNumberOfPagination } = useContext(DatosDeContexto);

  
  
  if (urlPath === "/") {
    useEffect(() => {
      const fetchData = async () => {
        const dataFromServer = await fetch(
          `http://127.0.0.1:8000/posts/?offset=${fromNumberOfPagination}`
        );
        const postData = await dataFromServer.json();
        setPostsData(postData);
      };
      fetchData();
    }, [urlPath, fromNumberOfPagination]);

    }

  else if (urlPath.includes("/profile/")) {
      const { username } = useParams();

      useEffect(() => {
        async function fetchData() {
          const dataFromServer = await fetch(
            `http://127.0.0.1:8000/profile/${username}`
          );
          const Data = await dataFromServer.json();
          
          const postData = Data[0];
          

          setPostsData(postData);
        }
        fetchData();
      }, [urlPath]);
    }

  else if (urlPath === "/following") {
      useEffect(() => {
      async function fetchData() {
      const dataFromServer = await fetch(`http://127.0.0.1:8000/following`);
      const postData = await dataFromServer.json();
      setPostsData(postData);
    }
    fetchData();
  }, [urlPath]);
      
    }


  // chequeas que haya data en post y que no haya un mensaje en postData, ya que si hay un mensaje será en este caso el que te dice que no hay seguidos.
  if (postsData && !postsData.message) {
    
    
  return (
    <>

      {postsData.map((post, index) => {
        return (
          <div className="card-body" key={index}>
            <div
              className="container-fluid"
              style={{ borderStyle: "inset", borderColor: "#8e3877" }}
            >
              <div className="container-fluid d-flex flex-wrap gap-2 w-100 justify-content-between ">
                <Link to={`/profile/${post.user_poster}`}>
                  <h2 className="userTitle" id={index}>
                    {post.user_poster}
                  </h2>
                </Link>
                {/* cambiar despues el lugar de true y dalse de userRequest porque esta asi para test */}
                <EditBtn
                  editInformation={{
                    isEditable: userRequest == post.user_poster ? false : true,
                    id: post.id,
                  }}
                />
              </div>

              <Content
                contentInformation={{ content: post.content, id: post.id }}
              />

              <small className="opacity-50 text-nowrap d-grid gap-2 d-flex justify-content-end mt-2">
                {post.timestamp}
              </small>
              <p className="opacity-50 text-nowrap d-grid gap-2 d-flex justify-content-end mt-2">
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
            <hr />
          </div>
        );
      })}
    </>
  );

  } 
  else if (postsData) {
    
    return <h1>{postsData.message}</h1>;
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

export default Posts;
