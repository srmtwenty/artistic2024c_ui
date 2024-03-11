import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function TagUpdate(){
    const [name, setName]=useState("")
    const {id}=useParams();
    const navigate=useNavigate();
    const loadTag=()=>{
        axios.get(`http://localhost:8080/tags/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)

            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadTag();
    },[])
    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/tags/${id}/update`, {
            
            name:name,
            
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/tags/${id}`)
            })
            .catch(err=>console.log(err))
    }


    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Tag</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Tag"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/tags/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/tags">Back to List</Link>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default TagUpdate