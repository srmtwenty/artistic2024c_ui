import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ComposerDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [musics, setMusics]=useState([])
    //const [allMusics, setAllMusics]=useState([])
    const user=AuthService.getCurrentUser();
    const {id}=useParams();
    const navigate=useNavigate();
    const loadComposer=()=>{
        axios.get(`http://localhost:8080/composers/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setMusics(res.data.musics)
                console.log(res.data);
            })
            .catch(err=>console.log(err))
    }
/*
    const loadAllMusics=()=>{
        axios.get("http://localhost:8080/musics")
            .then(res=>{
                setAllMusics(res.data)
            })
            .catch(err=>console.log(err))
    }
*/

    const loadMusicsForComposer=()=>{
        axios.get(`http://localhost:8080/composers/${id}/musics`, {headers:authHeader()})
            .then(res=>{
                setMusics(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadComposer()
        //loadAllMusics()
        loadMusicsForComposer()
    }, [])

    const assignMusic=(musicId)=>{
        axios.put(`http://localhost:8080/composers/${id}/assignMusic/${musicId}`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/composers")
            })
            .catch(err=>console.log(err))
    }
    const removeMusic=(musicId)=>{
        axios.put(`http://localhost:8080/composers/${id}/removeMusic/${musicId}`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/composers")
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
                            <p>{description}</p> 
                        </div> 
                    </div>
                    
                    <div className="buttonsWrapDetail">
                        {
                            user && user.roles.includes("ROLE_ADMIN")?
                            <>
                            <div className="postDetail">
                                <Link className="link" to="/composers/create">Post</Link>
                            </div>
                            <div style={{display:"flex"}}> 
                                <div className="backToDetail">
                                    <Link className="link" to="/composers">Back to List</Link> 
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/composers/${id}/update`}>Update</Link>
                                </div>
                            </div>
                            </>:
                            <>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/composers">Back to List</Link> 
                                </div>
                            </div>
                            </>
                        }
                        
                    </div>
                </div>
                
                <div className="profile_grid1">
                        <h2>All Musics for composer</h2>
                        <div className="labelsPost">
                            <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        musics.map((m)=>(
                                        <tr>
                                            <td><Link to={`/musics/${m.id}`}>{m.id}</Link></td>
                                            <td><Link to={`/musics/${m.id}`}>{m.name}</Link></td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                </div>
                </> 
                :<h2>No Records</h2>
                }
            </div>    
        </>
    )
}
export default ComposerDetail;