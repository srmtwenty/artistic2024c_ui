import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ChoreoDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [skills, setSkills]=useState("")
    const [nation, setNation]=useState(0);
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allNations, setAllNations]=useState([])
    const [routines, setRoutines]=useState([])

    const [profileAddress, setProfileAddress]=useState(0);
    const [allAddresses, setAllAddresses]=useState([])

    const navigate=useNavigate();
    const {id}=useParams();
    const user=AuthService.getCurrentUser();

    const loadChoreo=()=>{
        axios.get(`http://localhost:8080/choreos/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setSkills(res.data.skills)
                setNation(res.data.nation)
                setProfileAddress(res.data.profileAddress)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadPeople=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/people`, {headers:authHeader()})
        .then(res=>{
            setPeople(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people", {headers:authHeader()})
            .then(res=>{
                setAllPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadRoutines=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/routines`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllAddresses=()=>{
        axios.get("http://localhost:8080/addresses", {headers:authHeader()})
            .then(res=>{
                setAllAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadChoreo();
        loadPeople();
        loadAllPeople();
        loadAllNations();
        loadRoutines();
        loadAllAddresses();
    },[])

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removePerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/setNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Nation has been assigned!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const addAddress=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addAddress/${addressId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Address has been added!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeAddress=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeAddress/${addressId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Address has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignAddressProfile=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addAddressProfilePic/${addressId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Address profile has been assigned!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeAddressProfile=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeAddressProfilePic/${addressId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Address profile has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="profile_wrap2">
                <h2>{name} (Id: {id})</h2>
                <div className="row2">
                    <span className="value">
                        {
                            profileAddress!=null?
                            <><img src={`http://localhost:8080/files/${profileAddress.url}`} style={{width:"300px"}}/>
                                {
                                    user.roles.includes("ROLE_ADMIN")?
                                    <button className="marginLeft" onClick={()=>removeAddressProfile(profileAddress.id)}>x</button>
                                    :<></>
                                }
                            </>:
                            <>Null</>
                        }
                    </span>
                </div>

                
                <div className="row2">
                    <span className="label">Nation: </span>

                    {
                        nation?
                        <span className="value">    
                            {nation.name}
                        </span>:
                        <></>
                    }
                    
                </div>
                <div className="row2">
                    <span className="label">Description: </span>
                    <span className="value">{description}</span>
                </div>
                <div className="row2">
                    <span className="label">Skills: </span>
                    <span className="value">{skills}</span>
                </div>
                
                <div className="row2">
                            <span className="label2">Routines:(reference only)</span>
                            <ul className="ultest2">
                            {   
                                routines.length!=0?
                                routines.map((rou, i)=>(
                                    <li key={i}>
                                        <Link to={`/routines/${rou.id}`}>
                                            {rou.name}
                                        </Link>
                                    </li>
                                )):
                                <>Null</>
                            }
                        </ul>
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
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Action</th>
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
                                            <td>
                                                {
                                                    user.roles.includes("ROLE_ADMIN")?
                                                    <button className="marginLeft" onClick={()=>removePerson(p.id)}>x</button>
                                                    :<></>}
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>People List is Empty</p>
                            } 
                </div> 
                <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                                <div className="postDetail">
                                    <Link className="link" to="/choreos/create">Post Choreo</Link>
                                </div>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/choreos">Back to List</Link>  
                                    </div>
                                    <div className="backToDetail">
                                        <Link className="link" to={`/choreos/${id}/update`}>Update</Link>
                                    </div>
                                    
                                </div>
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/choreos">Back to List</Link>  
                                </div>
                            </>
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
                
                
                    <div className="profile_grid1">
                    <h2>All Addresses</h2>
                        <div className="labels">
                            <div className="rowTable">
                            {
                            allAddresses.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Content</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allAddresses.map((aa, i)=>(
                                        <tr key={i}>
                                            <td>{aa.id}</td>
                                            <td><Link to={`/people/${aa.id}`}>{aa.name}</Link></td>
                                            <td><img src={`http://localhost:8080/files/${aa.url}`} style={{width:"300px"}}/></td>
                                            <td>
                                                <button onClick={()=>addPerson(aa.id)}>Add Address</button>
                                                <button onClick={()=>assignAddressProfile(aa.id)}>Add Address Profile</button>
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


                <div className="profile_grid1">
                    <h2>All Nations</h2>
                        <div className="labels">
                            <div className="rowTable">
                            {
                            allNations.length!=0?
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
                                        allNations.map((an, i)=>(
                                        <tr key={i}>
                                            <td>{an.id}</td>
                                            <td><Link to={`/nations/${an.id}`}>{an.name}</Link></td>
                                        
                                            <td>
                                                <button onClick={()=>assignNation(an.id)}>Assign Nation</button>
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
            </div>  
        </>
    )
}
export default ChoreoDetail;