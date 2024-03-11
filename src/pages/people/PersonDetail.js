import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function PersonDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [gender, setGender]=useState(0)
    const [nationality, setNationality]=useState(1)
    const [allNationalities, setAllNationalities]=useState([])
    const [occupations, setOccupations]=useState([])
    const [allOccupations, setAllOccupations]=useState([])
    const [tags, setTags]=useState([])
    const [allTags, setAllTags]=useState([])
    const [snss, setSnss]=useState([])
    const [tName, setTName]=useState("")
    const [rName, setRName]=useState("")
    const [sName, setSName]=useState("")
    const [broadcasts, setBroadcasts]=useState([])
    const [routines, setRoutines]=useState([])
    const [competition, setCompetition]=useState([])
    const user=AuthService.getCurrentUser();
    const {id}=useParams();
    const navigate=useNavigate();
    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setGender(res.data.gender)
                setNationality(res.data.nationality)
            })
            .catch(err=>console.log(err))
    }
    const loadAllOccupations=()=>{
        axios.get("http://localhost:8080/occupations", {headers:authHeader()})
            .then(res=>{
                setAllOccupations(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadOccupationsForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/occupations`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setOccupations(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllTags=()=>{
        axios.get("http://localhost:8080/tags", {headers:authHeader()})
            .then(res=>{
                setAllTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadTagsForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/tags`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadSNSForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/snss`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setSnss(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNationalities(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadBroadcastsForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/broadcasts`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setBroadcasts(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadRoutinesForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/routines`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPerson()
        loadAllOccupations()
        loadOccupationsForPerson()
        loadAllTags()
        loadTagsForPerson()
        loadSNSForPerson()
        loadAllNations()
        loadBroadcastsForPerson()
        loadRoutinesForPerson()
    }, [])

    const addOccupation=(occupationId)=>{
        axios.put(`http://localhost:8080/people/${id}/addOccupation/${occupationId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Occupation has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeOccupation=(occupationId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeOccupation/${occupationId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Occupation has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag=(tagId)=>{
        axios.put(`http://localhost:8080/people/${id}/addTag/${tagId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("tag has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeTag=(tagId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeTag/${tagId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("tag has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/addTagAlt`,{
            name:tName
        }, {headers:authHeader()})
            .then(res=>{
                setTName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
            })
            .catch(err=>console.log(err))
              
    }
    
    const addSNS=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/people/${id}/addSNS`,{
            name:sName
        }, {headers:authHeader()})
            .then(res=>{
                setSName("")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSNS=(snsId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeSNS/${snsId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignNationality=(nationId)=>{
        axios.put(`http://localhost:8080/people/${id}/assignNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeNationality=(nationId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeNation/${nationId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2><strong>{name}</strong> Profile</h2>
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
                            <span className="label">Gender: </span>
                            <span className="value">{gender}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Nationality: </span>
                            <span className="value">
                                {
                                    nationality?
                                    <><Link to={`/nations/${nationality.id}`}>{nationality.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeNationality(nationality.id)}>Remove Nationality</button>
                                            :<></>
                                        }
                                    </>:
                                    <>Null</>
                                }
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label2">Occupations:</span>
                            <ul className="ultest2">
                            {   
                                occupations.length!=0?
                                occupations.map((oc, i)=>(
                                    <li key={i}><Link to={`/occupations/${oc.id}`}>{oc.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeOccupation(oc.id)}>Remove Occupation</button>
                                            :<></>
                                        }
                                        
                                    </li>
                                )):
                                <>Null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <span className="label2">SNS:</span>
                            <ul className="ultest2">
                            {   
                                snss.length!=0?
                                snss.map((s, i)=>(
                                    <li key={i}><a href={s.name}>{s.name}</a>
                                    {
                                        user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeSNS(s.id)}>Remove SNS</button>
                                        :<></>
                                    }
                                        
                                    </li>
                                )):
                                <>Null</>
                            }
                            {
                                user.roles.includes("ROLE_ADMIN")?
                                <form onSubmit={addSNS}>
                                    <div>
                                        <input type="text" placeholder="Enter SNS address" style={{width: "10em"}} onChange={(e)=>setSName(e.target.value)}/>
                                        <input type="submit" id="submitbtn"/>
                                    </div>
                                </form>
                                :<></>
                            }
                            
                            </ul>   
                        </div>
                        <div className="row2">
                            <span className="label2">Broadcasts:</span>
                            <ul className="ultest2">
                            {   
                                broadcasts.length!=0?
                                broadcasts.map((b, i)=>(
                                    <li key={i}><Link to={`/broadcasts/${b.id}`}>{b.name} | {b.date}</Link>
                                    </li>
                                )):
                                <>Null</>
                            }
                            </ul>
                        </div>
                        
                        <div className="row2">    
                            <span className="label2">Tags:</span>
                            <div className="ultest2">
                                <ul>
                                    <li style={{verticalAlign:"top"}}>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <form onSubmit={addTag2}>
                                                <div>
                                                    <input type="text"  placeholder="Enter Tag Name" style={{width: "10em"}} onChange={(e)=>setTName(e.target.value)}/>
                                                    <input type="submit" id="submitbtn"/>
                                                </div> 
                                            </form>
                                            :<></>
                                        }
                                        
                                    </li>
                                </ul>
                                
                                <div className="tag_block"> 
                                    {   
                                    tags?
                                    tags.map((t, i)=>(
                                        <div key={i} className="tag_field">
                                            <a href={`/tags/${t.id}`} className="tag">{t.name}</a>
                                            {
                                                user.roles.includes("ROLE_ADMIN")?
                                                <button onClick={()=>removeTag(t.id)} className="buttonTag">x</button>
                                                :<></>
                                            }
                                            
                                        </div>
                                    )):
                                    <>Null</>
                                    }
                                </div>
                            </div>
                              
                        </div> 
                        <div className="row2">
                            <p>{description}</p> 
                        </div>  
                        <div className="row2">
                            <span className="label2">Records:</span>
                            
                        </div>
                        <div className="rowTable">
                            {
                            routines.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Rank</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        routines.map((rou)=>(
                                        <tr>
                                            <td>
                                                <Link to={`/routines/${rou.id}`}>
                                                    {rou.name}
                                                </Link></td>
                                            <td>{rou.genre} {rou.type}</td>
                                            <td>{rou.rank}</td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>Tag List is Empty</p>
                            } 
                            </div> 
                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                                <div className="postDetail">
                                    <Link className="link" to="/people/create">Post Person</Link>
                                </div>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/people">Back to List</Link>  
                                    </div>
                                    <div className="backToDetail">
                                        <Link className="link" to={`/people/${id}/update`}>Update</Link>
                                    </div>
                                    
                                </div>
                            </>:
                            <>
                                <div className="backToDetail">
                                    <Link className="link" to="/people">Back to List</Link>  
                                </div>
                            </>
                        }
                        
                    </div>
                </div>

                
                {
                    user.roles.includes("ROLE_ADMIN")?
                    <>
                    <div className="profile_grid1">
                        <h2>All Occupations</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                                allOccupations.length!=0?
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
                                        allOccupations.map((oc, i)=>(
                                        <tr key={i}>
                                            <td>{oc.id}</td>
                                            <td>{oc.name}</td>
                                            <td>
                                                <button onClick={()=>addOccupation(oc.id)}>Add Role</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                                <p>Occupation List is empty</p>
                            }
                            </div>
                        </div>
                </div>
                <div className="profile_grid1">
                    <h2>All Tags</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                            allTags.length!=0?
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
                                        allTags.map((tag, i)=>(
                                        <tr key={i}>
                                            <td>{tag.id}</td>
                                            <td>{tag.name}</td>
                                            <td>
                                                <button onClick={()=>addTag(tag.id)}>Add Tag</button>
                                               
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>Tag List is Empty</p>
                            } 
                            </div>
                        </div>
                </div>  
                <div className="profile_grid1">
                    <h2>All Nations</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            {
                            allNationalities.length!=0?
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
                                        allNationalities.map((an, i)=>(
                                        <tr key={i}>
                                            <td>{an.id}</td>
                                            <td><Link to={`/nations/${an.id}`}>{an.name}</Link></td>
                                            <td>
                                                <button onClick={()=>assignNationality(an.id)}>Assign Nationality</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>Nations List is Empty</p>
                            } 
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
export default PersonDetail;