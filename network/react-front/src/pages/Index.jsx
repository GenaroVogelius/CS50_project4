import CreatePost from "../components/CreatePost";

import Posts from "../components/Posts";
import Pagination from "../components/Pagination";

function Index() {
  return (
    <>
      <h1>All Posts</h1>
      <div className="container">
        <CreatePost />
        <Posts />
        <Pagination />
      </div>
    </>
  );
}

export default Index;
