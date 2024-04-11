import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function SwimsuitUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")

    const navigate=useNavigate();
    const {id}=useParams();
    const updateSwimsuit=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/swimsuits/${id}/update`, {
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

    const loadSwimsuit=()=>{
        axios.get(`http://localhost:8080/swimsuits/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setColor(res.data.color)
                setYear(res.data.year)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuit();
    },[])
    return(
        <>
            <form onSubmit={updateSwimsuit}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <div>
                    <label>Color:</label>
                    <input type="text" onChange={(e)=>setColor(e.target.value)} value={color}/>
                </div>
                <div>
                    <label>Year:</label>
                    <input type="text" onChange={(e)=>setYear(e.target.value)} value={year}/>
                </div>
                <input type="submit" value="Update Address"/>
            </form>
        </>
    )
}
export default SwimsuitUpdate;