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
    const [person, setPerson]=useState(null)
    const [personId, setPersonId]=useState(0)
    const [routines, setRoutines]=useState([])

    const [addressId, setAddressId]=useState(0);
    const [address, setAddress]=useState(null);
    const [addressURL, setAddressURL]=useState("");

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
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
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
                setLoadComplete(true)
                console.log(loadComplete)
            })
    }
    const loadSwimsuits=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}/swimsuits`,{headers:authHeader()})
            .then(res=>{
                setSwimsuits(res.data)
            })
            .catch(err=>{
                console.log(err);
                setNoData(true);
            })
    }
    const loadAllSwimsuits=()=>{
        axios.get("http://localhost:8080/addresses",{headers:authHeader()})
            .then(res=>{
                setAllSwimsuits(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people/orderByNameAsc", {headers:authHeader()})
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
    const loadPerson=(personId)=>{
        axios.get(`http://localhost:8080/people/${personId}`,{headers:authHeader()})
            .then(res=>{
                setPerson(res.data)
                console.log(person)
            })
            .catch(err=>console.log(err))
    }
    const loadRoutines=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails/${id}/getRoutines`,{headers:authHeader()})
            .then(res=>{
                setRoutines(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    const loadAddress=(addressId)=>{
        axios.get(`http://localhost:8080/addresses/${addressId}`, {headers:authHeader()})
            .then(res=>{
                setAddress(res.data)
                setAddressURL(res.data.url)

            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuitDetail();
        loadSwimsuits();
        loadAllSwimsuits();
        loadAllPeople();
        loadPeople();
        //loadPerson(personId);
        loadRoutines();
        loadAddress(addressId)
    },[addressId])

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
                //window.location.reload();
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
    const handleChangePerson=(e)=>{
        e.preventDefault();
        setPersonId(e.target.value);
        console.log(personId);
    }

    const imageClick=(addressId)=>{
        setAddressId(addressId);
        console.log(addressId);
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
                            <h2><strong>{name}</strong></h2>
                            <div className="labels">
                                
                                <div className="create-your-own-wrapper">
                                    
                                    <div style={{flex:"1"}}>
                                        <div className="row2FlexChildPortrait">
                                            <span className="value">
                                                {
                                                    addressId!=0?
                                                    <>
                                                        <img src={`http://localhost:8080/files/${addressURL}`} style={{maxWidth:"500px",minWidth:"400px"}}/>
                                                    </>:
                                                    <>
                                                    {
                                                        swimsuitProfilePic!=null?
                                                        <>
                                                            <img src={`http://localhost:8080/files/${swimsuitProfilePic.url}`} style={{maxWidth:"500px",minWidth:"400px"}}/>
                                                            {
                                                            user && user.roles.includes("ROLE_ADMIN")?
                                                            <button className="marginLeft" onClick={()=>removeSwimsuitProfilePic(swimsuitProfilePic.id)}>x</button>
                                                            :<></>
                                                        }
                                                        </>
                                                        :<>No Portrait</>
                                                    }
                                                    </>
                                                }
                                            </span>
                                        </div>

                                        {/*<div className="row2FlexChild">
                                        {
                                            swimsuits.length!=0?
                                        
                                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                                {
                                                    swimsuits.map((swimsuit, i)=>(
                                                    <div key={i} className="photoFrame2">
                                                        <div>
                                                            <img style={{height:"80px", padding: "5px"}} src={`http://localhost:8080/files/${swimsuit.url}`}
                                                                onClick={()=>imageClick(swimsuit.id)}
                                                            />
                                                        </div>
                                                                
                                                        <div style={{backgroundColor:"white"}}>
                                                            <Link style={{border:"2px solid", padding:"5px", backgroundColor:"yellow"}} to={`/images/${swimsuit.url}`}>Link</Link>
                                                            <button onClick={()=>removeSwimsuit(swimsuit.id)}>x</button>
                                                                    
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                                </div>
                                               
                                            :<h2>Swimsuit Photo List is Empty</h2>
                                        }
                                        </div>*/}
                                    </div>
                                
                            
                                
                                

                                    <div style={{flex:"1", backgroundColor:"white"}}>
                                        <div className="row2FlexChild">
                                            <span className="label">color: </span>
                                            <span className="value">{color}</span>
                                        </div>
                                        <div className="row2FlexChild">
                                            <span className="label">Year: </span>
                                            <span className="value">{year}</span>
                                        </div>


                                        <div className="row2FlexChild">
                                            <span className="label">Athletes:</span>
                                            <ul className="ultest2">
                                            {   
                                                people?
                                                people.map((p, i)=>(
                                                    <li key={i}><Link to={`/people/${p.id}`}>{p.name}</Link>
                                                        {
                                                            user && user.roles.includes("ROLE_ADMIN")?
                                                            <button className="marginLeft" onClick={()=>removePerson(p.id)}>x</button>
                                                            :<></>
                                                        }
                                                        
                                                    
                                                    </li>
                                                )):
                                                <>null</>
                                            }
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
                                                <div>
                                                    
                                                    <select id="person" name="person" onChange={handleChangePerson}>
                                                        <option>Null</option>
                                                        {
                                                            allPeople.map((ap, i)=>(
                                                            <option key={i} value={ap.id}>{ap.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <button onClick={()=>addPerson(personId)}>Add Person</button>
                                                </div>
                                                :<></>
                                            }
                                            </ul>
                                            
                                        </div>

                                        <div className="row2FlexChild">
                                            <span className="label2">Routines:</span>
                                            <ul className="ultest2">
                                            {   
                                                routines?
                                                routines.map((r, i)=>(
                                                    <li key={i}>
                                                        <Link to={`/routines/${r.id}`}>{r.name}</Link>
                                                    </li>
                                                )):
                                                <>null</>
                                            }</ul>
                                        </div>

                                        <div className="row2FlexChild">
                                            <p>{description}</p> 
                                        </div> 
                                    </div>
                                </div>

                                
                                <div className="row2">
                                        {
                                            swimsuits.length!=0?
                                        
                                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                                {
                                                    swimsuits.map((swimsuit, i)=>(
                                                    <div key={i} className="photoFrame2">
                                                        <div>
                                                            <img style={{height:"80px", padding:"5px", margin:"auto", display:"block"}} src={`http://localhost:8080/files/${swimsuit.url}`}
                                                                onClick={()=>imageClick(swimsuit.id)}
                                                            />
                                                        </div>
                                                                
                                                        <div style={{backgroundColor:"white"}}>
                                                            <Link style={{border:"1px solid", padding:"5px", backgroundColor:"rgba(240, 240, 240)"}} to={`/images/${swimsuit.url}`}>Link</Link>
                                                            <button onClick={()=>removeSwimsuit(swimsuit.id)}>x</button>
                                                                    
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                                </div>
                                               
                                            :<h2>Swimsuit Photo List is Empty</h2>
                                        }
                                        </div>
                            </div>


                            <div className="buttonsWrapDetail">
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <>
                                        <div className="postDetail">
                                            <Link className="link" to="/swimsuitDetails/create">Post</Link> 
                                        </div>
                                        <div style={{display:"flex"}}>
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
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                                <div className="profile_grid1">
                                    <h2>All People</h2>
                                    <select id="person" name="person" onChange={handleChangePerson}>
                                        <option>Null</option>
                                    {
                                        allPeople.map((ap, i)=>(
                                            <option key={i} value={ap.id}>{ap.name}</option>
                                        ))
                                    }
                                    </select>
                                    <button onClick={()=>addPerson(personId)}>Add Person</button>
                                </div>
                                
                                
                                <div className="profile_grid1">
                                    <h2>All A.Images</h2>
                                    <div className="rowTable">      
                                        <div style={{display:"flex", flexWrap:"wrap", margin:"auto"}}>
                                        {
                                            allSwimsuits.map((as, i)=>(
                                                <div key={i} style={{display:"block", border:"1px solid", backgroundColor:"gray", width:"200px", margin:"2px"}}>
                                                    
                                                    <Link to={`/addresses/${as.id}`}>
                                                        <img style={{height:"110px", padding: "5px"}} src={`http://localhost:8080/files/${as.url}`}/>
                                                    </Link>
                                                    
                                                    <div style={{display:"flex", flexDirection:"column"}}>
                                                
                                                        <button onClick={()=>assignSwimsuitProfilePic(as.id)}>Assign Profile Pic</button>
                                                        <button onClick={()=>addSwimsuit(as.id)}>Add Swimsuit</button>
                                                    </div>                                        
                                                </div>
                                                ))
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
                    </>
                }
            </div> 
        </>
    )
}
export default SwimsuitDetailDetail;