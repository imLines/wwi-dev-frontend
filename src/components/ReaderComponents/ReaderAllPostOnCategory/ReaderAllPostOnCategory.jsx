import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReaderPostCard from "../ReaderPostCard/ReaderPostCard";
import './ReaderAllPostOnCategory.css';
import Loading from "../../Partials/Loading/Loading";



function ReaderAllPostOnCategory(){
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [category, setCategory] = useState(null)

    const {categoryId} = useParams();

    useEffect(()=>{
        try{
            async function getCategory(){
                const requestOptions = {
                    method: 'GET',
                    headers: { 'content-Type' : 'application/json' }
                };
                const responseCategory = await fetch(`/api/category/${categoryId}`, requestOptions);
                const dataCategory = await responseCategory.json();
                setCategory(dataCategory.category)
            }
            async function getPosts(){
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type' : 'application/json' }
                };
                const responsePosts = await fetch(`/api/post/category/${categoryId}`, requestOptions);
                const dataPosts = await responsePosts.json();
                setPosts(dataPosts.posts)
                setLoading(false)
            }

            getCategory()
            getPosts()
        }catch(e){
            setLoading(false);
        }
    }, []) 

    if(loading == true){
        return(
            <Loading/>
        )
    }else if(posts == null || posts.length < 1){
        return(
            <>
                <section className='ReaderAllPostOnCategory main'>
                    <h1 className="font-title">{category.name}</h1>
                    <p>{category.description}</p>
                    <p>Any post in this category for the moment.</p>
                </section> 
            </>
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