import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function SwimsuitPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")

    const navigate=useNavigate();

    const postSwimsuit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/swimsuits/create", {
            name:name,
            description:description,
            color:color,
            year:year
        },{headers:authHeader()})
            .then(res=>{
                navigate(`/swimsuits/${res.data.id}`)
            })
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <form onSubmit={postSwimsuit}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>Color:</label>
                    <input type="text" onChange={(e)=>setColor(e.target.value)}/>
                </div>
                <div>
                    <label>Year:</label>
                    <input type="text" onChange={(e)=>setYear(e.target.value)}/>
                </div>
                <input type="submit" value="Post Address"/>
            </form>
        </>
    )
}
export default SwimsuitPost;