import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';

function SwimsuitDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")
    
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])

    const navigate=useNavigate();
    const {id}=useParams();

    const loadSwimsuit=()=>{
        axios.get(`http://localhost:8080/swimsuits/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setColor(res.data.color)
                setYear(res.data.year)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadPeople=()=>{
        axios.get(`http://localhost:8080/swimsuits/${id}/people`, {headers:authHeader()})
        .then(res=>{
            setPeople(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people")
            .then(res=>{
                setAllPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadSwimsuit();
        loadPeople();
        loadAllPeople();
    },[])

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/swimsuits/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/swimsuits/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Swimsuit Detail(Id: {id})</h2>
            <img src={`http://localhost:8080/files/${name}`} style={{width:"300px"}}/>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Color: {color}</p>
            <p>Year: {year}</p>
            <img src={`http://localhost:8080/files/${name}`} style={{width:"500px"}}/>

            <div className="row2">
                <span className="label2">People:</span>  
            </div>
            <div className="rowTable">
                            {
                            people.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        people.map((p, i)=>(
                                        <tr key={i}>
                                            <td>
                                                <Link to={`/people/${p.id}`}>
                                                    {p.id}
                                                </Link></td>
                                            <td>{p.name}</td>
                                            
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>People List is Empty</p>
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
                                                <button onClick={()=>addPerson(ap.id)}>Add Person</button>
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
export default SwimsuitDetail;