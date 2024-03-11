import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function TagPost(){
    const [name, setName]=useState("")

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/tags/create", {
            name:name, 
        },{headers:authHeader()})
            .then(res=>{
                navigate("/tags")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Tag</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Tag"/>
                                </div>
                            </div>
                        </form>
                    </div>
                   
                    <div className="createLink">
                        <Link className="link" to="/tags">Back to List</Link> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default TagPost;