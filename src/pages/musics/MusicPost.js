import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function MusicPost(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    //const [soundtrackId, setSoundtrackId]=useState(1);

    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/musics/create",{
            name:name,
            description:description
        }, {headers:authHeader()})
            .then(res=>{
                navigate("/musics")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Music</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="40" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Music"/>
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
export default MusicPost;