import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function BroadcastDetail(){
    const [name, setName]=useState("")
    const [url, setUrl]=useState("")
    const [date, setDate]=useState(new Date())
    const [description, setDescription]=useState("")
    const [tName, setTName]=useState("")
    const [people, setPeople]=useState([])
    const [tags, setTags]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allTags, setAllTags]=useState([])
    const navigate=useNavigate();
    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const loadBroadcast=()=>{
        axios.get(`http://localhost:8080/broadcasts/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setUrl(res.data.url)
                setDate(res.data.date)
                setDescription(res.data.description)
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
    const loadPeopleForBroadcast=()=>{
        axios.get(`http://localhost:8080/broadcasts/${id}/people`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setPeople(res.data)
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
    const loadTagsForBroadcast=()=>{
        axios.get(`http://localhost:8080/broadcasts/${id}/tags`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setTags(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadBroadcast();
        loadAllPeople();
        loadAllTags();
        loadPeopleForBroadcast();
        loadTagsForBroadcast();
    },[])

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/broadcasts/${id}/addPerson/${personId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/broadcasts/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/broadcasts/${id}/removePerson/${personId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Person has been removed!")
                window.location.reload();
                navigate(`/broadcasts/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag=(tagId)=>{
        axios.put(`http://localhost:8080/broadcasts/${id}/addTag/${tagId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("tag has been added!")
                window.location.reload();
                navigate(`/broadcasts/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeTag=(tagId)=>{
        axios.put(`http://localhost:8080/broadcasts/${id}/removeTag/${tagId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("tag has been removed!")
                window.location.reload();
                navigate(`/broadcasts/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addTag2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/broadcasts/${id}/addTagAlt`,{
            name:tName
        }, {headers:authHeader()})
            .then(res=>{
                setTName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
            })
            .catch(err=>console.log(err))
              
    }

    return(
        <>
            <div className="profile_wrap2">{
                name!=""?
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
                            <span className="label">Url: </span>
                            <span className="value">{url}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Date: </span>
                            <span className="value">{date.toLocaleString().split(',')[0]}</span>
                        </div>
                        
                        <div className="row2">
                            <span className="label2">People:</span>
                            <ul className="ultest2">
                            {   
                                people.length!=0?
                                people.map((p, i)=>(
                                    <li key={i}><Link to={`/people/${p.id}`}>{p.name}</Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removePerson(p.id)}>x</button>
                                            :<></>
                                        }
                                        
                                    
                                    </li>
                                )):
                                <>Null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
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
                                            </form>:
                                            <></>
                                        }
                                        
                                    </li>
                                </ul>
                                
                                <div className="tag_block"> 
                                    {   
                                    tags?
                                    tags.map((t, i)=>(
                                        <div key={i} className="tag_field">
                                            <a href={`/tags/${t.id}`} className="tag">{t.name}</a><button onClick={()=>removeTag(t.id)} className="buttonTag">x</button>
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
                    </div>
                    <div className="buttonsWrapDetail">
                        
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/broadcasts/create">Post Person</Link>
                            </div>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/broadcasts">Back to List</Link>  
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/broadcasts/${id}/update`}>Update</Link>
                                </div>
                            </div>
                            </>:
                            <div>
                           
                                <div className="backToDetail">
                                    <Link className="link" to="/broadcasts">Back to List</Link>  
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {
                    user.roles.includes("ROLE_ADMIN")?
                    <>
                    <div className="profile_grid1">
                        <h2>All People</h2>
                        <div className="labelsPost">
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
                                        allPeople.map((person, i)=>(
                                        <tr key={i}>
                                            <td>{person.id}</td>
                                            <td><Link to={`/people/${person.id}`}></Link>{person.name}</td>
                                            <td>
                                                <button onClick={()=>addPerson(person.id)}>Add Person</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                                <p>All People List is empty</p>
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
                                                <button onClick={()=>removeTag(tag.id)}>x</button>
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

                    </>:
                    <></>

                }
                

                </> 
                :<h2>No Records</h2>
                }
            </div>
        </>
    )
}
export default BroadcastDetail;