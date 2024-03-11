import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';

function OccupationUpdate(){
    const [name, setName]=useState("");
    const navigate=useNavigate();
    const {id}=useParams();

    const loadOccupation=()=>{
        axios.get(`http://localhost:8080/occupations/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadOccupation();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/occupations/${id}/update`,{
            name:name
        }, {headers:authHeader()})
            .then(res=>
                    navigate(`/occupations/${id}`)
                )
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Occupation</h2>
                    <div className="labelsPost">
                        <form onSubmit={handleUpdate}>
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                            </div>
                            
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Occupation"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/occupations/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/occupations">Back to List</Link>  
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default OccupationUpdate;