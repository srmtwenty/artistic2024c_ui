import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../../services/auth-header';

function ArticlePost(){
    const [name, setName]=useState("")
    const [address, setAddress]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/articles/create", {
            name:name,
            address:address,
            date:date,
            description:description
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/articles")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Article</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Address:</label>
                                <input type="text" onChange={(e)=>setAddress(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Article"/>
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
export default ArticlePost;