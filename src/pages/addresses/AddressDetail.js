import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function AddressDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [source, setSource]=useState("")
    const [url, setUrl]=useState("")
    const [people, setPeople]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allImages, setAllImages]=useState([])
    const [person, setPerson]=useState(null)
    const [personId, setPersonId]=useState(0)

    const [person2, setPerson2]=useState(null)
    const [personId2, setPersonId2]=useState(0)
    
    const [person3, setPerson3]=useState(null)
    const [personId3, setPersonId3]=useState(0)

    const [addressId, setAddressId]=useState(0)
    const [addressURL, setAddressURL]=useState("")
    const [addressId2, setAddressId2]=useState(0)
    const [addressURL2, setAddressURL2]=useState("")
    const [addressId3, setAddressId3]=useState(0)
    const [addressURL3, setAddressURL3]=useState("")
    const [addressURLAlt, setAddressURLAlt]=useState("")

    const [address, setAddress]=useState(null)
    const [address2, setAddress2]=useState(null)
    const [address3, setAddress3]=useState(null)

    const [allAddressImages, setAllAddressImages]=useState([])
    const [addressAlt, setAddressAlt]=useState(null)
    const [addressIdAlt, setAddressIdAlt]=useState(0);
    const [reveal, setReveal]=useState(false)
    const [revealAllImages, setRevealAllImages]=useState(false)
    const [revealAllImages2, setRevealAllImages2]=useState(false)

    const [revealCompPhotos, setRevealCompPhotos]=useState(false)
    const [revealCompPhotos2, setRevealCompPhotos2]=useState(false)
    const [addresses, setAddresses]=useState([])
    const [addresses2, setAddresses2]=useState([])
    const [addresses3, setAddresses3]=useState([])

    const [routine, setRoutine]=useState(0)
    const [allRoutines, setAllRoutines]=useState([])


    const [postPerPage, setPostPerPage]=useState(20)
    const [currentPage, setCurrentPage]=useState(1)
    const [startNum, setStartNum]=useState(1)
    const [endNum, setEndNum]=useState(postPerPage);
    
    
    const [postPerPagePhoto, setPostPerPagePhoto]=useState(50)
    const [currentPagePhoto, setCurrentPagePhoto]=useState(1)
    const [currentPageUpdatedPhoto, setCurrentPageUpdatedPhoto]=useState(false);
    
    const [startNumPhoto, setStartNumPhoto]=useState(1)
    const [endNumPhoto, setEndNumPhoto]=useState(postPerPagePhoto);
    const [numberOfPagePhoto, setNumberOfPagePhoto]=useState(Math.ceil(allAddressImages.length/postPerPagePhoto))

    const [postPerPagePhotoA3, setPostPerPagePhotoA3]=useState(20)
    const [currentPagePhotoA3, setCurrentPagePhotoA3]=useState(1)
    const [currentPageUpdatedPhotoA3, setCurrentPageUpdatedPhotoA3]=useState(false);
    
    const [startNumPhotoA3, setStartNumPhotoA3]=useState(1)
    const [endNumPhotoA3, setEndNumPhotoA3]=useState(postPerPagePhotoA3);
    const [numberOfPagePhotoA3, setNumberOfPagePhotoA3]=useState(Math.ceil(addresses3.length/postPerPagePhotoA3))

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const navigate=useNavigate();
    const {id}=useParams();
    const [idPrev, setIdPrev]=useState(parseInt(id)-1);
    const [idNext, setIdNext]=useState(parseInt(id)+1);
    const user=AuthService.getCurrentUser();

    const [page, setPage]=useState(1)

    const loadAddress=()=>{
        axios.get(`http://localhost:8080/addresses/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setRoutine(res.data.routine)
                setSource(res.data.source)
                setUrl(res.data.url)
                
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
    const loadAddressAlt=(addressIdAlt)=>{
        axios.get(`http://localhost:8080/addresses/${addressIdAlt}`, {headers:authHeader()})
            .then(res=>{
                setAddressAlt(res.data)
                setAddressURLAlt(res.data.url)
                console.log("address_alt: "+res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAddressAlt_A=(addressId)=>{
        axios.get(`http://localhost:8080/addresses/${addressId}`, {headers:authHeader()})
            .then(res=>{
                setAddress(res.data)
                setAddressURL(res.data.url)
                console.log("address_alt_a: "+res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAddressAlt_B=(addressId2)=>{
        axios.get(`http://localhost:8080/addresses/${addressId2}`, {headers:authHeader()})
            .then(res=>{
                setAddress2(res.data)
                setAddressURL2(res.data.url)
                console.log("address_alt_b: "+res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAddressAlt_C=(addressId3)=>{
        axios.get(`http://localhost:8080/addresses/${addressId3}`, {headers:authHeader()})
            .then(res=>{
                setAddress3(res.data)
                setAddressURL3(res.data.url)
                console.log("address_alt_c: "+res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadPeople=()=>{
        axios.get(`http://localhost:8080/addresses/${id}/peopleAlt`, {headers:authHeader()})
        .then(res=>{
            console.log(res.data)
            setPeople(res.data)
            
        })
        .catch(err=>console.log(err))
    }
    const loadAllPeople=()=>{
        axios.get("http://localhost:8080/people/orderByNameAsc")
            .then(res=>{
                setAllPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllRoutines=()=>{
        axios.get("http://localhost:8080/routines")
            .then(res=>{
                setAllRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllImages=()=>{
        axios.get("http://localhost:8080/files", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setAllImages(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllAddressImages=()=>{
        axios.get("http://localhost:8080/addresses", {headers:authHeader()})
        .then(res=>{
            console.log(res.data)
            setAllAddressImages(res.data)
            setNumberOfPagePhoto(Math.ceil(allAddressImages.length/postPerPagePhoto))
            
        })
        .catch(err=>console.log(err))
    }
    const loadPerson=(personId)=>{
        axios.get(`http://localhost:8080/people/${personId}`
            , {headers:authHeader()})
                .then(res=>{
                    setPerson(res.data)
                    //setPersonName(res.data.name)
                    console.log(`Person: ${person}`)
                    
                })
                .catch(err=>console.log(err))
    }
    const loadPerson2=(personId2)=>{
        axios.get(`http://localhost:8080/people/${personId2}`
            , {headers:authHeader()})
                .then(res=>{
                    setPerson2(res.data)
                    //setPersonName(res.data.name)
                    console.log(`Person2: ${person2}`)
                    
                })
                .catch(err=>console.log(err))
    }
    const loadPerson3=(personId3)=>{
        axios.get(`http://localhost:8080/people/${personId3}`
            , {headers:authHeader()})
                .then(res=>{
                    setPerson3(res.data)
                    //setPersonName(res.data.name)
                    
                    console.log(`Person3: ${person3}`)
                    
                })
                .catch(err=>console.log(err))
    }

    const handleReveal=()=>{
        if(reveal==false)
            setReveal(true)
        else
            setReveal(false)
    }
    const handleRevealAllImages=()=>{
        if(revealAllImages==false)
            setRevealAllImages(true)
        else
            setRevealAllImages(false)
    }
    const handleRevealAllImages2=()=>{
        if(revealAllImages2==false)
            setRevealAllImages2(true)
            
        else
            setRevealAllImages2(false)
    }
    const handleRevealCompPhotos=()=>{
        if(revealCompPhotos==false)
            setRevealCompPhotos(true)
        else
            setRevealCompPhotos(false)
    }
    const handleRevealCompPhotos2=()=>{
        if(revealCompPhotos2==false)
            setRevealCompPhotos2(true)
        else
            setRevealCompPhotos2(false)
    }

    const imageClick1=(addressId)=>{
        setAddressId(addressId);
        console.log(addressId)
    }
    const imageClick2=(addressId2)=>{
        setAddressId2(addressId2);
        console.log(addressId2)
    }
    const imageClick3=(addressId3)=>{
        setAddressId3(addressId3);
        console.log(addressId3)
    }
    const imageClick4=(addressIdAlt)=>{
        setAddressIdAlt(addressIdAlt);
        console.log(addressIdAlt)
    }
    const loadAddressesForPerson=(personId)=>{
        axios.get(`http://localhost:8080/people/${personId}/addressesAlt`, {headers:authHeader()})
            .then(res=>{
                setAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAddressesForPerson2=(personId2)=>{
        axios.get(`http://localhost:8080/people/${personId2}/addressesAlt`, {headers:authHeader()})
            .then(res=>{
                setAddresses2(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAddressesForPerson3=(personId3)=>{
        axios.get(`http://localhost:8080/people/${personId3}/addressesAlt`, {headers:authHeader()})
            .then(res=>{
                setAddresses3(res.data)
                setNumberOfPagePhotoA3(Math.ceil(addresses3.length/postPerPagePhotoA3))
            })
            .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        loadAddress();
        loadPeople();
        loadAllPeople();
        loadAllRoutines();
        loadAllAddressImages();
        loadPerson(personId);
        loadPerson2(personId2);
        loadPerson3(personId3);
        loadAddressAlt(addressIdAlt)
        loadAddressesForPerson(personId);
        loadAddressesForPerson2(personId2);
        loadAddressesForPerson3(personId3);
        loadAddressAlt_A(addressId)
        loadAddressAlt_B(addressId2)
        loadAddressAlt_C(addressId3)
         
    },[personId, personId2, personId3, 
        addressId, addressId2, addressId3, addressIdAlt,
        startNum, endNum, currentPage,allAddressImages.length,
        addresses3.length,
        /*
        , allAddressImages, 
        numberOfPagePhoto, startNumPhoto, endNumPhoto, currentPagePhoto,
        numberOfPagePhotoA3, startNumPhotoA3, endNumPhotoA3, currentPagePhotoA3,
        */
        idPrev, idNext
    ])

    const assignRoutine=(routineId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/setRoutine/${routineId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Routine has been added!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeRoutine=(routineId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/removeRoutine/${routineId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Routine has been removed!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addPersonAlt=(personId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/addPersonAlt/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePersonAlt=(personId)=>{
        axios.put(`http://localhost:8080/addresses/${id}/removePersonAlt/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been removed!")
                window.location.reload();
                navigate(`/addresses/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const handleChangePerson=(e)=>{
        e.preventDefault();
        setPersonId(e.target.value);
        setAddressId(0);
        console.log(personId);
    }
    const handleChangePerson2=(e)=>{
        e.preventDefault();
        setPersonId2(e.target.value);
        setAddressId2(0);
        console.log(personId2);
    }
    const handleChangePerson3=(e)=>{
        e.preventDefault();
        setPersonId3(e.target.value);
        setAddressId3(0);
        console.log(personId3);
    }
    const handleChangeAddressIdAlt=(e)=>{
        e.preventDefault();
        setAddressIdAlt(e.target.value);
        console.log(addressIdAlt);
    }
    
    const prevPage=(e)=>{
        e.preventDefault();
        //setIdPrev(parseInt(idPrev)-1)
        //window.location.reload();
        navigate(`/addresses/${idPrev}`)
        window.location.reload();
    }
    const nextPage=(e)=>{
        e.preventDefault();
        //setIdNext(parseInt(idNext)+1)
        navigate(`/addresses/${idNext}`)
        window.location.reload();
        //window.location.reload();
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

    const prevPagePhotoA3=()=>{
        setCurrentPagePhotoA3(currentPagePhotoA3-1);
        setStartNumPhotoA3(startNumPhotoA3-(postPerPagePhotoA3))
        setEndNumPhotoA3(endNumPhotoA3-(postPerPagePhotoA3))
}
    const nextPagePhotoA3=()=>{
        setCurrentPagePhotoA3(currentPagePhotoA3+1);
        setStartNumPhotoA3(startNumPhotoA3+(postPerPagePhotoA3))
        setEndNumPhotoA3(endNumPhotoA3+(postPerPagePhotoA3))
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
                                <h2>Image Detail: {name} (id:{id})</h2>
                                <p>Description: {description}</p>
                                <p>URL: {url}</p>
                                <p>Source: {source}</p>
                                <div>
                                    <img src={`http://localhost:8080/files/${url}`} style={{margin:"auto", width:"100%", maxWidth:"700px"}}/>
                                </div>
                            
                            
                                <div className="row2">
                                    <span className="label">Routine: </span>
                                    <span className="value">
                                    {
                                        routine?
                                        <><Link to={`/routines/${routine.id}`}>{routine.name}</Link>
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
                                                <button className="marginLeft" onClick={()=>removeRoutine(routine.id)}>x</button>
                                                :<></>
                                            }
                                        </>:
                                        <>Null</>
                                    }
                                    </span>
                                </div>
                                <div className="row2">
                                    <span className="label2">People:(ref)</span>  
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
                                                        <button onClick={()=>removePersonAlt(p.id)}>Remove</button>
                                                    </td>
                                                </tr>
                                                ))
                                            }  
                                            </tbody>
                                        </table>:
                                        <p>People List is Empty</p>
                                    } 
                                </div> 
                                </div>
                            </div>
                        


                            <div className="buttonsWrapDetail">
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <>
                                        <div className="postDetail">
                                            <Link className="link" to="/addresses/create">Post Address</Link>
                                        </div>
                                        
                                        <div className="pagination_center">
                                            <button onClick={prevPage}>Prev ({idPrev})</button>
                                            <button onClick={nextPage}>Next ({idNext})</button>
                                        </div>
                                        <div style={{display:"flex"}}>
                                            <div className="backToDetail">
                                                <Link className="link" to="/addresses">Back to List</Link>  
                                            </div>
                                            <div className="backToDetail">
                                                <Link className="link" to={`/addresses/${id}/update`}>Edit</Link>
                                            </div>
                                        </div>
                                    </>:
                                    <>
                                        
                                        <div className="backToDetail">
                                            <Link className="link" to="/addresses">Back to List</Link>  
                                        </div>
                                    </>
                                }
                            </div>

                
                            <div className="profile_grid1">
                            <div className="labels">
                                <div onClick={()=>handleRevealCompPhotos()} className="expandElement">
                                    <h2>Photo Comparison (athlete1 vs athlete2)</h2>
                                    {
                                        revealCompPhotos?
                                        <>^</>
                                        :<>v</>
                                    }    
                            
                                </div>
                                {
                                    revealCompPhotos?
                                    <>
                                        <div className="container2">
                                            <div className="subContainer2">
                                                <p>Select Person: 
                                                    <select id="person" name="person" onChange={handleChangePerson}>
                                                        <option><h3>Null</h3></option>
                                                        {
                                                            allPeople.map((p, i)=>(
                                                                <option key={i} value={p.id}><img src={`/images/${p.profilePicAlt}`}/>{p.name}</option>
                                                            ))     
                                                        }    
                                                    </select>
                                                    <button onClick={()=>addPersonAlt(person.id)}>Add Person</button>
                                                </p>
                                                
                                                {
                                                    addressId!=0?
                                                    <>
                                                        <img src={`http://localhost:8080/files/${addressURL}`} style={{height:"100%", maxHeight:"300px"}}/>
                                                    </>:
                                                    <>
                                                    {
                                                        person!=null && person.profilePicAlt!=null?
                                                        <>
                                                            <img src={`http://localhost:8080/files/${person.profilePicAlt}`} style={{height:"300px"}}/>
                                                        </>
                                                        :<>No portrait</>
                                                    }
                                                    </>
                                                }

                                                {
                                                addresses.length!=0?
                                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                                        {
                                                            addresses.map((a, i)=>(
                                                            <div key={i} className="photoFrame_Small">
                                                                <img src={`http://localhost:8080/files/${a.url}`} onClick={()=>imageClick1(a.id)} style={{height:"30px"}}/>
                                                            </div>
                                                                
                                                            ))
                                                        }  
                                                    </div>
                                                    :<p>Image List is Empty</p>
                                                } 
                                            </div> 
                                        
                                            <div style={{margin:"10px", padding: "100px 0", textAlign:"center"}}>
                                                <h2>&</h2>
                                            </div>
                                    
                                            <div className="subContainer2">
                                                <p>Select Person2: 
                                                    <select id="person" name="person" onChange={handleChangePerson2}>
                                                        <option><h3>Null</h3></option>
                                                        {
                                                            allPeople.map((p2, i)=>(
                                                                <option key={i} value={p2.id}>{p2.name}</option>
                                                            ))     
                                                        }    
                                                    </select>
                                                    <button onClick={()=>addPersonAlt(person2.id)}>Add Person</button>
                                                </p>
                                                {
                                                    addressId2!=0?
                                                    <>
                                                        <img src={`http://localhost:8080/files/${addressURL2}`} style={{height:"100%", maxHeight:"300px"}}/>
                                                    </>
                                                    :<>
                                                    {
                                                        person2!=null && person2.profilePicAlt!=null?
                                                        <>
                                                            <img src={`http://localhost:8080/files/${person2.profilePicAlt}`} style={{height:"300px"}}/>
                                                        </>
                                                        :<>No portrait</>
                                                    }
                                                    </>
                                                }
                                                {
                                                addresses2.length!=0?
                                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                                        {
                                                            addresses2.map((a2, i)=>(
                                                            <div key={i} className="photoFrame_Small">
                                                                <img src={`http://localhost:8080/files/${a2.url}`} onClick={()=>imageClick2(a2.id)} style={{height:"30px"}}/>
                                                            </div>  
                                                            ))
                                                        }  
                                                    </div>
                                                    :<p>Image List is Empty</p>
                                                } 
                                            </div> 
                                        </div>

                                        <div className="container2">   
                                            <div className="subContainer2">
                                                <p>Image: </p>
                                                <div>
                                                    <img src={`http://localhost:8080/files/${url}`} style={{width:"100%", maxWidth:"500px"}}/>
                                                </div>
                                            </div> 
                                        </div>
                                
                                    </>
                                    :<></>
                                }
                            </div>
                        </div>

                        <div className="profile_grid1">
                            <div className="labels">
                                <div onClick={()=>handleRevealCompPhotos2()} className="expandElement">
                                    <h2>Photo Comparison (athlete vs current photo)</h2>
                                    {
                                        revealCompPhotos2?
                                        <>^</>
                                        :<>v</>
                                    }    
                                </div>
                                {
                                    revealCompPhotos2?
                                    <>
                                        <div className="container2">
                                            <div className="subContainer2">
                                                <p>Select Person3: 
                                                    <select id="person3" name="person3" onChange={handleChangePerson3}>
                                                        <option><h3>Null</h3></option>
                                                        {
                                                            allPeople.map((p3, i)=>(
                                                                <option key={i} value={p3.id}><img src={`/images/${p3.profilePicAlt}`}/>{p3.name}</option>
                                                            ))     
                                                        }    
                                                    </select>
                                                    
                                                </p>
                                                
                                                {
                                                    addressId3!=0?
                                                    <>
                                                        <img src={`http://localhost:8080/files/${addressURL3}`} style={{height:"100%", maxHeight:"300px"}}/>
                                                    </>:
                                                    <>
                                                    {
                                                        person3!=null && person3.profilePicAlt!=null?
                                                        <>
                                                            <img src={`http://localhost:8080/files/${person3.profilePicAlt}`} style={{height:"300px"}}/>
                                                        </>
                                                        :<>No portrait</>
                                                    }
                                                    </>
                                                }

                                                {
                                                addresses3.length!=0?
                                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                                        {
                                                            addresses3.slice(startNumPhotoA3-1, endNumPhotoA3).map((a3, i)=>(
                                                            <div key={i} className="photoFrame_Small">
                                                                <img src={`http://localhost:8080/files/${a3.url}`} onClick={()=>imageClick3(a3.id)} style={{height:"30px"}}/>
                                                            </div>
                                                                
                                                            ))
                                                        }  
                                                    </div>
                                                    :<p>Image List is Empty</p>
                                                } 

                                                <div>Page:{currentPagePhotoA3} of {numberOfPagePhotoA3}</div>
                                                <div>Range:{startNumPhotoA3} - {endNumPhotoA3}</div>
                                                {
                                                    currentPagePhotoA3!=1?
                                                    <button onClick={()=>prevPagePhotoA3()}>prevA3</button>
                                                    :<button disabled>prev</button>
                                                }
                                                {
                                                    currentPagePhotoA3!=numberOfPagePhotoA3?
                                                    <button onClick={()=>nextPagePhotoA3()}>nextA3</button>
                                                    :<button disabled>next</button>
                                                }
                                            </div> 
                                            
                                            
                                            <div className="subContainer2">
                                                <p>Image: </p>
                                                <img src={`http://localhost:8080/files/${url}`} style={{height:"100%", maxHeight:"300px"}}/>
                                            </div> 
                                        </div>
                                        
                                    </>
                                    :<></>
                                }
                            </div>
                        </div>

                        <div className="profile_grid1">       
                            <div className="labels">
                                <div onClick={()=>handleRevealAllImages2()} className="expandElement">
                                    <h2>Photo Comparison (photo vs current photo){addressIdAlt}</h2>
                                    {
                                        revealAllImages2?
                                        <>^</>
                                        :<>v</>
                                    }    
                                </div>
                                {
                                    revealAllImages2?
                                    <>
                                        <div className="container2">
                                                <div className="subContainer2">
                                                    <p>Select Photo: </p>
                                                    {
                                                        addressIdAlt!=0?
                                                        <>
                                                            <img src={`http://localhost:8080/files/${addressURLAlt}`} style={{height:"300px"}}/>   
                                                        </>:
                                                        <>No image</>
                                                    }

                                                    {
                                                        allAddressImages?
                                                        <div className="rowTable">      
                                                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                                            {
                                                                allAddressImages.map((as, i)=>(
                                                                    <div key={i} className="photoFrame_Small">
                                                                            <img style={{height:"30px"}} onClick={()=>imageClick4(as.id)}src={`http://localhost:8080/files/${as.url}`}/>                                      
                                                                    </div>
                                                                ))
                                                            }
                                                            </div>
                                                            <button disabled={page===1} onClick={()=>setPage((prevState)=>prevState-1)}>
                                                                Prev
                                                            </button>
                                                            <p>{page}</p>
                                                            <button onClick={()=>setPage((prevState)=>prevState+1)}>
                                                                Next
                                                            </button>
                                                        </div>  
                                                        :<>Image List is Empty</>
                                                    }
                                                </div>
                                                
                                                <div className="subContainer2">
                                                    <p>Image: </p>
                                                    <img src={`http://localhost:8080/files/${url}`} style={{height:"300px"}}/>
                                                            
                                                    <form onSubmit={assignRoutine}>
                                                        <p>Select Routine: 
                                                            <select id="routine" name="routine">
                                                                <option><h3>Null</h3></option>
                                                                {
                                                                    allRoutines.map((r, i)=>(
                                                                        <option key={i} value={r.id}>{r.id}{r.name}</option>
                                                                    ))     
                                                                }    
                                                            </select>
                                                            <input type="submit" value="Add Routine"/>
                                                        </p>
                                                    </form>
                                                </div> 
                                            </div>
                                    </>
                                    :<></>
                                }
                                </div>  
                            </div>
            
                            <div className="profile_grid1">
                                <div className="labels">

                                <div onClick={()=>handleRevealAllImages()} className="expandElement">
                                    <h2>All A.Images</h2>
                                    {
                                        revealAllImages?
                                        <>^</>
                                        :<>v</>
                                    }    
                                </div>
                                {
                                    revealAllImages?
                                    <>
                                        <div className="rowTable">  
                                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                        <div>Page:{currentPagePhoto} of {numberOfPagePhoto}</div>
                                        <div>Range:{startNumPhoto} - {endNumPhoto}</div>
                                    </div>
                                    
                                
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

                                    {
                                    allAddressImages.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                            {
                                                allAddressImages.slice(startNumPhoto-1, endNumPhoto).map((aa, i)=>(           
                                                    <div key={i} className="photoFrame1">
                                                        <Link to={`/addresses/${aa.id}`}>
                                                            <img src={`http://localhost:8080/files/${aa.url}`} style={{height:"120px", padding: "5px"}}/>
                                                        </Link>
                                                        
                                                    </div>
                                                ))
                                            }  
                                    </div>
                                    :<>All Image List is Empty</>
                                    } 

                                <div>Page:{currentPagePhoto} of {numberOfPagePhoto}</div>
                                <div>Range:{startNumPhoto} - {endNumPhoto}</div>
                                
                                {
                                    currentPagePhoto!=1?
                                    <button onClick={()=>prevPagePhoto()}>prev</button>
                                    :<button disabled>prev</button>
                                }
                                {
                                    currentPage!=numberOfPagePhoto?
                                    <button onClick={()=>nextPagePhoto()}>next</button>
                                    :<button disabled>next</button>
                                }
                                    
                                        </div> 
                                    </>
                                    :<></>
                                }
                                </div>       
                            </div> 
                        
                        
                            <div className="profile_grid1">
                                <h2>All Routines</h2>
                                <div className="labelsPost">
                                    <div className="rowTable">
                                        {
                                        allRoutines.length!=0?
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
                                                    allRoutines.map((ar, i)=>(
                                                    <tr key={i}>
                                                        <td>{ar.id}</td>
                                                        <td><Link to={`/routines/${ar.id}`}>{ar.name}</Link></td>
                                                        <td>
                                                            <button onClick={()=>assignRoutine(ar.id)}>Assign Routine</button>
                                                        </td>
                                                    </tr>
                                                    ))
                                                }  
                                            </tbody>
                                        </table>:
                                        <p>All Routine List is Empty</p>
                                        } 
                                    </div>
                                </div>
                            </div>
                    </> 
                    :<h2>No Records</h2>
                    }
                    </>   
                }
            </div> 
        </>
    )
}
export default AddressDetail;