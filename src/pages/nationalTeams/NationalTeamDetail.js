import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function NationalTeamDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [nation, setNation]=useState(1)
    const [members, setMembers]=useState([])
    const [routines, setRoutines]=useState([])
    

    const user=AuthService.getCurrentUser();
    const [allNations, setAllNations]=useState([])
    const [allPeople, setAllPeople]=useState([])

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const {id}=useParams();
    const navigate=useNavigate();
    const loadNationalTeam=()=>{
        axios.get(`http://localhost:8080/nationalTeams/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setNation(res.data.nation)
                setMembers(res.data.members)
                
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
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
    const loadRoutines=()=>{
        axios.get(`http://localhost:8080/nationalTeams/${id}/routines`, {headers:authHeader()})
            .then(res=>{
                setRoutines(res.data)
                console.log(routines)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNationalTeam()
        loadAllNations()
        loadAllPeople()
        loadRoutines()
    }, [])

    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/assignNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const removeNation=(nationId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/removeNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/addPerson/${personId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/nationalTeams/${id}/removePerson/${personId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/nationalTeams/${id}`)
            })
    }

    return(
        <>
            <div className="profile_wrap2">
            {
                loadComplete!=true?
                <><h2>Now Loading</h2>
                </>
                :<>    
                {
                    noData!=true?
                    <>
                        <div className="profile_grid1">
                            <h2><strong>{name} (id:{id})</strong></h2>
                            <div className="labels">
                                
                                <div className="row2">
                                    <span className="label">Nation: </span>
                                    <span className="value">
                                    {
                                        nation?
                                        <><Link to={`/nations/${nation.id}`}>{nation.name}</Link>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeNation(nation.id)}>x</button>
                                            :<></>
                                        }
                                        
                                        </>:
                                        <>null</>
                                    }</span>
                                </div>
                                <div className="row2">
                                    <p>{description}</p> 
                                </div>  
                            </div>
                            <div className="buttonsWrapDetail">
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <>
                                    <div className="postDetail">
                                        <Link className="link" to="/nationalTeams/create">Post</Link> 
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className="backToDetail">
                                            <Link className="link" to="/nationalTeams">Back to List</Link>
                                        </div>
                                        <div className="backToDetail">
                                            <Link className="link" to={`/nationalTeams/${id}/update`}>Update</Link>
                                        </div>
                                        
                                    </div>
                                    </>:
                                    <>
                                        <div>
                                            <div className="backToDetail">
                                                <Link className="link" to="/nationalTeams">Back to List</Link>
                                            </div>
                                        </div>
                                    </>
                                }
                                
                            </div>
                            
                            
                        </div>
                        <div className="profile_grid1">
                            <h2>Members</h2>
                            <div className="rowTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Occupations</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        members.map((m, i)=>(
                                        <tr key={i}>
                                            <td>{m.id}</td>
                                            <td>{m.name}/{m.engName}</td>
                                            <td>
                                                <ul>
                                                {
                                                    m.occupations.map((r)=>(
                                                    <li style={{display:"inline-block", marginRight:"10px"}}><div className="roleBorder">{r.name}</div></li> 
                                                    ))
                                                }</ul>
                                            </td>
                                            <td><button onClick={()=>removePerson(m.id)}>x</button></td>
                                        </tr>    
                                        ))
                                    }
                                            
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="profile_grid1">
                            <h2>Results</h2>
                            <div className="rowTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Competition Names</th>
                                            <th>Ranking</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        routines?
                                        <>
                                        {
                                            routines.map((routine, i)=>(
                                            <tr key={i}>
                                                
                                                <td>
                                                    {
                                                        routine.competition?
                                                        <Link to={`/competitions/${routine.competition.id}`}>
                                                            {routine.competition.name} -  
                                                        </Link>
                                                        :<></>
                                                    }
                                                    <Link to={`/routines/${routine.id}`}>
                                                        {routine.name}
                                                    </Link>
                                                    
                                                </td>
                                                <td>{routine.rank}</td>
                                            </tr>    
                                            ))
                                        }
                                        </>
                                        :<></>
                                    }     
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="profile_grid1">
                            <h2>All People</h2>
                        
                                    <div className="rowTable">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Roles</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allPeople.map((p, i)=>(
                                                <tr key={i}>
                                                    <td>{p.id}</td>
                                                    <td>{p.name}/{p.engName}</td>
                                                    <td><ul>
                                                        {
                                                            p.occupations.map((oc, i)=>(
                                                            <li key={i}>{oc.name}</li> 
                                                            ))
                                                        }</ul>
                                                    </td>
                                                    <td><button onClick={()=>addPerson(p.id)}>Add Person</button></td>                                        
                                                </tr>    
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="profile_grid1">
                                <h2>All Nations</h2>
                                <div className="rowTable">
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
                                                allNations.map((n, i)=>(
                                                <tr key={i}>
                                                    <td>{n.id}</td>
                                                    <td><Link to={`/nations/${n.id}`}>{n.name}</Link></td>
                                                    <td><button onClick={()=>assignNation(n.id)}>Assign Nation</button></td>
                                                
                                                </tr>    
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
            
                        </>:
                        <></>
                    }
                    </> 
                    :<h2>No Records</h2>
                    }
                </>
                }
            </div>           
        </>
    )
}
export default NationalTeamDetail;