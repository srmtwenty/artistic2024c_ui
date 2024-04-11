import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function SwimsuitDetailUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")

    const {id}=useParams();
    const navigate=useNavigate();
    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/update`, {
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
    const loadSwimsuitDetail=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setColor(res.data.color)
                setYear(res.data.year)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuitDetail();
    },[])
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Swimsuit Detail</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Color:</label>
                                <input type="text" onChange={(e)=>setColor(e.target.value)} value={color}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Year:</label>
                                <input type="text" onChange={(e)=>setYear(e.target.value)} value={year}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update SwimsuitDetail"/>
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
export default SwimsuitDetailUpdate;