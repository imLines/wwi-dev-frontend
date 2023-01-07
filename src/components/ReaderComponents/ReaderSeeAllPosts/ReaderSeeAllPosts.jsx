import { useEffect, useState } from "react";
import axios from "axios";
import hostName from "../../../config/hostName";
import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import "./ReaderSeeAllPosts.css";

import Loading from "../../Partials/Loading/Loading";

function ReaderSeeAllPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  axios.defaults.baseURL = hostName;
  
  useEffect(() => {
    setLoading(true);
    try {
      async function getAllPosts(){
        const response  = await axios.get('/post/all');
          const postsByAPI = await response.data.posts;
          setPosts(postsByAPI)
          setLoading(false)
      }
      if(posts == null){
        getAllPosts()
      }

    } catch (e) {
      console.log(e);
    }
  }, []);

  if (loading == true || posts == null) {
    return <Loading />;
  } else {
    return (
      <section className="ReaderSeeAllPosts main">
        <h1 className="font-title">All posts</h1>
        <div className="ReaderSeeAllPosts_card-container">
          {posts?.map((post) => (
            <ReaderPostCard post={post} key={post.id} />
          ))}
        </div>
      </section>
    );
  }
}

export default ReaderSeeAllPosts;
