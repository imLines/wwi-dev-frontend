import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config/hostName';
import AdminPostCard from '../AdminPostCard/AdminPostCard';
import './AdminSeeAllPosts.css';

import Loading from '../../Partials/Loading/Loading';

function AdminSeeAllPosts(){
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null);
    const [postWithoutCategory, setPostWithoutCategory] = useState(null);
    const [lookPostWithoutCategory, setLookPostWithoutCategory] = useState(false)
    const [refreshPage, setRefreshPage] = useState(false);


    useEffect(()=>{
        try{
            axios.defaults.baseURL = hostName;
            axios.get('/post/all')
            .then(posts=>{
                if(posts){
                    setPosts(posts.data.posts)
                    axios.get('/post/all/manage-category')
                    .then(responsePostWithoutCategory=>{
                        setPostWithoutCategory(responsePostWithoutCategory.data.posts)
                        setRefreshPage(false)
                        setLoading(false)
                    })

                }else{
                    alert('no post')
                }
            }) 
            .catch((e)=>{                
                console.log(e)
                setLoading(false)
            })
        }catch(e){
            location.reload();
        }
    }, [refreshPage])

    const FunctionChangeLookPostWithoutCategory = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(lookPostWithoutCategory){
            setLookPostWithoutCategory(false)
            return setRefreshPage(true)
        }
        setLookPostWithoutCategory(true)
        setRefreshPage(true)
    }

    if(loading == true){
        return(
            <Loading/>
        )
    }else if(loading == false && lookPostWithoutCategory == false){
        return( 
            <section className='AdminSeeAllPosts main'>
                <div className='AdminSeeAllPosts_tools-container'>
                    <button className='font-title' onClick={FunctionChangeLookPostWithoutCategory}>Look all posts without category</button>
                </div>
                <h1 className='font-title'>All posts</h1>
                <div className='AdminSeeAllPosts_card-container'>
                    {posts?.map(post=><AdminPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    


    }else{
        return(
            <section className='AdminSeeAllPosts main'>
                <div className='AdminSeeAllPosts_tools-container'>
                    <button className='font-title' onClick={FunctionChangeLookPostWithoutCategory}>Look all posts</button>
                </div>
                <h1 className='font-title'>All posts without category</h1>
                <div className='AdminSeeAllPosts_card-container'>
                    {postWithoutCategory?.map(post=><AdminPostCard post={post} key={post.id} />)}
                </div>
            </section>
        )
    }
};

export default AdminSeeAllPosts;