import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function ChoreoUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [skills, setSkills]=useState("")
    const navigate=useNavigate();
    const {id}=useParams();

    const updateChoreo=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/choreos/${id}/update`, {
            name:name,
            description:description,
            skills:skills
        },{headers:authHeader()})
            .then(res=>{
                navigate(`/choreos/${res.data.id}`)
            })
            .catch(err=>console.log(err))
    }
    const loadChoreo=()=>{
        axios.get(`http://localhost:8080/choreos/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setSkills(res.data.skills)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadChoreo()
    },[])
    return(
        <>
            <form onSubmit={updateChoreo}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div>
                    <label>Skills</label>
                    <input type="text" onChange={(e)=>setSkills(e.target.value)} value={skills}/>
                </div>
                <input type="submit" value="Post Choreo"/>
            </form>
        </>
    )
}
export default ChoreoUpdate;