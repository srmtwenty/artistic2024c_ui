import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function RoutinePost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [genre, setGenre]=useState(0);
    const [type, setType]=useState(0);
    const [rank, setRank]=useState(0);
    const [date, setDate]=useState(new Date());

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/routines/create", {
            name:name,
            description:description,
            genre:genre,
            type:type,
            rank:rank,
            date:date
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/routines")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Routine</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="38" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Genre:</label>
                                <select id="genre" name="genre" onChange={(e)=>setGenre(e.target.value)}>
                                    <option value={0}>Solo</option>
                                    <option value={1}>Solo Tech</option>
                                    <option value={2}>Solo Free</option>
                                    <option value={3}>Duet</option>
                                    <option value={4}>Duet Tech</option>
                                    <option value={5}>Duet Free</option>
                                    <option value={6}>Team</option>
                                    <option value={7}>Team Tech</option>
                                    <option value={8}>Team Free</option>
                                    <option value={9}>Combination</option>
                                    <option value={10}>Acrobat</option>
                                    <option value={11}>Male Solo Tech</option>
                                    <option value={12}>Male Solo Free</option>
                                    <option value={13}>Duet Mixed Tech</option>
                                    <option value={14}>Duet Mixed Free</option>
                                </select>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Type:</label>
                                <select id="type" name="type" onChange={(e)=>setType(e.target.value)}>
                                    <option value={0}>Preliminaries</option>
                                    <option value={1}>Finals</option>
                                    <option value={2}>Exhibition</option>
                                </select>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Rank:</label>
                                <input type="number" onChange={(e)=>setRank(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Routine"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="createLink">
                        <Link className="link" to="/routines">Back to List</Link> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoutinePost;