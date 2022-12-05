import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import hostName from '../../../config/hostName';
import './ReaderAllPostOnCategory.css';
import Loading from "../../Partials/Loading/Loading";



function ReaderAllPostOnCategory(){
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [category, setCategory] = useState(null)

    axios.defaults.baseURL = hostName;
    const {categoryId} = useParams();

    useEffect(()=>{
        try{
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
            setLoading(false)
        }catch(e){
            setLoading(false)
            console.log(e)
        }
    }, [])

    if(loading == true){
        return(
            <Loading/>
        )
    }else{
        return( 
            <>
                <section className='ReaderAllPostOnCategory main'>
                    <h1 className="font-title">{category.name}</h1>
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