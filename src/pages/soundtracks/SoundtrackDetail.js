import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function SoundtrackDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [musics, setMusics]=useState([])
    //const [allMusics, setAllMusics]=useState([])
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const {id}=useParams();
    const loadSound=()=>{
        axios.get(`http://localhost:8080/soundtracks/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
            })
            .catch(err=>console.log(err))
    }
    /*const loadAllMusics=()=>{
        axios.get("http://localhost:8080/musics")
            .then(res=>{
                setAllMusics(res.data)
            })
            .catch(err=>console.log(err))
    }*/
    const loadMusics=()=>{
        axios.get(`http://localhost:8080/soundtracks/${id}/musics`, {headers:authHeader()})
            .then(res=>{
                
                setMusics(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadSound();
        //loadAllMusics();
        loadMusics();
    },[])

    const addMusic=(musicId)=>{
        axios.put(`http://localhost:8080/soundtracks/${id}/addMusic/${musicId}`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/soundtracks/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeMusic=(musicId)=>{
        axios.put(`http://localhost:8080/soundtracks/${id}/removeMusic/${musicId}`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/soundtracks/${id}`)
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
                            <span className="label2">Musics(ref):</span>
                            <ul className="ultest2">
                            {
                                musics.length!=0?
                                musics.map((music, i)=>
                                    <li key={i}><Link to={`/musics/${music.id}`}>{music.name}</Link></li>
                                ):
                                <>null</>
                            }
                            </ul>
                        </div>
                        <div className="row2">
                            {description}
                        </div>
                    </div>
                    <div className="buttonsWrapDetail">
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/soundtracks/create">Post</Link>  
                            </div>
                            <div style={{display:"flex"}}>
                                <div className="backToDetail">
                                    <Link className="link" to="/soundtracks">Back to List</Link> 
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/soundtracks/${id}/update`}>Update</Link> 
                                </div>
                                
                            </div>
                            </>
                            :<>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/soundtracks">Back to List</Link> 
                                    </div>
                                </div>
                            </>
                        }
                        
                    </div>    
                </div>
                </> 
                :<h2>No Records</h2>
                }
            </div>
        </>
    )
}
export default SoundtrackDetail;