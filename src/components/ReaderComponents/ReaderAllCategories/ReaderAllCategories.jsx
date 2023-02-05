import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/apiHost.config";
import Loading from "../../Partials/Loading/Loading";
import './ReaderAllCategories.css'
 

function ReaderAllCategories(){
    const [loading, setLoading] = useState(true)
    const [noFound, setNoFound] = useState(false)
    const [categories, setCategories] = useState(null);

    const navigateTo = useNavigate()

    useEffect(()=>{
        async function getCategories(){
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json' 
                }
            };
            fetch(`${api}/category/all`, requestOptions)
            .then(response=>{
                if(response.status != 200){
                    setLoading(false)
                }
                return response.json()
            })
            .then(data=>{
                setCategories(data.categories)
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
                    <h1 className="font-title">All Categories</h1>
                    {categories?.map((item, index) => {
                            return   <Link className="ReaderAllCategories_link" key={index} to={`/reader/category/${item.id}`} >{item.name} : {item.description}</Link>
                            })}
                </section>            
            
        )
    }
};

export default ReaderAllCategories;