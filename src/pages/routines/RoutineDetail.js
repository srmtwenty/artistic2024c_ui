import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function RoutineDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [genre, setGenre]=useState(0);
    const [type, setType]=useState(0);
    const [rank, setRank]=useState(0);
    const [date, setDate]=useState(new Date());
    const [musics, setMusics]=useState([])
    const [swimmers, setSwimmers]=useState([])
    const [coaches, setCoaches]=useState([])
    const [competition, setCompetition]=useState(1)
    const [nationalTeam, setNationalTeam]=useState(1)

    const [allMusics, setAllMusics]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allCompetitions, setAllCompetitions]=useState([])
    const [allNationalTeams, setAllNationalTeams]=useState([])
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const {id}=useParams();
    const loadRoutine=()=>{
        axios.get(`http://localhost:8080/routines/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setGenre(res.data.genre)
                setType(res.data.type)
                setRank(res.data.rank)
                setDate(res.data.date)
                setMusics(res.data.musics)
                setSwimmers(res.data.swimmers)
                setCoaches(res.data.coaches)
                setCompetition(res.data.competition)
                setNationalTeam(res.data.nationalTeam)
            })
            .catch(err=>console.log(err))
    }
    const loadAllMusics=()=>{
        axios.get("http://localhost:8080/musics", {headers:authHeader()})
            .then(res=>
                setAllMusics(res.data)
            )
            .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people", {headers:authHeader()})
            .then(res=>
                setAllPeople(res.data)
            )
            .catch(err=>console.log(err))
    }
    const loadAllCompetitions=()=>{
        axios.get("http://localhost:8080/competitions", {headers:authHeader()})
            .then(res=>{
                setAllCompetitions(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNationalTeams=()=>{
        axios.get("http://localhost:8080/nationalTeams", {headers:authHeader()})
            .then(res=>{
                setAllNationalTeams(res.data)
            })
            .catch(err=>console.log(err));
    }
    useEffect(()=>{
        loadRoutine();
        loadAllMusics();
        loadAllPeople();
        loadAllCompetitions();
        loadAllNationalTeams();
    }, [])

    const addMusic=(musicId)=>{
        axios.put(`http://localhost:8080/routines/${id}/addMusic/${musicId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const removeMusic=(musicId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeMusic/${musicId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const addSwimmer=(swimmerId)=>{
        axios.put(`http://localhost:8080/routines/${id}/addSwimmer/${swimmerId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const removeSwimmer=(swimmerId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeSwimmer/${swimmerId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const addCoach=(coachId)=>{
        axios.put(`http://localhost:8080/routines/${id}/addCoach/${coachId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const removeCoach=(coachId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeCoach/${coachId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const assignCompetition=(competitionId)=>{
        axios.put(`http://localhost:8080/routines/${id}/assignCompetition/${competitionId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeCompetition=(competitionId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeCompetition/${competitionId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignNationalTeam=(nationalTeamId)=>{
        axios.put(`http://localhost:8080/routines/${id}/assignNationalTeam/${nationalTeamId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeNationalTeam=(nationalTeamId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeNationalTeam/${nationalTeamId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2><strong>{name}</strong></h2>
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
                            <span className="label">Competition: </span>
                            {
                                competition?
                                <span className="value"><Link to={`/competitions/${competition.id}`}>{competition.name}</Link>
                                {
                                    user.roles.includes("ROLE_ADMIN")?
                                    <button className="marginLeft" onClick={()=>removeCompetition(competition.id)}>Remove Competition</button>:
                                    <></>
                                }
                                </span>
                                :<>null</>
                            }
                        </div>
                        <div className="row2">
                            <span className="label">Genre: </span>
                            <span className="value">{genre}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Type: </span>
                            <span className="value">{type}</span>
                        </div>
                        <div className="row2">
                            <span className="label">NationalTeam:</span>
                            <span className="value">
                            {   
                                nationalTeam?
                                <><Link to={`/nationalTeams/${nationalTeam.id}`}>{nationalTeam.name}</Link>
                                    {
                                        user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeNationalTeam(nationalTeam.id)}>Remove National Team</button>
                                        :<></>
                                    }
                                    
                                </>:
                                <>Null</>
                      
                            }</span>
                        </div>
                        <div className="row2">
                            <span className="label">Rank: </span>
                            <span className="value">{rank}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Date: </span>
                            <span className="value">{date.toLocaleString().split(',')[0]}</span>
                        </div>
                        
                        <div className="row2">
                            <span className="label2">Musics:</span>
                            <ul className="ultest2">
                            {   
                                musics?
                                musics.map((music, i)=>(
                                    <li key={i}><Link to={`/musics/${music.id}`}>{music.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeMusic(music.id)}>Remove Music</button>
                                            :<></>
                                        }
                                    </li> 
                                )):
                                <>null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <span className="label2">Swimmers:</span>
                            <ul className="ultest2">
                            {   
                                swimmers?
                                swimmers.map((swimmer, i)=>(
                                    <li key={i}><Link to={`/people/${swimmer.id}`}>{swimmer.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeSwimmer(swimmer.id)}>Remove Swimmer</button>
                                            :<></>
                                        }
                                        
                                    
                                    </li>
                                )):
                                <>null</>
                            }</ul>
                        </div>
                        <div className="row2">
                            <span className="label2">Coaches:</span>
                            <ul className="ultest2">
                            {   
                                coaches?
                                coaches.map((coach, i)=>(
                                    <li key={i}><Link to={`/people/${coach.id}`}>{coach.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeCoach(coach.id)}>Remove Coach</button>
                                            :<></>
                                        }
                                    </li>
                                )):
                                <>null</>
                            }</ul>
                        </div>
                        
                        <div className="row2">
                            <p>{description}</p> 
                        </div>  
                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/routines/create">Post</Link>  
                            </div>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/routines">Back to List</Link> 
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/routines/${id}/update`}>Update</Link>  
                                </div>
                                
                            </div>
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/routines">Back to List</Link> 
                                </div>
                            </>
                        }
                        
                    </div>    
                </div>
                

                {
                    user.roles.includes("ROLE_ADMIN")?
                    <>
                    <div className="profile_grid1">
                        <h2>All Musics</h2>
                        <div className="labelsPost">
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
                                        allMusics.map((m, i)=>(
                                        <tr key={i}>
                                            <td>{m.id}</td>
                                            <td><Link to={`/musics/${m.id}`}>{m.name}</Link></td>
                                            <td>
                                                <button onClick={()=>addMusic(m.id)}>Add Music</button>
                                                
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                            </div>
                        </div>     
                </div>
             
                <div className="profile_grid1">
                    <h2>All People</h2>
                        <div className="labelsPost">
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
                                        allPeople.map((p, i)=>(
                                        <tr key={i}>
                                            <td>{p.id}</td>
                                            <td><Link to={`/people/${p.id}`}>{p.name}</Link></td>
                                            <td>
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <button onClick={()=>addSwimmer(p.id)}>Add Swimmer</button>
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>addCoach(p.id)}>Add Coach</button>
                                                </div>
                                                
                                            </div>  
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
                <div className="profile_grid1">
                <h2>All Competitions</h2>
                <div className="labelsPost">
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
                                allCompetitions.map((com, i)=>(
                                <tr key={i}>
                                    <td>{com.id}</td>
                                    <td><Link to={`/competitions/${com.id}`}>{com.name}</Link></td>
                                    <td>
                                        <button onClick={()=>assignCompetition(com.id)}>Assign Competition</button>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
                <div className="profile_grid1">
                    <h2>All National Teams</h2>
                        <div className="labelsPost">
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
                                        allNationalTeams.map((ant, i)=>(
                                        <tr key={i}>
                                            <td>{ant.id}</td>
                                            <td>{ant.name}</td>
                                            <td>
                                                <button onClick={()=>assignNationalTeam(ant.id)}>Add National Team</button>   
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    
                    </>
                    :<></>
                }
                
                </> 
                :<h2>No Records</h2>
                }
            </div> 
        </>
    )
}
export default RoutineDetail;