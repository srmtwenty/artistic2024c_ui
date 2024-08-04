import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function RoutineUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [genre, setGenre]=useState(0);
    const [type, setType]=useState(0);
    const [rank, setRank]=useState(0);
    const [date, setDate]=useState(new Date());

    const {id}=useParams();
    const navigate=useNavigate();
    const loadRoutine=()=>{
        axios.get(`http://localhost:8080/routines/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setGenre(res.data.genre)
                setType(res.data.type)
                setRank(res.data.rank)
                setDate(res.data.date)
                //setMusics(res.data.musics)
                //setSwimmers(res.data.swimmers)
                //setCoaches(res.data.coaches)
                //setCompetition(res.data.competition)
                //setNationalTeam(res.data.nationalTeam)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadRoutine();
    },[])
    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/routines/${id}/update`, {
            name:name,
            description:description,
            genre:genre,
            type:type,
            rank:rank,
            date:date
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Routine</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Description:</label>
                                <textarea rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Genre:</label>
                                <select id="genre" name="genre" onChange={(e)=>setGenre(e.target.value)} value={genre}>
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
                                <select id="type" name="type" onChange={(e)=>setType(e.target.value)} value={type}>
                                    <option value={0}>Preliminaries</option>
                                    <option value={1}>Finals</option>
                                    <option value={2}>Exhibition</option>
                                </select>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Rank:</label>
                                <input type="number" onChange={(e)=>setRank(e.target.value)} value={rank}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Date:</label>
                                <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Routine"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/routines/${id}`}>Cancel</Link> 
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
export default RoutineUpdate;