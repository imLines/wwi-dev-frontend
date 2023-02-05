import { useEffect, useState } from "react";
import AdminPostCard from "../AdminPostCard/AdminPostCard";
import "./AdminSeeAllPosts.css";
import api from "../../../config/apiHost.config";
import Loading from "../../Partials/Loading/Loading";

function AdminSeeAllPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [postWithoutCategory, setPostWithoutCategory] = useState(null);
  const [lookPostWithoutCategory, setLookPostWithoutCategory] = useState(false);

  useEffect(() => {
    try {
      (async function(){
        const token = localStorage.getItem('token');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };

        async function getAllPostsWithCategory(){
          const responseWith = await fetch(`${api}/post/all`, requestOptions);
          const dataWith = await responseWith.json();
          return dataWith.posts
        }
        async function getAllPostsWithoutCategory(){
          const responseWithout = await fetch(`${api}/post/all/manage-category`, requestOptions);
          const dataWithout = await responseWithout.json();
          return dataWithout.posts
        }
       
        const postWithByAPI = await getAllPostsWithCategory();
        setPosts(postWithByAPI);
        const postWithoutByAPI = await getAllPostsWithoutCategory();
        setPostWithoutCategory(postWithoutByAPI);
        
        setLoading(false)

      })()


    } catch (e) {
    }
  }, []);

  const FunctionChangeLookPostWithoutCategory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (lookPostWithoutCategory) {
      setLookPostWithoutCategory(false);
    } else {
      setLookPostWithoutCategory(true);
    }
  };

  if (posts == null) {
    return <Loading />;

  } else if (loading == false && lookPostWithoutCategory == false) {
    return (
      <section className="AdminSeeAllPosts main">
        <div className="AdminSeeAllPosts_tools-container">
          <button
            className="font-title"
            onClick={FunctionChangeLookPostWithoutCategory}
          >
            Look all posts without category
          </button>
        </div>
        <h1 className="font-title">All posts</h1>
        <div className="AdminSeeAllPosts_card-container">
          {posts?.map((post) => (
            <AdminPostCard post={post} key={post.id} />
          ))}
        </div>
      </section>
    );
  } else if (loading == false && lookPostWithoutCategory == true) {
    return (
      <section className="AdminSeeAllPosts main">
        <div className="AdminSeeAllPosts_tools-container">
          <button
            className="font-title"
            onClick={FunctionChangeLookPostWithoutCategory}
          >
            Look all posts
          </button>
        </div>
        <h1 className="font-title">All posts without category</h1>
        <div className="AdminSeeAllPosts_card-container">
          {postWithoutCategory?.map((post) => (
            <AdminPostCard post={post} key={post.id} />
          ))}
        </div>
      </section>
    );
  }
}

export default AdminSeeAllPosts;
