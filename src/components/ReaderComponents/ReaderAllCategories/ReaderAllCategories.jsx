import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hostName from '../../../config';
import Loading from "../../Partials/Loading/Loading";
import './ReaderAllCategories.css'
 

function ReaderAllCategories(){
    const [loading, setLoading] = useState(true)
    const [noFound, setNoFound] = useState(false)
    const [categories, setCategories] = useState(null);
    axios.defaults.baseURL = hostName;

    useEffect(()=>{
        async function getCategories(){
            axios.get('/category/all')
            .then(response=>{
                if(response.status == 200){
                    setLoading(false)
                    setCategories(response.data.categories)
                }

            })
            .catch((e)=>{
                if(e.response.status == 404){
                    setNoFound(true)
                }
                setLoading(false)
            })
        }
        getCategories();

    }, [])

    if(loading == true){
        return(
            <Loading/>
        )
    }else if(noFound == true){
        return(
            <section className="NoFoundContent">
                <h2>Any Category for the moment, sorry.</h2>
            </section>
        )
    }else{
        return(
            
                <section className="ReaderAllCategories main">
                    {categories?.map((item, index) => {
                            return   <Link className="ReaderAllCategories_link" key={index} to={`/reader/category/${item.id}`} >{item.name} : {item.description}</Link>
                            })}
                </section>            
            
        )
    }
};

export default ReaderAllCategories;