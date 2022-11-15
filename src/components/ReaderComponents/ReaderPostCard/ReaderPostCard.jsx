import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ReaderPostCard.css'

const ReaderPostCard = function({post}){
    const [data, setData]= useState('');

    useEffect(()=>{
        setData(post.content)
    }, [])

    return( 
        <Link className='AdminPostCard' to={`/reader/post/${post.id}`}>
            <img className='AdminPostCard_picture' src={post.picture}/>
            <div className='AdminPostCard_title-container'>
                <p>{post.title}</p>
            </div>
        </Link>
    );
}; 

export default ReaderPostCard;