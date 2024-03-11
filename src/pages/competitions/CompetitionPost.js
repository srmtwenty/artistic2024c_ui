import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function CompetitionPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [location, setLocation]=useState("")
    const [date, setDate]=useState(new Date());

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/competitions/create", {
            name:name,
            description:description,
            location:location,
            date:date
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/competitions")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Competition</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Location:</label>
                                <input type="text" onChange={(e)=>setLocation(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Competition"/>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/competitions">Back to List</Link> 
                    </div>
                
                </div>
            </div>
        </>
    )
}
export default CompetitionPost;