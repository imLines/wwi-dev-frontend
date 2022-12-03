import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import AdminPostCard from '../AdminPostCard/AdminPostCard';
import './AdminSeeAllPosts.css';

function AdminSeeAllPosts(){
    const [posts, setPosts] = useState(null);
    const [managerMod, setManagerMode] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);
    useEffect(()=>{
        setRefreshPage(true)
        axios.defaults.baseURL = hostName;
        axios.get('/post/all')
        .then(posts=>{
            if(posts){
                setPosts(posts.data.posts)
                setRefreshPage(false)
            }else{
                alert('no post')
            }
        }) 
    }, [managerMod, refreshPage])

    const changeMod = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(managerMod == false){
            setManagerMode(true)
        }else{
            setManagerMode(false)
        }
    }
    function setDateForBestLook(date){
        const toDate = new Date(date)
        const dateGoodFormat = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(toDate)
          return dateGoodFormat
    }

    const deletePost = (e, postId)=>{
        if(window.confirm("You're sur to delete this post ?")){
            e.preventDefault();
            e.stopPropagation();
            try{
                axios.delete(`/post/delete/${postId}`)
                .then(axios=>{
                        setRefreshPage(true)
                })
            }catch(e){
                console.log(e)
            }
        }
    }

    if(posts == null){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }else if(managerMod){
        return(
            <section className="AdminSeeAllPostsManagerMode main">
                <h2>Manager Mode</h2>
                <button className='AdminSeeAllPosts_change-mode' onClick={changeMod}>Change Mode</button>
                <table cellSpacing="0">
                    <tbody >
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">created At</th>
                            <th scope="col">Change</th>
                            <th scope="col">Delete</th>
                        </tr>
                        {posts?.map((element, index)=>{
                            return(
                                <tr key={index}>
                                    <th scope="row"><Link to={`/admin/post/${element.id}`}>{element?.title}</Link></th>
                                    <th scope="row">{setDateForBestLook(element?.createdAt)}</th>
                                    <th scope="row"><Link to={`/admin/post/update/${element.id}`}>Modifier</Link></th>
                                    <th scope="row"><button className='AdminSeeAllPostsManagerMode_delete-button' onClick={event=>deletePost(event, element.id)}></button> </th>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </section>
        )
    }else if(!managerMod){
        return( 
            <section className='AdminSeeAllPosts main'>
                <h1>All posts</h1>
                <h3>Viewer Mode</h3>
                <button className='AdminSeeAllPosts_change-mode' onClick={changeMod}>Change Mode</button>
                    <div className='AdminSeeAllPosts_card-container'>
                        {posts?.map(post=><AdminPostCard post={post} key={post.id} />)}
                    </div>
            </section>
        )
    


    }
};

export default AdminSeeAllPosts;