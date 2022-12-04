import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import hostName from '../../../config';
import './AdminSeeAllCategories.css';


function AdminSeeAllCategories(){
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const [refreshPage, setRefreshPage] = useState(false)
    axios.defaults.baseURL = hostName;

    useEffect(()=>{
        try{
            setRefreshPage(true)
            axios.get('/category/all')
            .then(axios=>{
                setCategories(axios.data.categories)
                setRefreshPage(false)
            }) 
            .catch((e)=>{
                console.log(e)
                setLoading(false)
            })
        }catch(e){
            location.reload()
        }

    }, [refreshPage])

    const deleteCategory = (e, categoryId)=>{
        e.preventDefault();
        e.stopPropagation();
        if(window.confirm("You're sur to delete this category ?")){
            try{
                axios.delete(`/category/delete/${categoryId}`)
                .then(axios=>{
                   if(axios.status == 200){
                        setRefreshPage(true)
                   }
                })
            }catch(e){
                console.log(e)
            }
        }
    }

    if(categories == null){
        return(
            <>
            </>
        )
    }else{
        return(
            <section className="AdminSeeAllCategories main">
                    <Link className="AdminSeeAllCategories_create-category-button" to='/admin/category/new'>Create new category</Link>
                    <table cellSpacing="0">
                        <tbody>
                            <tr>
                                <th className="AdminSeeAllCategories_category-case" scope="col">Categorie Name</th>
                                <th className="AdminSeeAllCategories_category-case" scope="col">Categorie Description</th>
                                <th className="AdminSeeAllCategories_option-case" scope="col">Change</th>
                                <th className="AdminSeeAllCategories_option-case" scope="col">Delete</th>
                            </tr>
                            {categories?.map((element, index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row">{element?.name}</th>
                                        <th scope="row">{element?.description}</th>
                                        <th scope="row"><Link to={`/admin/category/update/${element.id}`}>Modifier</Link></th>
                                        <th scope="row"><button className="AdminSeeAllCategories_delete-button" onClick={event=>deleteCategory(event, element.id)}></button> </th>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
            </section>
        )
    }
};

export default AdminSeeAllCategories;