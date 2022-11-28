import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import hostName from '../../../config';
import './ReaderAllPostOnCategory.css';



function ReaderAllPostOnCategory(){
    const [posts, setPosts] = useState(null);
    const [category, setCategory] = useState(null)

    axios.defaults.baseURL = hostName;
    const {categoryId} = useParams();

    useEffect(()=>{
        async function getPosts(){
            const response = await axios.get(`/post/category/${categoryId}`) 
            setPosts(response.data.posts)
        }
        async function getCategory(){
            const response = await axios.get(`/category/${categoryId}`)
            setCategory(response.data.category)
        }
        getPosts();
        getCategory()
    }, [])

    if(posts == null || category == null){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }else{
        return( 
            <>
                <section className='ReaderAllPostOnCategory'>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <div className='ReaderAllPostOnCategory_card-container'>
                        {posts?.map(post=><ReaderPostCard post={post} key={post.id} />)}
                    </div>
                </section> 
            </>
        )
    }
};

export default ReaderAllPostOnCategory;