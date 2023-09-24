import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import { Title } from "../components/Title";
import { DatosDeContexto } from "../context/TestContext";
import { useContext, useEffect } from "react";



// import "../styles/css/style.css";

function Index() {
  const { GettingPostData, fromNumberOfPagination, setFromNumberOfPagination } = useContext(DatosDeContexto);

  

  useEffect(() => {
    GettingPostData("posts");
  }, [fromNumberOfPagination]);
 

  return (
    <>
      <div className="container p-0">
        <Title page={"All Posts"} />
        <CreatePost />
        <Posts />
        <Pagination link={"/"} />
      </div>
    </>
  );
}

export default Index;
