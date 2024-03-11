import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function NationalTeamPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    //const [nationalTeam, setNationalTeam]=useState(1)
    //const [nation, setNation]=useState(1)

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/nationalTeams/create", {
            name:name,
            description:description
            //nation:nation
            //nationalTeam:nationalTeam
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/nationalTeams")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create National Team</h2>
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
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post National Team"/>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/nationalTeams">Back to List</Link> 
                    </div> 
                </div>
            </div>
            
        </>
    )
}
export default NationalTeamPost;