import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function MusicDetail(){
    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [address, setAddress]=useState("");
    const [composers, setComposers]=useState([]);
    const [artists, setArtists]=useState([]);
    const [soundtrack, setSoundtrack]=useState(1)
    const [musicLinks, setMusicLinks]=useState([])
    const [mName, setMName]=useState("")
    const [allArtists, setAllArtists]=useState([])
    const [allComposers, setAllComposers]=useState([])
    const [allSoundtracks, setAllSoundtracks]=useState([])
    const [routines, setRoutines]=useState([])

    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const {id}=useParams();
    const loadMusic=()=>{
        axios.get(`http://localhost:8080/musics/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setComposers(res.data.composers)
                setArtists(res.data.artists)
                setSoundtrack(res.data.soundtrack)
                setAddress(res.data.address)
            })
            .catch(err=>console.log(err))
    }

    const loadAllArtists=()=>{
        axios.get("http://localhost:8080/artists", {headers:authHeader()})
            .then(res=>{
                setAllArtists(res.data)
            })
            .catch(err=>console.log(err))
    }
    
    const loadAllSoundtracks=()=>{
        axios.get("http://localhost:8080/soundtracks", {headers:authHeader()})
        .then(res=>{
            setAllSoundtracks(res.data)
        })
        .catch(err=>console.log(err))
    
    }
    const loadSNSForMusic=()=>{
        axios.get(`http://localhost:8080/musics/${id}/snss`, {headers:authHeader()})
            .then(res=>{
                //console.log(res.data)
                setMusicLinks(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadRoutines=()=>{
        axios.get(`http://localhost:8080/musics/${id}/routines`,  {headers:authHeader()})
            .then(res=>{
                setRoutines(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadMusic()
        loadAllArtists()
        loadAllSoundtracks()
        loadSNSForMusic()
        loadRoutines()
    },[])

    const addArtist=(artistId)=>{
        axios.put(`http://localhost:8080/musics/${id}/addArtist/${artistId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeArtist=(artistId)=>{
        axios.put(`http://localhost:8080/musics/${id}/removeArtist/${artistId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addComposer=(composerId)=>{
        axios.put(`http://localhost:8080/musics/${id}/addComposer/${composerId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeComposer=(composerId)=>{
        axios.put(`http://localhost:8080/musics/${id}/removeComposer/${composerId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const assignSoundtrack=(soundtrackId)=>{
        axios.put(`http://localhost:8080/musics/${id}/assignSoundtrack/${soundtrackId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
                console.log(soundtrackId)
            })
            .catch(err=>console.log(err))
    }
    const removeSoundtrack=(soundtrackId)=>{
        axios.put(`http://localhost:8080/musics/${id}/removeSoundtrack/${soundtrackId}`,{}, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
                console.log(soundtrackId)
            })
            .catch(err=>console.log(err))
    }
    const addSNS=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/musics/${id}/addSNS`,{
            name:mName
        }, {headers:authHeader()})
            .then(res=>{
                setMName("")
                window.location.reload();
                navigate(`/musics/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeSNS=(snsId)=>{
        axios.put(`http://localhost:8080/musics/${id}/removeSNS/${snsId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/musics/${id}`)
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
                            <span className="label">Soundtrack: </span>
                            <span className="value">
                            {
                                soundtrack?
                                <Link to={`/soundtracks/${soundtrack.id}`}>{soundtrack.name}
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeSoundtrack(soundtrack.id)}>x</button>:
                                        <></>
                                    }
                                    
                                </Link>:
                                <>Null</>
                            }    
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label2">Composers:</span>
                            <ul className="ultest2">
                            {
                                composers.map((composer, i)=>(
                                    <li key={i}><Link to={`/artists/${composer.id}`}>{composer.name}</Link>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeComposer(composer.id)}>x</button>:
                                        <></>
                                    }
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            <span className="label2">Artists:</span>
                            <ul className="ultest2">
                            {
                                artists.map((artist, i)=>(
                                    <li key={i}><Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeArtist(artist.id)}>x</button>
                                        :<></>
                                    }
                                    </li>
                                ))
                            }
                            </ul>
                        </div>



                        <div className="row2">
                            <span className="label2">Routines:</span>
                            <ul className="ultest2">
                            {
                                routines.map((routine, i)=>(
                                    <li key={i}>
                                        <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
                                    
                                    </li>
                                ))
                            }
                            </ul>
                        </div>


                        <div className="row2">
                            <span className="label2">Links:</span>
                            <ul className="ultest2">
                            {   
                                musicLinks.length!=0?
                                musicLinks.map((ml, i)=>(
                                    <li key={i}><a href={ml.name}>{ml.name}</a>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <button className="marginLeft" onClick={()=>removeSNS(ml.id)}>x</button>
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
                                        <input type="text" placeholder="Enter Music Link" style={{width: "10em"}} onChange={(e)=>setMName(e.target.value)}/>
                                        <input type="submit" id="submitbtn"/>
                                    </div>
                                </form>:
                                <></>
                            }
                            
                            </ul>   
                        </div>
                        
                        <div className="row2">
                            <p>{description}</p> 
                        </div> 
                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/musics/create">Post</Link>  
                            </div>
                            <div style={{display:"flex"}}>
                                <div className="backToDetail">
                                    <Link className="link" to="/musics">Back to List</Link>  
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/musics/${id}/update`}>Update</Link> 
                                </div>
                                
                            </div>
                            </>:
                            <>
                                <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/musics">Back to List</Link>  
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
                    <h2>All Artists</h2>
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
                                        allArtists.map((a, i)=>(
                                        <tr key={i}>
                                            <td>{a.id}</td>
                                            <td><Link to={`/artists/${a.id}`}>{a.name}</Link></td>
                                            <td>
                                                <button onClick={()=>addArtist(a.id)}>Add Artist</button>
                                                |
                                                <button onClick={()=>addComposer(a.id)}>Add Composer</button>
                                                
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
                        <h2>All Soundtracks</h2>
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
                                        allSoundtracks.map((s, i)=>(
                                        <tr key={i}>
                                            <td>{s.id}</td>
                                            <td>{s.name}</td>
                                            <td>
                                                <button onClick={()=>assignSoundtrack(s.id)}>Assign Soundtrack</button>
                                            </td>
                                        </tr>
                                        ))
                                    }  
                                </tbody>
                            </table>
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
export default MusicDetail;