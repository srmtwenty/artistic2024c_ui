import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function ImageDetail(){
    const [url, setUrl]=useState("")

    const [name, setName]=useState("")

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();

    const loadImage=()=>{
        axios.get(`http://localhost:8080/files/${id}`, {headers:authHeader()})
            .then(res=>
                    {
                        console.log(res.data)
                        setName(res.data.name)
                        setUrl(res.data.url)
                        setLoadComplete(true)
                        console.log(loadComplete)
                    }
                )
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
                setLoadComplete(true)
                console.log(loadComplete)
            })
    }
    useEffect(()=>{
        loadImage();
    },[])

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
                        <h2>Image: <strong>{name}</strong></h2>
                        <div className="labels">
                            <div className="row2">
                                <span className="label">Id: </span>
                                <span className="value">{id}</span>
                            </div>
                            <div className="row2">
                                <span className="label">URL: </span>
                                <span className="value">{url}</span>
                            </div>
                            <div className="row2">
                                <img src={`http://localhost:8080/files/${id}`} style={{width:"700px"}}/>
                            </div>
                        </div>
                        <div className="buttonsWrapDetail">
                            {
                                user && user.roles.includes("ROLE_ADMIN")?
                                <>
                                <div className="postDetail">
                                    <Link className="link" to="/images/create">Post</Link>  
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className="backToDetail">
                                        <Link className="link" to="/images">Back to List</Link>
                                    </div>
                                    
                                    
                                </div>    
                                </>:
                                <>
                                    <div className="backToDetail">
                                        <Link className="link" to="/images">Back to List</Link>
                                    </div>
                                </>

                            }
                            
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
export default ImageDetail;