import { createContext, useState, useEffect } from "react";


//? esto es lo que va a almacenar los datos del contexto
export const DatosDeContexto = createContext();

// esto es lo que engloba al resto de componentes
export function TestContextProvider(props) {

  // contains what the user input in the text of CreatePost.jsx
  const [bodyPost, setBodyPost] = useState("");

  // contains the number of the actual page
  const [fromNumberOfPagination, setFromNumberOfPagination] = useState(0);

  // contains who is the user log in.
  const [userRequest, setUserRequest] = useState(null);

  // son las variables que usas para el click de edit button
  const [isEditing, setIsEditing] = useState(false);
  const [idBtnClickGlobal, setIdBtnClickGlobal] = useState("");






  // contains all the data of the posts
  const [postsData, setPostsData] = useState([]);

  // contains all the data if there is any new post
  const [totalNumberOfPages, setTotalNumberOfPages] = useState();

  // contains all the data of the 3 number
  const [postsDataThird, setPostsDataThird] = useState([]);


  

  // add a new post
  function CreatePost(newPost) {
    setPostsData([newPost, ...postsData.posts]);
    location.reload();
  }

  // pagination variables
  const pages = 10;


  

  useEffect(() => {
    if (userRequest === null) {
      const userRequestFetching = async () => {
        const response = await fetch(`http://127.0.0.1:8000/user_request`);
        const json = await response.json();
        setUserRequest(json.usuario);
      };

      userRequestFetching()
    };
  }, [userRequest]);

  // contains all the information about the posts
  // TODO ver de hacer esto global y que el componente posts se nutra de esto, ya que despues sino por ej. en perfil terminas haciendo 2 api request, en cambio aca solo haces una.

  
  
  function GettingPostData(request) {
    const fetchData = async () => {
          
      const dataFromServer = await fetch(
            `http://127.0.0.1:8000/${request}?limit=${pages}&offset=${fromNumberOfPagination}`);
            console.log(fromNumberOfPagination)
          
          const postData = await dataFromServer.json();
          
          setTotalNumberOfPages(postData.posts[0].posts_count)
          setPostsData(postData);
        };
    fetchData();

    }
  
    


  // ? aca lo que haces en value es pasarle todos los datos y funciones en forma de objeto, y despues podes acceder poniendo value.something
  return (
    <DatosDeContexto.Provider
      value={{
        CreatePost,
        postsData,
        setPostsData,
        totalNumberOfPages,
        postsDataThird,
        setPostsDataThird,
        bodyPost,
        setBodyPost,
        userRequest,
        isEditing,
        setIsEditing,
        fromNumberOfPagination,
        setFromNumberOfPagination,
        idBtnClickGlobal,
        setIdBtnClickGlobal,
        pages,
        GettingPostData,
      }}
    >
      {props.children}
    </DatosDeContexto.Provider>
  );
}

  //? es importante lo que pones en value dentro del return, ya que eso serian los props que pasas

