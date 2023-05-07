import { createContext, useState, useEffect } from "react";


// esto es lo que va a almacenar los datos
export const DatosDeContexto = createContext();

// esto es lo que engloba al resto de componentes
export function TestContextProvider(props) {
  
  

  // contains all the information about the posts
  let [posts, setPosts] = useState([]);

  // contains what the user input in the text are in CreatePost.jsx
  const [bodyPost, setBodyPost] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editBtnInformation, setEditBtnInformation] = useState("");
  const [isButtonClickGlobal, setIsButtonClickGlobal] = useState({contador: 0, lastClickId : ""});

  


  const [fromNumberOfPagination, setFromNumberOfPagination] = useState(0);





  // add a new post
  function CreatePost(newPost) {
    setPosts((prevState) => [newPost, ...prevState]);
  }


  let [postsPerfil, setPostsPerfil] = useState();

  let [profileData, setProfileData] = useState();

  const [userRequest, setUserRequest] = useState();

  
  useEffect(() => {
    const userRequestFetching = async () => {
      const response = await fetch(`http://127.0.0.1:8000/user_request`);
      const json = await response.json();
      setUserRequest(json.usuario);
    };

    userRequestFetching();
  }, []);

  
  

  //aca lo que haces en value es pasarle todos los datos y funciones en forma de objeto, y despues podes acceder poniendo value.something
  return (
    <DatosDeContexto.Provider
      value={{
        CreatePost,
        posts,
        setPosts,
        bodyPost,
        setBodyPost,
        userRequest,
        postsPerfil,
        setPostsPerfil,
        profileData,
        setProfileData,
        isEditing,
        setIsEditing,
        fromNumberOfPagination,
        setFromNumberOfPagination,
        setEditBtnInformation,
        editBtnInformation,
        isButtonClickGlobal,
        setIsButtonClickGlobal,
      }}
    >
      {props.children}
    </DatosDeContexto.Provider>
  );
}

{
  //es importante lo que pones en value dentro del return, ya que eso serian los props que pasas
}
