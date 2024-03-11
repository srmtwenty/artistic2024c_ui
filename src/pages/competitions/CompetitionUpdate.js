import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function CompetitionUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [location, setLocation]=useState("")
    const [date, setDate]=useState(new Date());
    const {id}=useParams();
    const navigate=useNavigate();
    const loadCompetition=()=>{
        axios.get(`http://localhost:8080/competitions/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setLocation(res.data.location)
                setDate(res.data.date)
                //setNation(res.data.nation)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadCompetition();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/competitions/${id}/update`, {
            name:name,
            description:description,
            location:location,
            date:date
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/competitions/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
        <div className="profile_wrap2">
        <div className="profile_grid1">
            <h2>Update Competition</h2>
            <div className="labelsPost">
                <form onSubmit={handleUpdate}>
                    <div className="row2">
                        <label className="labelPost">Name:</label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>
                    <div className="rowTextArea">
                        <label className="labelPost">Description:</label>
                        <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                    </div>
                    <div className="row2">
                        <label className="labelPost">Location:</label>
                        <input type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                    </div>
                    <div className="row2">
                        <label className="labelPost">Date:</label>
                        <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>
                    </div>
                    <div className="updateButtonsWrap">
                        <div className="updateButtonSubmit">
                            <input type="submit" value="Update Competition"/>
                        </div>
                        <div className="updateButtonCancel">
                            <Link className="link" to={`/competitions/${id}`}>Cancel</Link> 
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
export default CompetitionUpdate;