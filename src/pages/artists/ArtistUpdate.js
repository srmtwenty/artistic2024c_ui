import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

const ArtistUpdate=()=>{
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const {id}=useParams();
    const navigate=useNavigate();

    const loadArtist=()=>{
        axios.get(`http://localhost:8080/artists/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadArtist();
    },[])
    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/artists/${id}/update`, {
            name:name,
            description:description
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/artists/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Artist</h2>
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
                                    <input type="submit" value="Update Artist"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/artists/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/artists">Back to List</Link>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default ArtistUpdate;