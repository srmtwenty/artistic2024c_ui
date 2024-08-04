import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Modal} from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../style1.css';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function PersonDetail(){
    const [name, setName]=useState("")
    const [engName, setEngName]=useState("")
    const [description, setDescription]=useState("")
    const [gender, setGender]=useState(0)
    const [nationality, setNationality]=useState(null)
    const [nationalityId, setNationalityId]=useState(-1)
    const [allNationalities, setAllNationalities]=useState([])
    const [occupations, setOccupations]=useState([])
    const [allOccupations, setAllOccupations]=useState([])
    const [tags, setTags]=useState([])
    const [allTags, setAllTags]=useState([])
    const [snss, setSnss]=useState([])
    const [articles, setArticles]=useState([])
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
    const [occupationId, setOccupationId]=useState(-1)
    const [profilePicAlt, setProfilePicAlt]=useState(null)

    const [revealSuits, setRevealSuits]=useState(false)
    const [revealPhotos, setRevealPhotos]=useState(true)

    const [postPerPageSuit, setPostPerPageSuit]=useState(20)
    const [currentPageSuit, setCurrentPageSuit]=useState(1)
    const [startNumSuit, setStartNumSuit]=useState(1)
    const [endNumSuit, setEndNumSuit]=useState(postPerPageSuit);
    const [numberOfPageSuit, setNumberOfPageSuit]=useState(Math.ceil(swimsuitDetails.length/postPerPageSuit))

    const [postPerPagePhoto, setPostPerPagePhoto]=useState(20)
    const [currentPagePhoto, setCurrentPagePhoto]=useState(1)
    const [startNumPhoto, setStartNumPhoto]=useState(1)
    const [endNumPhoto, setEndNumPhoto]=useState(postPerPagePhoto);
    const [numberOfPagePhoto, setNumberOfPagePhoto]=useState(Math.ceil(addresses.length/postPerPagePhoto))

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const user=AuthService.getCurrentUser();
    const {id}=useParams();
    const [idPrev, setIdPrev]=useState(parseInt(id)-1);
    const [idNext, setIdNext]=useState(parseInt(id)+1);
    const navigate=useNavigate();

    const [open, setOpen]=useState(false);
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };

    const imgClick=()=>{
        console.log("Clicked!");
    }

    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setEngName(res.data.engName)
                setDescription(res.data.description)
                setGender(res.data.gender)
                setNationality(res.data.nationality)
                setNationalityId(res.data.nationality.id)
                setProfilePic(res.data.profilePic)
                setProfilePicAlt(res.data.profilePicAlt)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
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

    const loadArticlesForPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}/articles`, {headers:authHeader()})
            .then(res=>{
                setArticles(res.data)
                console.log(articles)
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
        axios.get(`http://localhost:8080/people/${id}/addressesAlt`, {headers:authHeader()})
            .then(res=>{
                setAddresses(res.data)
                setNumberOfPagePhoto(Math.ceil(addresses.length/postPerPagePhoto))
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
                setNumberOfPageSuit(Math.ceil(swimsuitDetails.length/postPerPageSuit))
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
        loadSwimsuitDetails()
        loadChoreos()
        loadArticlesForPerson()
    }, [swimsuitDetails.length, addresses.length, 
        idPrev, idNext])

    const addOccupation=(e)=>{
        e.preventDefault()
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
    const assignNationality=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/assignNation/${nationalityId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/people/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeNationality=(nationalityId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeNation/${nationalityId}`,{}, {headers:authHeader()})
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
        axios.put(`http://localhost:8080/people/${id}/removeAddress/${addressId}`,{}, {headers:authHeader()})
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

    const assignProfilePic=(url)=>{
        axios.put(`http://localhost:8080/people/${id}/updateProfilePic`, 
            {
                profilePicAlt:url
            },{headers:authHeader()})
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

    const prevPage=(e)=>{
        e.preventDefault();
        //setIdPrev(parseInt(idPrev)-1)
        //window.location.reload();
        navigate(`/people/${idPrev}`)
        window.location.reload();
    }
    const nextPage=(e)=>{
        e.preventDefault();
        //setIdNext(parseInt(idNext)+1)
        navigate(`/people/${idNext}`)
        window.location.reload();
        //window.location.reload();
    }

    const prevPageSuit=()=>{
        setCurrentPageSuit(currentPageSuit-1);
        setStartNumSuit(startNumSuit-(postPerPageSuit))
        setEndNumSuit(endNumSuit-(postPerPageSuit))
    }
    const nextPageSuit=()=>{
        setCurrentPageSuit(currentPageSuit+1);
        setStartNumSuit(startNumSuit+(postPerPageSuit))
        setEndNumSuit(endNumSuit+(postPerPageSuit))
    }

    const prevPagePhoto=()=>{
        setCurrentPagePhoto(currentPagePhoto-1);
        setStartNumPhoto(startNumPhoto-(postPerPagePhoto))
        setEndNumPhoto(endNumPhoto-(postPerPagePhoto))
    }
    const nextPagePhoto=()=>{
        setCurrentPagePhoto(currentPagePhoto+1);
        setStartNumPhoto(startNumPhoto+(postPerPagePhoto))
        setEndNumPhoto(endNumPhoto+(postPerPagePhoto))
    }

    const handleRevealSuits=()=>{
        setRevealSuits(true)
        setRevealPhotos(false)
    }
    const handleRevealPhotos=()=>{
        setRevealSuits(false)
        setRevealPhotos(true)
    }

    return(
        <>

            <div className="profile_wrap2">
            {
                loadComplete!=true?
                <><h2>Now Loading</h2></>
                :<>
                {
                    noData!=true?
                    <>
                        <div className="profile_grid1">
                            
                            <div className="labels">
                                <h2 style={{borderBottom:"2px solid"}}><strong>{name}/{engName}</strong>(Id: {id})</h2>
                                <div className="create-your-own-wrapper">
                                    
                                    <div style={{flex:"1"}}>
                                        <div className="row2FlexChildPortrait">
                                            <span className="value">
                                                <div style={{border:"1px solid", height:"250px", width:"200px", backgroundColor:"white", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                {
                                                    profilePicAlt!=null?
                                                    <>
                                                        <img src={`http://localhost:8080/files/${profilePicAlt}`} style={{border:"1px black solid", height:"250px"}}/>
                                                    </>
                                                    :<p style={{margin:"0"}}>No profile picture</p>                                    
                                                }</div>  
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{flex:"1", backgroundColor:"white"}}>
                                    
                                        <div className="row2FlexChild">
                                            <span className="label">Gender: </span>
                                            <span className="value">{gender}</span>
                                        </div>
                                        <div className="row2FlexChild">
                                            <span className="label">Nation: </span>
                                            <div style={{width:"250px"}}>
                                                {
                                                    nationality?
                                                    <><Link to={`/nations/${nationality.id}`}>{nationality.name}</Link>
                                                        {
                                                            user && user.roles.includes("ROLE_ADMIN")?
                                                            <button className="marginLeft" onClick={()=>removeNationality(nationality.id)}>x</button>
                                                            :<></>
                                                        }
                                                    </>:
                                                    <>Null</>
                                                }
                                                {
                                                    user && user.roles.includes("ROLE_ADMIN") && allNationalities.length!=0?
                                                    <form onSubmit={assignNationality}>
                                                        <select id="nationalityId" name="nationalityId" onChange={(e)=>setNationalityId(e.target.value)}>
                                                            <option>Select Nation</option>
                                                            {
                                                            allNationalities.map((na, i)=>(
                                                                <option key={i} value={na.id}>{na.name}</option>
                                                            ))
                                                            }
                                                        </select>
                                                        
                                                        <input type="submit" value="Assign"/>
                                                    </form>
                                                    :<></>
                                                }
                                            </div>
                                            <>
                                            
                                            </>
                                        </div>
                                        <div className="row2FlexChild">
                                            <span className="label">Roles:</span>
                                            <div style={{width:"250px"}}>
                                                <ul className="ultest2">
                                                {   
                                                    occupations.length!=0?
                                                    occupations.map((oc, i)=>(
                                                        <li style={{paddingBottom:"10px"}}key={i}>
                                                            <div>    
                                                                <Link to={`/occupations/${oc.id}`} className="list-block">{oc.name}</Link>
                                                                {
                                                                    user && user.roles.includes("ROLE_ADMIN")?
                                                                    <button className="marginLeft" onClick={()=>removeOccupation(oc.id)}>x</button>
                                                                    :<></>
                                                                }
                                                            </div>
                                                        </li>
                                                    )):
                                                    <>Null</>
                                                }
                                                {
                                                    user && user.roles.includes("ROLE_ADMIN") && allOccupations.length!=0?
                                                    <form onSubmit={addOccupation}>
                                                        <select id="occupationId" name="occupationId" onChange={(e)=>setOccupationId(e.target.value)}>
                                                            <option>Select Occupation</option>
                                                        {
                                                        allOccupations.map((occu, i)=>(
                                                            
                                                            <option key={i} value={occu.id}>{occu.name}</option>
                                                        ))
                                                        }
                                                        </select>
                                                        
                                                        <input type="submit" value="Add"/>
                                                    </form>
                                                    :<></>
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                        {/*
                                        <div className="row2FlexChild">    
                                            <span className="label">Tags:</span>
                                            <div className="ultest2">
                                                
                                                <div className="tag_block"> 
                                                    {   
                                                    tags?
                                                    tags.map((t, i)=>(
                                                        <div key={i} className="tag_field">
                                                            <a href={`/tags/${t.id}`} className="tag">{t.name}</a>
                                                            {
                                                                user && user.roles.includes("ROLE_ADMIN")?
                                                                <button onClick={()=>removeTag(t.id)} className="buttonTag">x</button>
                                                                :<></>
                                                            }
                                                            
                                                        </div>
                                                    )):
                                                    <>Null</>
                                                    }
                                                </div>
                                                {
                                                    user && user.roles.includes("ROLE_ADMIN")?
                                                    <form onSubmit={addTag2}>
                                                        <div>
                                                            <input type="text"  placeholder="Enter Tag Name" style={{width: "10em"}} onChange={(e)=>setTName(e.target.value)}/>
                                                            <input type="submit" id="submitbtn"/>
                                                        </div> 
                                                    </form>
                                                    :<></>
                                                }
                                            </div>
                                            
                                        </div>*/}
                                        <div className="row2FlexChild"> 
                                            <span className="label">SNS:</span>
                                            <ul className="ultest2">
                                            {   
                                                snss.length!=0?
                                                snss.map((s, i)=>(
                                                    <li key={i}><a href={s.name}>SNS Link</a>
                                                    {
                                                        user && user.roles.includes("ROLE_ADMIN")?
                                                        <button className="marginLeft" onClick={()=>removeSNS(s.id)}>x</button>
                                                        :<></>
                                                    }
                                                        
                                                    </li>
                                                )):
                                                <>Null</>
                                            }
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
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
                                    
                                        <div className="row2FlexChild"> 
                                            <span className="label">Articles:</span>
                                            <ul className="ultest2">
                                            {   
                                                articles.length!=0?
                                                articles.map((ar, i)=>(
                                                    <li key={i}><a href={ar.name}>{ar.name}</a>
                                                    {
                                                        user && user.roles.includes("ROLE_ADMIN")?
                                                        <button className="marginLeft">x</button>
                                                        :<></>
                                                    }
                                                        
                                                    </li>
                                                )):
                                                <>Null</>
                                            }
                                            
                                            </ul> 

                                        </div>

                                        <div className="row2FlexChild"> 
                                            <span className="label">TV programs:</span>
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
                                    </div>
                                </div>


                                <div className="row2">
                                    
                                </div>
                                
                            
                                <div className="row2">
                                    <p>{description}</p> 
                                </div>  
                                <div className="row2">
                                    <span className="label">Records:</span>  
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
                                        <span className="label" style={{padding:"20px 0px 0px 0px"}}>Choreographic:</span>  
                                    </div>
                                    <div className="rowTable">
                                        
                                        {
                                            choreos.length!=0?
                                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                                {
                                                    choreos.map((cho, i)=>(
                                                        <div key={i} className="photoFrame1">
                                                            {
                                                                cho.profileAddress!=null?
                                                                <div>
                                                                    <Link to={`http://localhost:3000/addresses/${cho.profileAddress.url}`}>
                                                                        <img src={`http://localhost:8080/files/${cho.profileAddress.url}`} style={{height:"120px"}}/>
                                                                    </Link>
                                                                </div>
                                                                :<>No profile pic</>
                                                            } 
                                                            <Link to={`/choreos/${cho.id}`} style={{fontSize:"10px"}}>
                                                                {cho.name} 
                                                            </Link>
                                                    
                                                        </div>
                                                    ))
                                                }  
                                            </div>:
                                        <p>Choreographic List is Empty</p>
                                        } 
                                    </div> 

                                    <div style={{paddingTop:"10px"}}>
                                    <div style={{display:"flex", flexDirection:"row", alignItems:"center",paddingTop:"20px", marginLeft:"20px"}}>
                                        {
                                            revealPhotos!=false?
                                            <div className="rowButtonSelected" onClick={()=>handleRevealPhotos()}>
                                                <span className="label" style={{padding:"0px 0px 0px 0px"}}>Photos:</span>  
                                            </div>
                                            :<div className="rowButton" onClick={()=>handleRevealPhotos()}>
                                                <span className="label" style={{padding:"0px 0px 0px 0px"}}>Photos:</span>  
                                            </div>
                                        }
                                        
                                        {
                                            revealSuits!=false?
                                            <div className="rowButtonSelected" onClick={()=>handleRevealSuits()}>
                                                <span className="label" style={{padding:"0px 0px 0px 0px"}}>Swimsuits:</span>  
                                            </div>
                                            :<div className="rowButton" onClick={()=>handleRevealSuits()}>
                                                <span className="label" style={{padding:"0px 0px 0px 0px"}}>Swimsuits:</span>  
                                            </div>
                                            
                                        }
                                        
                                                                
                                    </div>
                                    
                                    <div className="rowTable">
                                    {
                                        revealSuits!=false?
                                        <>
                                            {      
                                                swimsuitDetails.length!=0?
                                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                                {
                                                    swimsuitDetails.slice(startNumSuit-1, endNumSuit).map((sd, i)=>(  
                                                        <div key={i} className="photoFrame1">
                                                            <Link to={`/swimsuitDetails/${sd.id}`}>
                                                            {   
                                                                sd.swimsuitProfilePic!==null?
                                                                <img src={`http://localhost:8080/files/${sd.swimsuitProfilePic.url}`} style={{height:"100px"}}/>
                                                                :<>No profile Pic</>
                                                            }
                                                            </Link>
                                                            <div style={{fontSize:"10px"}}>{sd.name}</div>
                                                        </div>
                                                    ))
                                                }  
                                                </div>
                                                :<p>Swimsuit List is Empty</p>
                                            } 
                                            <div>Page:{currentPageSuit} of {numberOfPageSuit}</div>
                                            <div>Range:{startNumSuit} - {endNumSuit}</div>
                                            {
                                                currentPageSuit!=1?
                                                <button onClick={()=>prevPageSuit()}>prev</button>
                                                :<button disabled>prev</button>
                                            }
                                            {
                                                currentPageSuit!=numberOfPageSuit?
                                                <button onClick={()=>nextPageSuit()}>next</button>
                                                :<button disabled>next</button>
                                            }
                                        </>
                                        :<></>
                                    }
                                    {
                                        revealPhotos!=false?
                                        <>
                                        {
                                        addresses.length!=0?
                                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                                {
                                                    addresses.slice(startNumPhoto-1, endNumPhoto).map((a, i)=>(
                                                        
                                                        <div key={i} className="photoFrame1">
                                                            <Link to={`http://localhost:3000/addresses/${a.id}`}>
                                                                <img src={`http://localhost:8080/files/${a.url}`} style={{height:"100px"}}/>
                                                            </Link>
                                                            <div style={{fontSize:"10px"}}>{a.name}</div>
                                                            <button onClick={()=>assignProfilePic(a.url)}>Profile Pic</button>
                                                            <button onClick={()=>removeAddress(a.id)}>x</button>
                                                        </div>
                                                        
                                                    ))
                                                }  
                                            </div>:
                                        <p>Image List is Empty</p>
                                        } 
                                        <div>Page:{currentPagePhoto} of {numberOfPagePhoto}</div>
                                        <div>Range:{startNumPhoto} - {endNumPhoto}</div>
                                        {
                                            currentPagePhoto!=1?
                                            <button onClick={()=>prevPagePhoto()}>prev</button>
                                            :<button disabled>prev</button>
                                        }
                                        {
                                            currentPagePhoto!=numberOfPagePhoto?
                                            <button onClick={()=>nextPagePhoto()}>next</button>
                                            :<button disabled>next</button>
                                        }
                                        </>
                                        :<></>
                                    }            
                                        
                                </div> 
                            </div>
                            </div>
                            <div className="buttonsWrapDetail">
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <>
                                        <div className="postDetail">
                                            <Link className="link" to="/people/create">Post Person</Link>
                                        </div>
                                        <div className="pagination_center">
                                            <button onClick={prevPage}>Prev ({idPrev})</button>
                                            <button onClick={nextPage}>Next ({idNext})</button>
                                        </div>
                                        <div style={{display:"flex"}}>
                                            <div className="backToDetail">
                                                <Link className="link" to="/people">Back to List</Link>  
                                            </div>
                                            <div className="backToDetail">
                                                <Link className="link" to={`/people/${id}/update`}>Edit</Link>
                                            </div>
                                            
                                        </div>
                                    </>:
                                    <>
                                        <div className="pagination_center">
                                            <button onClick={prevPage}>Prev ({idPrev})</button>
                                            <button onClick={nextPage}>Next ({idNext})</button>
                                        </div>
                                        <div className="backToDetail">
                                            <Link className="link" to="/people">Back to List</Link>  
                                        </div>
                                    </>
                                }
                                
                            </div>
                        </div>
 
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            
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
export default PersonDetail;