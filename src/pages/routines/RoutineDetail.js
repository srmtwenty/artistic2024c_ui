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
    const [competition, setCompetition]=useState(0)
    const [nationalTeam, setNationalTeam]=useState(0)
    const [url, setUrl]=useState("")
    const [addresses, setAddresses]=useState([])
    const [choreo, setChoreo]=useState(0)
    const [swimsuitDetail, setSwimsuitDetail]=useState(0);
    

    const [allChoreos, setAllChoreos]=useState([])
    const [allAddresses, setAllAddresses]=useState([])
    const [allSwimsuits, setAllSwimsuits]=useState([])
    const [allMusics, setAllMusics]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allCompetitions, setAllCompetitions]=useState([])
    const [allNationalTeams, setAllNationalTeams]=useState([])
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();

    const [postPerPage, setPostPerPage]=useState(20)
    const [currentPage, setCurrentPage]=useState(1)
    const [currentPageUpdated, setCurrentPageUpdated]=useState(false);
    
    const [startNum, setStartNum]=useState(1)
    const [endNum, setEndNum]=useState(postPerPage);
    const [numberOfPage, setNumberOfPage]=useState(Math.ceil(allSwimsuits.length/postPerPage))


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
                setChoreo(res.data.choreographic)
                setSwimsuitDetail(res.data.swimsuitDetail)
                setUrl(res.data.url)
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
        axios.get("http://localhost:8080/people/orderByNameAsc", {headers:authHeader()})
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
    const loadAllChoreos=()=>{
        axios.get("http://localhost:8080/choreos", {headers:authHeader()})
            .then(res=>{
                setAllChoreos(res.data)
            })
            .catch(err=>console.log(err));
    }
    const loadAllAddresses=()=>{
        axios.get("http://localhost:8080/addresses", {headers:authHeader()})
            .then(res=>{
                setAllAddresses(res.data)
            })
            .catch(err=>console.log(err));
    }

    
    const loadAllSwimsuits=()=>{
        axios.get("http://localhost:8080/swimsuitDetails", {headers:authHeader()})
            .then(res=>{
                setAllSwimsuits(res.data)
            })
            .catch(err=>console.log(err));
    }
    const loadAddresses=()=>{
        axios.get(`http://localhost:8080/routines/${id}/getAddresses`, {headers:authHeader()})
            .then(res=>{
                setAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadRoutine();
        loadAllMusics();
        loadAllPeople();
        loadAllCompetitions();
        loadAllNationalTeams();
        loadAllChoreos();
        loadAllSwimsuits();
        loadAllAddresses();
        loadAddresses();
   
    }, [allSwimsuits.length, numberOfPage, startNum, endNum, currentPage])

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

    const assignChoreo=(choreoId)=>{
        axios.put(`http://localhost:8080/routines/${id}/setChoreo/${choreoId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeChoreo=(choreoId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeChoreo/${choreoId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const addSwimsuit=(swimsuitDetailId)=>{
        axios.put(`http://localhost:8080/routines/${id}/setSwimsuitDetail/${swimsuitDetailId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSwimsuit=(swimsuitDetailId)=>{
        axios.put(`http://localhost:8080/routines/${id}/removeSwimsuitDetail/${swimsuitDetailId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/routines/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const prevPageSwimsuit=()=>{
            setCurrentPage(currentPage-1);
            setStartNum(startNum-(postPerPage))
            setEndNum(endNum-(postPerPage))
    }
    const nextPageSwimsuit=()=>{
            setCurrentPage(currentPage+1);
            setStartNum(startNum+(postPerPage))
            setEndNum(endNum+(postPerPage))
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2><strong>{name}(id: {id})</strong></h2>
                    <div className="labels">
                        
                        <div className="row2">
                            <span className="label">Url: </span>
                            <span className="value">{url}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Comp: </span>
                            {
                                competition?
                                <span className="value"><Link to={`/competitions/${competition.id}`}>{competition.name}</Link>
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <button className="marginLeft" onClick={()=>removeCompetition(competition.id)}>x</button>:
                                    <></>
                                }
                                </span>
                                :<>null</>
                            }
                        </div>
                        <div className="row2">
                            <span className="label">Routine: </span>
                            <span className="value">{genre} {type}</span>
                        </div>
                        <div className="row2">
                            <span className="label">N. Team:</span>
                            <span className="value">
                            {   
                                nationalTeam?
                                <><Link to={`/nationalTeams/${nationalTeam.id}`}>{nationalTeam.name}</Link>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeNationalTeam(nationalTeam.id)}>x</button>
                                        :<></>
                                    }
                                    
                                </>:
                                <>Null</>
                      
                            }</span>
                        </div>
                        <div className="row2">
                            <span className="label">Choreo.:</span>
                            <span className="value">
                            {   
                                choreo?
                                <><Link to={`/choreos/${choreo.id}`}>{choreo.name}</Link>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeChoreo(choreo.id)}>x</button>
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
                            <span className="label2">Music List:</span>
                            <ul className="ultest2">
                            {   
                                musics?
                                musics.map((music, i)=>(
                                    <li key={i}><Link to={`/musics/${music.id}`}>{music.name}</Link>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeMusic(music.id)}>x</button>
                                            :<></>
                                        }
                                    </li> 
                                )):
                                <>null</>
                            }
                            </ul>
                        </div>


                        
                        <div className="row2">
                            <span className="label2">Athletes:</span>
                            <ul className="ultest2">
                            {   
                                swimmers?
                                swimmers.map((swimmer, i)=>(
                                    <li key={i}><Link to={`/people/${swimmer.id}`}>{swimmer.name}</Link>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeSwimmer(swimmer.id)}>x</button>
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
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeCoach(coach.id)}>x</button>
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


                        <div className="row2">
                            <span className="label">Swimsuit:</span>
                            <span className="value">
                            {   
                                swimsuitDetail?
                                <>
                                    <div className="rowTable">
                                        <Link to={`/swimsuitDetails/${swimsuitDetail.id}`}>
                                            <img src={`http://localhost:8080/files/${swimsuitDetail.swimsuitProfilePic.url}`}/>
                                            <div>
                                                {swimsuitDetail.name}
                                            </div>
                                        </Link>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeSwimsuit(swimsuitDetail.id)}>x</button>
                                            :<></>
                                        }
                                    </div>
                                </>:
                                <>Null</>
                      
                            }</span>
                        </div>


                    <div className="row2">
                        <span className="label2">Addresses:</span>
                    </div> 
                    
                    <div className="row">   
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                        {   
                            addresses?
                            addresses.map((a, i)=>(
                                <div key={i} style={{display:"block", padding:"2px", border:"1px solid"}}>
                                    <Link to={`/addresses/${a.id}`}>
                                        <img src={`http://localhost:8080/files/${a.url}`} style={{height:"150px"}}/>
                                    </Link>
                                </div>
                            )):
                            <>null</>
                        }</div>
                    </div>
                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/routines/create">Post</Link>  
                            </div>
                            <div style={{display:"flex"}}>
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
                    user && user.roles.includes("ROLE_ADMIN")?
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
                                                    <button onClick={()=>addSwimmer(p.id)}>Add Athlete</button>
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
                    
                    <div className="profile_grid1">
                    <h2>All Choreographic</h2>
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
                                        allChoreos.map((ac, i)=>(
                                        <tr key={i}>
                                            <td>{ac.id}</td>
                                            <td>{ac.name}</td>
                                            <td>
                                                <button onClick={()=>assignChoreo(ac.id)}>Add Choreo</button>   
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
                        <div className="row2">
                            <span className="label">All Swimsuits:</span>  
                        </div>
                        <div className="rowTable">
                        <div>Page:{currentPage} of {numberOfPage}</div>
                        <div>Range:{startNum} - {endNum}</div>
                        
                        {
                            currentPage!=1?
                            <button onClick={()=>prevPageSwimsuit()}>prev</button>
                            :<button disabled>prev</button>
                        }
                        {
                            currentPage!=numberOfPage?
                            <button onClick={()=>nextPageSwimsuit()}>next</button>
                            :<button disabled>next</button>
                        }


                        {   
                            allSwimsuits.length!=0?
                            
                            <div style={{display:"flex", flexWrap:"wrap", margin:"auto"}}>
                                {
                                    allSwimsuits.slice(startNum-1, endNum).map((as, i)=>(           
                                        <div key={i} className="photoFrame1">
                                            <Link to={`/swimsuitDetails/${as.id}`}>
                                                {
                                                    as.swimsuitProfilePic?
                                                    <img src={`http://localhost:8080/files/${as.swimsuitProfilePic.url}`} style={{height:"110px", padding: "5px"}}/>
                                                    :<>none</>
                                                }
                                            </Link>
                                            <div style={{backgroundColor:"white"}}>
                                                <div>{as.name}</div>
                                                <button onClick={()=>addSwimsuit(as.id)}>Add Swimsuit</button>
                                            </div>
                                        </div>
                                    ))
                                }  
                            </div>
                            :<>Null</>
                        }
                    
                        <div>Page:{currentPage} of {numberOfPage}</div>
                        <div>Range:{startNum} - {endNum}</div>
                        
                        {
                            currentPage!=1?
                            <button onClick={()=>prevPageSwimsuit()}>prev</button>
                            :<button disabled>prev</button>
                        }
                        {
                            currentPage!=numberOfPage?
                            <button onClick={()=>nextPageSwimsuit()}>next</button>
                            :<button disabled>next</button>
                        }
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