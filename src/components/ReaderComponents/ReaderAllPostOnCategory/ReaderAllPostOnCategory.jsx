import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import hostName from '../../../config';



function ReaderAllPostOnCategory(){
    const [posts, setPosts] = useState(null);

    axios.defaults.baseURL = hostName;
    const {categoryId} = useParams();

    useEffect(()=>{
        async function getPosts(){
            const response = await axios.get(`/post/category/${categoryId}`) 
            setPosts(response.data.posts)
        }
        getPosts();
    }, [])

    if(posts == null){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }else{
        return( 
            <>
                <h2>Viewer Mode</h2>
                <section className='AdminSeeAllPosts'>
                    <div className='AdminSeeAllPosts_card-container'>
                        {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                    </div>
                </section> 
            </>
        )
    


    }
};

export default ReaderAllPostOnCategory;