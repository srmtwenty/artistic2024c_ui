import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function TagDetail(){
    const [name, setName]=useState("")
    const [people, setPeople]=useState([])
    const user=AuthService.getCurrentUser();
    const {id}=useParams();
    const navigate=useNavigate();
    const loadTag=()=>{
        axios.get(`http://localhost:8080/tags/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)

            })
            .catch(err=>console.log(err))
    }
    const loadPeopleForTag=()=>{
        axios.get(`http://localhost:8080/tags/${id}/people`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadTag()
        loadPeopleForTag()
    }, [])

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Tag: <strong>{name}</strong></h2>
                    <div className="labels">
                        <div className="row2">
                            <span className="label">Id: </span>
                            <span className="value">{id}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Name: </span>
                            <span className="value">{name}</span>
                        </div>

                        <div className="row2">
                            <span className="label2">People(ref):</span>
                            <ul className="ultest2">
                            {   
                                people?
                                people.map((person, i)=>(
                                    <li key={i}>
                                        <Link to={`/people/${person.id}`}>{person.name}</Link>
                                    </li>
                                )):
                                <>null</>
                            }</ul>
                        </div>

                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/tags/create">Post</Link> 
                            </div>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/tags">Back to List</Link>  
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/tags/${id}/update`}>Update</Link> 
                                </div>
                                
                            </div>    
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/tags">Back to List</Link>  
                                </div>
                            </>
                        }
                        
                    </div>  
                </div>
                </> 
                :<h2>No Records</h2>
                }
           </div>
            
        </>
    )
}
export default TagDetail;