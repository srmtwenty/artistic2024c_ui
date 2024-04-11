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
    const [allImages, setAllImages]=useState([])
    const [addresses, setAddresses]=useState([])
    const [allAddresses, setAllAddresses]=useState([])
    const [aName, setAName]=useState("")
    const [profilePic, setProfilePic]=useState(0)
    const [swimsuitDetails, setSwimsuitDetails]=useState([])
    const [choreos, setChoreos]=useState([])

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
                setProfilePic(res.data.profilePic)
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
    const loadAddressesForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/addresses`, {headers:authHeader()})
            .then(res=>{
                setAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllAddresses=()=>{
        axios.get(`http://localhost:8080/addresses`, {headers:authHeader()})
            .then(res=>{
                setAllAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllImages=()=>{
        axios.get(`http://localhost:8080/files`, {headers:authHeader()})
            .then(res=>{
                setAllImages(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadSwimsuitDetails=()=>{
        axios.get(`http://localhost:8080/people/${id}/swimsuitDetails`, {headers:authHeader()})
            .then(res=>{
                setSwimsuitDetails(res.data)
                //console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadChoreos=()=>{
        axios.get(`http://localhost:8080/people/${id}/choreos`, {headers:authHeader()})
            .then(res=>{
                setChoreos(res.data)
                //console.log(res.data)
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
        loadAddressesForPerson()
        loadAllAddresses()
        loadAllImages()
        loadSwimsuitDetails()
        loadChoreos()
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

    const addAddress=(addressId)=>{
        axios.put(`http://localhost:8080/people/${id}/addAddress/${addressId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Address has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeAddress=(addressId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeAddress/${addressId}`)
            .then(res=>{
                console.log("Address has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addAddress2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/addAddressAlt`,{
            name:aName
        })
            .then(res=>{
                setAName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
            })
            .catch(err=>console.log(err))
    }

    const assignProfilePic=(profilePicId)=>{
        axios.put(`http://localhost:8080/people/${id}/assignProfilePic/${profilePicId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeProfilePic=(profilePicId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeProfilePic/${profilePicId}`,{}, {headers:authHeader()})
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
                    

                    <div className="labels">
                        <h2><strong>{name}</strong> Profile (Id: {id})</h2>
                        <div style={{display:"flex", width:"90%", margin:"auto"}}>
                            
                            <div style={{flex:"1"}}>
                                <div className="row2FlexChild">
                                    <span className="value">
                                        {
                                            profilePic!=null?
                                            <><img src={`http://localhost:8080/files/${profilePic.url}`} style={{border:"1px black solid", width:"300px"}}/>
                                                {
                                                    user.roles.includes("ROLE_ADMIN")?
                                                    <button className="marginLeft" onClick={()=>removeProfilePic(profilePic.id)}>x</button>
                                                    :<></>
                                                }
                                            </>:
                                            <div style={{border:"1px black solid", padding:"2px"}}>No profile picture</div>
                                        }
                                    </span>
                                </div>
                            </div>


                            <div style={{flex:"1", backgroundColor:"white"}}>
                            
                                <div className="row2FlexChild">
                                    <span className="label">Gender: </span>
                                    <span className="value">{gender}</span>
                                </div>
                                <div className="row2FlexChild">
                                    <span className="label">Nationality: </span>
                                    <span className="value">
                                        {
                                            nationality?
                                            <><Link to={`/nations/${nationality.id}`}>{nationality.name}</Link>
                                                {
                                                    user.roles.includes("ROLE_ADMIN")?
                                                    <button className="marginLeft" onClick={()=>removeNationality(nationality.id)}>x</button>
                                                    :<></>
                                                }
                                            </>:
                                            <>Null</>
                                        }
                                    </span>
                                </div>
                                <div className="row2FlexChild">
                                    <span className="label2">Occupations:</span>
                                    <ul className="ultest2">
                                    {   
                                        occupations.length!=0?
                                        occupations.map((oc, i)=>(
                                            <li key={i}><Link to={`/occupations/${oc.id}`}>{oc.name}</Link>
                                                {
                                                    user.roles.includes("ROLE_ADMIN")?
                                                    <button className="marginLeft" onClick={()=>removeOccupation(oc.id)}>x</button>
                                                    :<></>
                                                }
                                                
                                            </li>
                                        )):
                                        <>Null</>
                                    }
                                    </ul>
                                </div>
                                <div className="row2FlexChild">    
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
                                
                            </div>
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
                                                <button className="marginLeft" onClick={()=>removeSNS(s.id)}>x</button>
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
                                        routines.map((rou, i)=>(
                                        <tr key={i}>
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
                            <p>Record List is Empty</p>
                            } 
                            </div> 


                            <div className="row2">
                                <span className="label2">Images:</span>  
                            </div>
                            <div className="rowTable">
                                
                                {
                                addresses.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                        {
                                            addresses.map((a, i)=>(
                                                
                                                <div key={i} style={{display:"block"}}>
                                                    <Link to={`/addresses/${a.id}`}>
                                                        <img src={`http://localhost:8080/files/${a.url}`} style={{width:"150px"}}/>
                                                    </Link>
                                                    <div style={{fontSize:"10px"}}>{a.name}</div>
                                                </div>
                                                
                                            ))
                                        }  
                                    </div>:
                                <p>Image List is Empty</p>
                                } 
                                
                            </div> 


                            <div className="row2">
                                <span className="label2">SwimsuitDetails:</span>  
                            </div>
                            <div className="rowTable">
                                
                                {
                                swimsuitDetails.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                        {
                                            swimsuitDetails.map((sd, i)=>(
                                                
                                                <div key={i} style={{display:"block"}}>
                                                    <Link to={`/swimsuitDetails/${sd.id}`}>
                                                        {   
                                                            sd.swimsuitProfilePic!==null?
                                                            <img src={`http://localhost:8080/files/${sd.swimsuitProfilePic.url}`} style={{width:"150px"}}/>
                                                            :<>No profile Pic</>
                                                        }
                                                        
                                                    </Link>
                                                    <div style={{fontSize:"10px"}}>{sd.name}</div>
                                                </div>
                                                
                                            ))
                                        }  
                                    </div>:
                                <p>Image List is Empty</p>
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
                                            <td><Link to={`/addresses/${aa.id}`}>{aa.name}</Link></td>
                                            <td><img src={`http://localhost:8080/files/${aa.url}`} style={{width:"300px"}}/></td>
                                            <td>
                                                <button onClick={()=>addAddress(aa.id)}>Add Address</button>
                                                <button onClick={()=>assignProfilePic(aa.id)}>Assign ProfileP</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>All Image List is Empty</p>
                            } 
                            </div>
                        </div>
                    </div>  

                    <div className="profile_grid1">
                    <h2>All Images</h2>
                        <div className="labels">
                            <div className="rowTable">
                            {
                            allImages.length!=0?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                           
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allImages.map((ai, i)=>(
                                        <tr key={i}>
                                            <td><Link to={`/images/${ai.id}`}>{ai.id}</Link></td>
                                            
                                            <td><img src={ai.url} style={{width:"300px"}}/></td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>:
                            <p>All Image List is Empty</p>
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