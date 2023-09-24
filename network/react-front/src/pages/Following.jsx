import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import { Title } from "../components/Title";
import { DatosDeContexto } from "../context/TestContext";
import { useContext, useEffect } from "react";



function Following() {

  const { GettingPostData, fromNumberOfPagination, setFromNumberOfPagination } =
    useContext(DatosDeContexto);

  useEffect(() => {
    GettingPostData("following");
  }, [fromNumberOfPagination]);
 

  return (
    <>
      <div className="container p-0">
        <Title page={"Following"} />
        <CreatePost />
        <Posts />
        <Pagination link={"following/"} />
      </div>
    </>
  );
}

export default Following;
