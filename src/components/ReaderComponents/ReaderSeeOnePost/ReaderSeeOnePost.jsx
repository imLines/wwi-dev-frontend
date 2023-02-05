import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ReaderSeeOnePost.css'; 
import {FacebookShareButton, FacebookIcon,
        TwitterShareButton, TwitterIcon,
        WhatsappShareButton, WhatsappIcon
} from 'react-share'; 
import Loading from "../../Partials/Loading/Loading";

function ReaderSeeOnePost(){
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null);
    const [dateOfPost, setDateOfPost] = useState(null);
    const [category, setCategory] = useState(null)
    const [copiedPath, setCopiedPath] = useState('Copy Link');

    let {postId} = useParams();
    const navigateTo = useNavigate();

    useEffect(()=>{
        try{
            function setDateForBestLook(date){
                const toDate = new Date(date)
                setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(toDate))
            } 

            async function getPostAndCategory(){
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                };
                const responsePost = await fetch(`/api/post/${postId}`, requestOptions)
                if(responsePost.status != 200){
                    navigateTo('/')
                }
                const dataPost = await responsePost.json();
                setPost(dataPost.post)
                setDateForBestLook(dataPost.post.createdAt)
                const responseCategory = await fetch(`/api/category/${dataPost.post.categoryId}`, requestOptions)
                const dataCategory = await responseCategory.json()
                setCategory(dataCategory.category)
                setLoading(false)
            }
            getPostAndCategory()
        }catch(e){
            setLoading(false)
        }
    }, [])

    function copyLink(){
        navigator.clipboard.writeText(window.location)
        setCopiedPath('copied')
        setTimeout(function(){
            setCopiedPath('Copy Link')
        }, 3000)
    }


    if(loading == true){
        return(
            <Loading/>
        )
    }else{
        return(
            <>
            <section className="ReaderSeeOnePost">
                <div className="ReaderSeeOnePost_header">
                    <h1 className="font-title">{post.title}</h1>
                    <p>In the category <b>{category.name}</b></p>
                    <p>Author : <b>{post.author}</b>, created the {dateOfPost}</p>
                    <img src={post.picture}/>
                </div>
                <div className="ReaderSeeOnePost_content-container">
                    <div className="ReaderSeeOnePost_content" dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
                <div className="ReaderSeeOnePost_share-container">
                    <p>Share :</p>
                    <FacebookShareButton className="ReaderSeeOnePost_link" url={window.location}>
                        <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton className="ReaderSeeOnePost_link" url={window.location}>
                        <TwitterIcon size={40} round={true}/>
                    </TwitterShareButton>
                    <WhatsappShareButton className="ReaderSeeOnePost_link" url={window.location}>
                        <WhatsappIcon size={40} round={true}/>
                    </WhatsappShareButton>
                    <button className={`ReaderSeeOnePost_button-copy-link font-title ${copiedPath}`} onClick={copyLink}>{copiedPath}</button>
                </div>

            </section> 
            </>
        )
    }

};

export default ReaderSeeOnePost;