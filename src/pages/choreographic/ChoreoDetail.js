import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ChoreoDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [skills, setSkills]=useState("")
    const [nation, setNation]=useState(0);
    const [people, setPeople]=useState([])
    const [musics, setMusics]=useState([])
    const [allMusics, setAllMusics]=useState([])
    const [allPeople, setAllPeople]=useState([])
    const [allNations, setAllNations]=useState([])
    const [routines, setRoutines]=useState([])
    const [addresses, setAddresses]=useState([])
    const [swimsuits, setSwimsuits]=useState([])
    const [allSwimsuits, setAllSwimsuits]=useState([])

    const [addressId, setAddressId]=useState(0)
    const [addressURL, setAddressURL]=useState("");
    const [profileAddress, setProfileAddress]=useState(0);
    const [allAddresses, setAllAddresses]=useState([])
    const [postPerPage, setPostPerPage]=useState(20)
    const [currentPage, setCurrentPage]=useState(1)
    const [currentPageUpdated, setCurrentPageUpdated]=useState(false);
    
    const [startNum, setStartNum]=useState(1)
    const [endNum, setEndNum]=useState(postPerPage);
    const [numberOfPage, setNumberOfPage]=useState(Math.ceil(allSwimsuits.length/postPerPage))
    const [allAddressesPartial, setAllAddressesPartial]=useState(allSwimsuits.slice(startNum, 1+endNum))
    
    const [postPerPagePhoto, setPostPerPagePhoto]=useState(50)
    const [currentPagePhoto, setCurrentPagePhoto]=useState(1)
    const [currentPageUpdatedPhoto, setCurrentPageUpdatedPhoto]=useState(false);
    
    const [startNumPhoto, setStartNumPhoto]=useState(1)
    const [endNumPhoto, setEndNumPhoto]=useState(postPerPagePhoto);
    const [numberOfPagePhoto, setNumberOfPagePhoto]=useState(Math.ceil(allAddresses.length/postPerPagePhoto))

    const [currentNumInput, setCurrentNumInput]=useState(-1);

    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const [idPrev, setIdPrev]=useState(parseInt(id)-1);
    const [idNext, setIdNext]=useState(parseInt(id)+1);


    const navigate=useNavigate();
    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const loadChoreo=()=>{
        axios.get(`http://localhost:8080/choreos/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setSkills(res.data.skills)
                setNation(res.data.nation)
                setMusics(res.data.musics)
                setProfileAddress(res.data.profileAddress)
                console.log(res.data)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }
    const loadAllMusics=()=>{
        axios.get("http://localhost:8080/musics", {headers:authHeader()})
            .then(res=>
                setAllMusics(res.data)
            )
            .catch(err=>console.log(err))
    }
    const loadSwimsuits=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/swimsuits`, {headers:authHeader()})
        .then(res=>{
            setSwimsuits(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    const loadAllSwimsuits=()=>{
        axios.get(`http://localhost:8080/swimsuitDetails`, {headers:authHeader()})
        .then(res=>{
            setAllSwimsuits(res.data)
            setNumberOfPage(Math.ceil(allSwimsuits.length/postPerPage))
            console.log(allSwimsuits.slice(startNum, endNum))
            console.log(res.data)
            //console.log(allAddressesPartial)
        })
        .catch(err=>console.log(err))
    }

    const loadPeople=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/people`, {headers:authHeader()})
        .then(res=>{
            setPeople(res.data)
            console.log(res.data)
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
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadRoutines=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/routines`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllAddresses=()=>{
        axios.get("http://localhost:8080/addresses", {headers:authHeader()})
            .then(res=>{
                setAllAddresses(res.data)
                setNumberOfPagePhoto(Math.ceil(allAddresses.length/postPerPagePhoto))
            })
            .catch(err=>console.log(err))
    }
    const loadAddresses=()=>{
        axios.get(`http://localhost:8080/choreos/${id}/addresses`)
            .then(res=>{
                setAddresses(res.data);
                console.log(res.data);
            })
            .catch(err=>console.log(err));
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
    //const pageRange=()=>{
    //    allSwimsuits.length/
    //}
    const loadAddress=(addressId)=>{
        axios.get(`http://localhost:8080/addresses/${addressId}`, {headers:authHeader()})
            .then(res=>{
                //setAddress(res.data)
                setAddressURL(res.data.url)

            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadChoreo();
        loadPeople();
        loadAllMusics();
        loadAllPeople();
        loadAllNations();
        loadRoutines();
        loadAddresses();
        loadAllAddresses();
        loadSwimsuits();
        loadAllSwimsuits();
        loadAddress(addressId)
    },[allSwimsuits.length, numberOfPage, startNum, endNum, currentPage,
        allAddresses.length, numberOfPagePhoto, startNumPhoto, endNumPhoto, currentPagePhoto,
        idPrev, idNext, currentNumInput, addressId])

    const addPerson=(personId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addPerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been added!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removePerson=(personId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removePerson/${personId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Person has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/setNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Nation has been assigned!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const addAddress=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addAddress/${addressId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Address has been added!")
                //window.location.reload();
                //navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeAddress=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeAddress/${addressId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Address has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignAddressProfile=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addAddressProfilePic/${addressId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Address profile has been assigned!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const removeAddressProfile=(addressId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeAddressProfilePic/${addressId}`, {},{headers:authHeader()})
            .then(res=>{
                console.log("Address profile has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`);
            })
            .catch(err=>console.log(err))
    }
    const addSwimsuit=(swimsuitId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addSwimsuit/${swimsuitId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit has been added!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSwimsuit=(swimsuitId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeSwimsuit/${swimsuitId}`,{}, {headers:authHeader()})
            .then(res=>{
                console.log("Swimsuit has been removed!")
                window.location.reload();
                navigate(`/choreos/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addMusic=(musicId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/addMusic/${musicId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/choreos/${id}`)}    
            )
            .catch(err=>console.log(err))
    }
    const removeMusic=(musicId)=>{
        axios.put(`http://localhost:8080/choreos/${id}/removeMusic/${musicId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/choreos/${id}`)}    
            )
            .catch(err=>console.log(err))
    }

    const prevPage=(e)=>{
        e.preventDefault();
        //setIdPrev(parseInt(idPrev)-1)
        //window.location.reload();
        navigate(`/choreos/${idPrev}`)
        window.location.reload();
    }
    const nextPage=(e)=>{
        e.preventDefault();
        //setIdNext(parseInt(idNext)+1)
        navigate(`/choreos/${idNext}`)
        window.location.reload();
        //window.location.reload();
    }

    const changeCurrentPage=(e)=>{
        e.preventDefault();
        setCurrentPagePhoto(currentNumInput);
        setStartNumPhoto(((currentNumInput-1)*postPerPagePhoto)+1)
        setEndNumPhoto(currentNumInput*postPerPagePhoto)
    }

    const btnFunc1=()=>{
        console.log("1!")
        document.getElementById("btn1").classList.remove("btnDeactivated");
        document.getElementById("btn2").classList.add("btnDeactivated");
    }
    
    const btnFunc2=()=>{
        console.log("2!")
        document.getElementById("btn2").classList.remove("btnDeactivated");
        document.getElementById("btn1").classList.add("btnDeactivated");
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
                        <h2>{name} (Id: {id})</h2>   
                        <div className="labels">

                        <div className="create-your-own-wrapper">
                            <div style={{flex:"1"}}>
                                <div className="row2FlexChildPortrait">
                                    <span className="value">
                                        {
                                            addressId!=0?
                                            <div style={{border:"1px solid", padding:"5px"}}>
                                                <img src={`http://localhost:8080/files/${addressURL}`} style={{maxWidth:"500px",minWidth:"400px"}}/>
                                            </div>:
                                            <>
                                            {
                                                profileAddress!=null?
                                                <><img src={`http://localhost:8080/files/${profileAddress.url}`} style={{width:"400px"}}/>
                                                    {
                                                        user && user.roles.includes("ROLE_ADMIN")?
                                                        <button className="marginLeft" onClick={()=>removeAddressProfile(profileAddress.id)}>x</button>
                                                        :<></>
                                                    }
                                                </>:
                                                <>Null</>
                                            }
                                            </>
                                        }
                                    </span>
                                </div>

                                <div className="row2FlexChildAlt">
                                {
                                    addresses.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {
                                        addresses.map((a, i)=>(    
                                           
                                            <div key={i} className="photoFrame_Small">
                                                <div>
                                                    <img src={`http://localhost:8080/files/${a.url}`} style={{height:"45px", padding: "5px", margin:"auto", display:"block"}}
                                                        onClick={()=>imageClick(a.id)}
                                                    />
                                                    
                                                </div>
                                                <div style={{display:"flex"}}>
                                                    <Link style={{border:"1px solid", display:"block", margin:"center",padding:"5px", backgroundColor:"rgba(240, 240, 240)"}} to={`/images/${a.url}`}>Link</Link>
                                                    <button onClick={()=>removeAddress(a.id)}>x</button>
                                                </div>
                                            </div>
                                                
                                                  
                                            
                                        ))
                                    }  
                                    </div>
                                    :<>Image List is Empty</>
                                } 
                                </div>
                            </div>

                            <div style={{flex:"1", backgroundColor:"white"}}>
                                <div className="row2FlexChild">
                                    <span className="label">Nation: </span>
                                    {
                                        nation?
                                        <span className="value">    
                                            {nation.name}
                                        </span>:
                                        <></>
                                    }
                                </div>
                                
                                <div className="row2FlexChild">
                                    <span className="label">Routines:</span>
                                    <ul className="ultest2">
                                        {   
                                            routines.length!=0?
                                            routines.map((rou, i)=>(
                                                <li key={i}>
                                                    <Link to={`/routines/${rou.id}`}>
                                                        {rou.name}
                                                    </Link>
                                                </li>
                                            )):
                                            <>Null</>
                                        }
                                    </ul>
                                </div>


                                <div className="row2FlexChild">
                                    <span className="label">Athletes:</span>
                                        <ul className="ultest2">
                                        {   
                                            people?
                                            people.map((p, i)=>(

                                                <li key={i}>
                                                    {/*
                                                        <img src={`http://localhost:8080/files/${p.profilePicAlt}`} style={{height:"50px"}}/>
                                                    */}
                                                    
                                                    <Link to={`/people/${p.id}`}>{p.name}</Link>
                                                    {
                                                        user && user.roles.includes("ROLE_ADMIN")?
                                                        <button className="marginLeft" onClick={()=>removePerson(p.id)}>x</button>
                                                        :<></>
                                                    } 
                                                </li>
                                            ))
                                            :<>null</>
                                        }</ul>
                                </div>

                                <div className="row2FlexChild">
                                    <span className="label">Music List:</span>
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
                                
                                

                                <div className="row2FlexChild">
                                    <span className="label2">Swimsuits:</span>
                                </div> 
                                <div className="row2FlexChild">   
                                    
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                    {   
                                        swimsuits?
                                        swimsuits.map((s, i)=>(
                                            <div key={i} style={{display:"block", padding:"2px", border:"1px solid"}}>
                                                <Link to={`/swimsuitDetails/${s.id}`}>
                                                    <img src={`http://localhost:8080/files/${s.swimsuitProfilePic.url}`} style={{height:"150px"}}/>
                                                </Link>
                                            </div>
                                        )):
                                        <>null</>
                                    }</div>
                                </div>

                                <div className="row2FlexChild">
                                    <span className="value">{description}</span>
                                </div>
                            </div>
                        </div>                

                        
                    
                        {/*}
                        <div className="row2">
                            <span className="label2">A.Photos:</span>  
                        </div>
                        <div className="row2">
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                                {   
                                    addresses.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                        {
                                            addresses.map((ad, i)=>(
                                            <div key={i} style={{display:"block", padding:"2px", border:"1px solid"}}>
                                                <Link to={`/addresses/${ad.id}`}>
                                                    <img src={`http://localhost:8080/files/${ad.url}`} style={{height:"150px"}}/>
                                                </Link>
                                            </div>
                                            ))
                                        }  
                                    </div>
                                    :<>Null</>
                                }
                            </div>
                        </div>
                        */}
                                    
                        
                    </div>

                    </div>
                    <div className="buttonsWrapDetail">
                            {
                                user && user.roles.includes("ROLE_ADMIN")?
                                <>
                                    <div className="postDetail">
                                        <Link className="link" to="/choreos/create">Post Choreo</Link>
                                    </div>
                                    <div className="pagination_center">
                                        <button onClick={prevPage}>Prev ({idPrev})</button>
                                        <button onClick={nextPage}>Next ({idNext})</button>
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className="backToDetail">
                                            <Link className="link" to="/choreos">Back to List</Link>  
                                        </div>
                                        <div className="backToDetail">
                                            <Link className="link" to={`/choreos/${id}/update`}>Update</Link>
                                        </div>
                                        
                                    </div>
                                </>:
                                <>
                                    <div className="pagination_center">
                                        <button onClick={prevPage}>Prev ({idPrev})</button>
                                        <button onClick={nextPage}>Next ({idNext})</button>
                                    </div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/choreos">Back to List</Link>  
                                    </div>
                                </>
                            }
                        </div>

                        <div className="profile_grid1">
                            <h2>All Swimsuits</h2>
                            <div className="rowTable">
                            
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
                                                <div>
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
                            <div className="labels">
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
                                        allPeople.map((ap, i)=>(
                                        <tr key={i}>
                                            <td>{ap.id}</td>
                                            <td><Link to={`/people/${ap.id}`}>{ap.name}</Link></td>
                                            <td>
                                                <button onClick={()=>addPerson(ap.id)}>Add Person</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                    </tbody>
                                </table>:
                                <p>All People List is Empty</p>
                                } 
                                </div>
                            </div>
                        </div> 
                    
                        <div className="profile_grid1">
                            <h2>All Photos</h2>
                            <div className="labels">
                                <div className="rowTable">
                                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                    <div>Page:
                                        <form onSubmit={changeCurrentPage}>
                                            <div>
                                                <input type="number" style={{width:"3em"}} onChange={(e)=>setCurrentNumInput(e.target.value)} placeholder={currentPagePhoto}/>
                                                <input type="submit" id="submitbtn"/>
                                            </div>
                                        </form>
                                        of {numberOfPagePhoto}</div>
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
                                    allAddresses.length!=0?
                                    <div style={{display:"flex", flexWrap:"wrap"}}>
                                            {
                                                allAddresses.slice(startNumPhoto-1, endNumPhoto).map((aa, i)=>(           
                                                    <div key={i} className="photoFrame1">
                                                        <Link to={`/addresses/${aa.id}`}>
                                                            <img src={`http://localhost:8080/files/${aa.url}`} style={{height:"120px", padding: "5px"}}/>
                                                        </Link>
                                                        <div style={{display:"flex"}}>
                                                            <button onClick={()=>addAddress(aa.id)}>Add Image</button>
                                                            <button onClick={()=>assignAddressProfile(aa.id)}>Add C.Profile</button>
                                                        </div>
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
                                    currentPagePhoto!=numberOfPagePhoto?
                                    <button onClick={()=>nextPagePhoto()}>next</button>
                                    :<button disabled>next</button>
                                }
                                </div>
                            </div>
                        </div> 

                    <div>     
                    <button id="btn1" className="activeBtn" onClick={()=>btnFunc1()}>Active admins</button>
                    <button id="btn2" className="deactiveBtn btnDeactivated" onClick={()=>btnFunc2()}>Deactivated admins</button>
                    </div>



                    <div className="profile_grid1">
                        <h2>All Nations</h2>
                            <div className="labels">
                                <div className="rowTable">
                                {
                                allNations.length!=0?
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
                                            allNations.map((an, i)=>(
                                            <tr key={i}>
                                                <td>{an.id}</td>
                                                <td><Link to={`/nations/${an.id}`}>{an.name}</Link></td>
                                            
                                                <td>
                                                    <button onClick={()=>assignNation(an.id)}>Assign Nation</button>
                                                </td>
                                            </tr>
                                            ))
                                        }  
                                    </tbody>
                                </table>:
                                <p>All People List is Empty</p>
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
export default ChoreoDetail;