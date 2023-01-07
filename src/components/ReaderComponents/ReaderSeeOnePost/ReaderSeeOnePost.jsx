import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ReaderSeeOnePost.css';
import axios from 'axios';
import hostName from "../../../config/hostName";
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
    const [pathInLocation, setPathInLocation] = useState('')
    const [copiedPath, setCopiedPath] = useState('Copy Link');

    let {postId} = useParams();

    useEffect(()=>{
        try{
            axios.defaults.baseURL = hostName;
            function setDateForBestLook(date){
                const toDate = new Date(date)
                setDateOfPost(new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(toDate))
            } 
            axios.get(`/post/${postId}`)
            .then(responseAxiosPost=>{
                setPost(responseAxiosPost.data.post)
                setDateForBestLook(responseAxiosPost.data.post.createdAt)
                axios.get(`/category/${responseAxiosPost.data.post.categoryId}`)
                .then(responseAxiosCategory=>{
                    if(responseAxiosCategory.status == 200){
                        setCategory(responseAxiosCategory.data.category)
                        setLoading(false)
                        setPathInLocation(location.origin+location.pathname)
                    }
                })
                .catch((e)=>{
                    setLoading(false)
                    console.log(e)
                })
            })
            .catch((e)=>{
                setLoading(false)
                console.log(e)
            })
        }catch(e){
            setLoading(false)
            console.log(e)
        }
    }, [])

    function copyLink(){
        navigator.clipboard.writeText(pathInLocation)
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
                    <FacebookShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
                        <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
                        <TwitterIcon size={40} round={true}/>
                    </TwitterShareButton>
                    <WhatsappShareButton className="ReaderSeeOnePost_link" url={pathInLocation}>
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