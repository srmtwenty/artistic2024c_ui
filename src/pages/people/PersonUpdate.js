import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function PersonUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [gender, setGender]=useState(0)

    const {id}=useParams();
    const navigate=useNavigate();
    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setGender(res.data.gender)
                //setNationality(res.data.nationality)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPerson();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/update`, {
            name:name,
            description:description,
            gender:gender
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Update Person</h2>
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
                                <label className="labelPost">Gender:</label>
                                <select id="gender" name="gender" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Update Person"/>
                                </div>
                                <div className="updateButtonCancel">
                                    <Link className="link" to={`/people/${id}`}>Cancel</Link> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/people">Back to List</Link> 
                    </div>
                     
                </div>
            </div>
        </>
    )
}
export default PersonUpdate;