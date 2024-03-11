import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../../services/auth-header';

function BroadcastPost(){
    const [name, setName]=useState("")
    const [url, setUrl]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/broadcasts/create", {
            name:name,
            url:url,
            date:date,
            description:description
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/broadcasts")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Broadcast</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">URL:</label>
                                <input type="text" onChange={(e)=>setUrl(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Broadcast"/>
                                </div>
                               
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/broadcasts">Back to List</Link> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default BroadcastPost;