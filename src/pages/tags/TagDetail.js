import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function TagDetail(){
    const [name, setName]=useState("")
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])
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

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/tags/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/tags/${id}`)
            })
            .catch(err=>console.log(err))
    }
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



                        <div className="row2">
                            <span className="label2">People:</span>  
                        </div>
                        <div className="rowTable">
                            {
                            people.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        people.map((p, i)=>(
                                        <tr key={i}>
                                            <td>
                                                {p.name}
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>People List is Empty</p>
                            } 
                            </div>

                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
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
            
           <div className="profile_grid1">
                    <h2>All People</h2>
                        <div className="labels">
                            <div className="rowTable">
                            {
                            allPeople.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                    
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPeople.map((ap, i)=>(
                                        <tr key={i}>
                                            <td>{ap.id}</td>
                                            <td><Link to={`/people/${ap.id}`}>{ap.name}</Link></td>
                                            
                                            <td>
                                                <button onClick={()=>addPerson(ap.id)}>Add Address</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>All People List is Empty</p>
                            } 
                            </div>
                        </div>
                    </div>  
        </>
    )
}
export default TagDetail;