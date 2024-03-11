import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';

function OccupationPost(){
    const [name, setName]=useState("");
    const navigate=useNavigate();

    const handlePost=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/occupations/create",{
            name:name
        }, {headers:authHeader()})
            .then(res=>
                    navigate("/occupations")
                )
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Create Occupation</h2>
                    <div className="labelsPost">
                        <form onSubmit={handlePost} className="form">
                            <div className="row2">
                                <label className="labelPost">Name:</label>
                                <input type="text" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Post Role"/>
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
export default OccupationPost;