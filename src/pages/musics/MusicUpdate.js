import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function MusicUpdate(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [address, setAddress]=useState("");
    const {id}=useParams();

    const navigate=useNavigate();
    const loadMusic=()=>{
        axios.get(`http://localhost:8080/musics/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                //setAddress(res.data.address)
                //setComposers(res.data.composers)
                //setArtists(res.data.artists)
                //setSoundtrack(res.data.soundtrack)
            })
            .catch(
                err=>console.log(err)
            )
    }
    useEffect(()=>{
        loadMusic();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/musics/${id}/update`,{
            name:name,
            description:description,
           
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Music</h2>
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
                            
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Music"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/musics/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/musics">Back to List</Link>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default MusicUpdate;