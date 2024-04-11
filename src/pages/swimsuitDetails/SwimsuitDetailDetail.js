import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function SwimsuitDetailDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [color, setColor]=useState("")
    const [year, setYear]=useState("")
    const [swimsuits, setSwimsuits]=useState([])
    const [allSwimsuits, setAllSwimsuits]=useState([])
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [swimsuitProfilePic, setSwimsuitProfilePic]=useState(0)

    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();
    
    const loadSwimsuitDetail=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}`,{headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setColor(res.data.color)
                setYear(res.data.year)
                setSwimsuitProfilePic(res.data.swimsuitProfilePic)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadSwimsuits=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}/swimsuits`,{headers:authHeader()})
            .then(res=>{
                setSwimsuits(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllSwimsuits=()=>{
        axios.get("http://localhost:8080/addresses",{headers:authHeader()})
            .then(res=>{
                setAllSwimsuits(res.data)
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
    const loadPeople=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}/people`, {headers:authHeader()})
            .then(res=>{
                setPeople(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuitDetail();
        loadSwimsuits();
        loadAllSwimsuits();
        loadAllPeople();
        loadPeople();
    },[])

    const addSwimsuit=(swimsuitId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/addSwimsuit/${swimsuitId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit has been added")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSwimsuit=(swimsuitId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/removeSwimsuit/${swimsuitId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit has been removed")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const assignSwimsuitProfilePic=(swimsuitId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/setSwimsuitProfilePic/${swimsuitId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit profile pic has been added")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSwimsuitProfilePic=(swimsuitId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/removeSwimsuitProfilePic/${swimsuitId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit profile pic has been removed")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/addPerson/${personId}`
            , {},{headers:authHeader()})
            .then(res=>{
                console.log("Person has been added")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/swimsuitDetails/${id}/removePerson/${personId}`
            , {},{headers:authHeader()})
            .then(res=>{
                console.log("Person has been removed")
                window.location.reload();
                navigate(`/swimsuitDetails/${id}`)
            })
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    
                        
                    <div className="labels">
                        <h2><strong>{name}</strong></h2>
                        <div className="row2">
                            <span className="value">
                                {
                                    swimsuitProfilePic?
                                    <>
                                    <Link to={`/images/${swimsuitProfilePic.url}`}>
                                        <img src={`http://localhost:8080/files/${swimsuitProfilePic.url}`} style={{width:"300px"}}/>
                                    </Link>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <button className="marginLeft" onClick={()=>removeSwimsuitProfilePic(swimsuitProfilePic.id)}>x</button>
                                            :<></>
                                        }
                                    </>
                                    :<>Null</>
                                }
                            </span>
                        </div>
                       
                        
                        <div className="row2">
                            <p>{description}</p> 
                        </div> 
                        <div className="row2">
                            <span className="label">color: </span>
                            <span className="value">{color}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Year: </span>
                            <span className="value">{year}</span>
                        </div>




                        <div className="profile_grid1">
                        {swimsuits.length!=0?
                        <>
                            <h2>Swimsuit photos</h2>
                
                            <div className="rowTable">
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        swimsuits.map((swimsuit, i)=>(
                                        <div key={i} style={{display:"block"}}>
                                            <Link to={`/images/${swimsuit.url}`}>
                                                <img style={{height:"150px", padding: "5px"}} src={`http://localhost:8080/files/${swimsuit.url}`}/>
                                                </Link>
                                            
                                            <div>
                                                <button onClick={()=>removeSwimsuit(swimsuit.id)}>x</button>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </>:
                        <h2>Swimsuit List is Empty</h2>
                        }
                    </div> 


                <div className="profile_grid1">
                {people.length!==0?
                <>
                    <h2>People List</h2>
         
                    <div className="rowTable">
                        <div>
                            {
                                people.map((person, i)=>(
                                    <div key={i}>
                                        <Link to={`/people/${person.id}`}>
                                            {person.name}
                                        </Link>
                                    
                                    <div>
                                        <button onClick={()=>removePerson(person.id)}>x</button>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </>:
                <h2>People List is Empty</h2>
            }
                    
                </div> 
                    </div>


                    


                    <div className="buttonsWrapDetail">
                        {
                            user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/swimsuitDetails/create">Post</Link> 
                            </div>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/swimsuitDetails">Back to List</Link>
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/swimsuitDetails/${id}/update`}>Update</Link>
                                </div>
                                
                            </div>
                            </>:
                            <>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/swimsuitDetails">Back to List</Link>
                                    </div>
                                </div>
                            </>
                        }
                        
                    </div>

                    
                </div>


                

                

                {
                    user.roles.includes("ROLE_ADMIN")?
                    <>
                    <div className="profile_grid1">
                        <h2>All A.Images</h2>
                   
                            <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Content</th>

                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allSwimsuits.map((as, i)=>(
                                        <tr key={i}>
                                            <td>{as.id}</td>
                                            <td>
                                                <img src={`http://localhost:8080/files/${as.url}`} style={{width:"300px"}}/>
                                            </td>
                                            
                                            <td>
                                                <button onClick={()=>assignSwimsuitProfilePic(as.id)}>Assign Swimsuit Profile Pic</button>
                                                <button onClick={()=>addSwimsuit(as.id)}>Add Swimsuit</button>
                                            </td>                                        
                                        </tr>    
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </div>
                    


                    <div className="profile_grid1">
                    <h2>All People</h2>
                   
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
                                        allPeople.map((ap, i)=>(
                                        <tr key={i}>
                                            <td>{ap.id}</td>
                                            <td>
                                                {ap.name}
                                            </td>
                                            
                                            <td>
                                                <button onClick={()=>addPerson(ap.id)}>Add Person</button>
                                            </td>                                        
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




            </div> 
        </>
    )
}
export default SwimsuitDetailDetail;