import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function NationalTeamUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    //const [nationalTeam, setNationalTeam]=useState(1)
    //const [nation, setNation]=useState(1)
    const {id}=useParams();
    const navigate=useNavigate();
    const loadNationalTeam=()=>{
        axios.get(`http://localhost:8080/nationalTeams/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                //setNation(res.data.nation)
                //setMembers(res.data.members)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNationalTeam();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/nationalTeams/${id}/update`, {
            name:name,
            description:description
            //nation:nation
            //nationalTeam:nationalTeam
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/nationalTeams/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update National Team</h2>
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
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update National Team"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/nationalTeams/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/nationalTeams">Back to List</Link>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default NationalTeamUpdate;
