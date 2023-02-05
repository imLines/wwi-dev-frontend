import { useEffect, useState } from "react";
import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import "./ReaderSeeAllPosts.css";
import api from "../../../config/apiHost.config";
import Loading from "../../Partials/Loading/Loading";

function ReaderSeeAllPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      async function getAllPosts() {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        fetch(`${api}/post/all`, requestOptions)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setPosts(data.posts)
            setLoading(false)

          })
      }
      if (posts == null) {
        getAllPosts()
      }

    } catch (e) {
      console.log(e);
    }
  }, []);


  if (loading == true || posts == null) {
    return <Loading />;
  } else if (posts.length < 1) {
    return (

      <section className="ReaderSeeAllPosts main">
        <h1 className="font-title">All posts</h1>
        <p>Any post found for the moment</p>
      </section>
    )
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
