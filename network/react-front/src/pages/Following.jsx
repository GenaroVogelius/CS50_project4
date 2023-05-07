import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";


function Following() {
  return (
    <>
      <h1>Following posts</h1>
      <div className="container">
        <CreatePost />
        <Posts />
      </div>
    </>
  );
}

export default Following;
