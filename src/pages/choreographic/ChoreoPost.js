import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function ChoreoPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [skills, setSkills]=useState("")
    const navigate=useNavigate();

    const postChoreo=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/choreos/create", {
            name:name,
            description:description,
            skills:skills
        },{headers:authHeader()})
            .then(res=>{
                navigate(`/choreos/${res.data.id}`)
            })
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <form onSubmit={postChoreo}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Skills</label>
                    <input type="text" onChange={(e)=>setSkills(e.target.value)}/>
                </div>
                <input type="submit" value="Post Choreo"/>
            </form>
        </>
    )
}
export default ChoreoPost;