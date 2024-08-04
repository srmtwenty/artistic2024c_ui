import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../../services/auth-header';

function SwimsuitDetailPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/swimsuitDetails/create", {
            name:name,
            description:description,
            color:color,
            year:year
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/swimsuitDetails")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Swimsuit Detail</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Color:</label>
                                <input type="text" onChange={(e)=>setColor(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Year:</label>
                                <input type="text" onChange={(e)=>setYear(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post SwimsuitDetail"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/swimsuitDetails">Back to List</Link> 
                    </div> 
                </div>
            </div>
        </>
    )
}
export default SwimsuitDetailPost;