import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';
import authHeader from '../../services/auth-header';

function PersonPost(){
    const [name, setName]=useState("")
    const [engName, setEngName]=useState("")
    const [description, setDescription]=useState("")
    const [profilePicAlt, setProfilePicAlt]=useState("")
    const [gender, setGender]=useState(0)
    const [birthYear, setBirthYear]=useState(0)
    const [nationalityId, setNationalityId]=useState(1)
    const [allNations, setAllNations]=useState([])
    const navigate=useNavigate();
    const handlePost=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/people/create", {
            name:name,
            engName:engName,
            birthYear:birthYear,
            description:description,
            profilePicAlt:profilePicAlt,
            gender:gender,
            //nationality:{
            //    id:nationalityId
            //}
        }, {headers:authHeader()})
            .then(res=>{
                navigate(`/people/${res.data.id}`)
            })
            .catch(err=>console.log(err))
    }

    const loadNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadNations();
    },[])

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Post Person</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Eng Name:</label>
                                <input type="text" onChange={(e)=>setEngName(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Birth Year:</label>
                                <input type="number" onChange={(e)=>setBirthYear(e.target.value)}/>
                            </div>
                            <div className="rowTextArea">
                                <label className="labelPost">Description:</label>
                                <textarea rows="3" cols="34" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Profile Pic Alt:</label>
                                <input type="text" onChange={(e)=>setProfilePicAlt(e.target.value)}/>
                            </div>
                            <div className="row2">
                                <label className="labelPost">Gender:</label>
                                <select id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>
                            
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Person"/>
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
export default PersonPost;