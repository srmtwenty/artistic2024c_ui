import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../../services/auth-header';

function ArticleUpdate(){
    const [name, setName]=useState("")
    const [address, setAddress]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")

    const navigate=useNavigate();
    const {id}=useParams();

    const loadArticle=()=>{
        axios.get(`http://localhost:8080/articles/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setAddress(res.data.address)
                setDate(res.data.date)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadArticle();
    },[])
    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/articles/${id}/update`, {
            name:name,
            address:address,
            date:date,
            description:description
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/articles/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Article</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Address:</label>
                                <input type="text" onChange={(e)=>setAddress(e.target.value)} value={address}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Article"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/articles/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/articles">Back to List</Link>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default ArticleUpdate;