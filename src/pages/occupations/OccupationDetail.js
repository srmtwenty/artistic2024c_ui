import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function OccupationDetail(){
    const [name, setName]=useState("");

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const loadOccupation=()=>{
        axios.get(`http://localhost:8080/occupations/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
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
    useEffect(()=>{
        loadOccupation();
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
                            <h2>Occupation: <strong>{name}</strong></h2>
                            <div className="labels">
                                <div className="row2">
                                    <span className="label">Id: </span>
                                    <span className="value">{id}</span>
                                </div>
                                <div className="row2">
                                    <span className="label">Name: </span>
                                    <span className="value">{name}</span>
                                </div>
                            </div>
                            <div className="buttonsWrapDetail">
                                {
                                    user && user.roles.includes("ROLE_ADMIN")?
                                    <>
                                    <div className="postDetail">
                                        <Link className="link" to="/occupations/create">Post</Link>  
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <div className="backToDetail">
                                            <Link className="link" to="/occupations">Back to List</Link>
                                        </div>
                                        <div className="backToDetail">
                                            <Link className="link" to={`/occupations/${id}/update`}>Update</Link> 
                                        </div>
                                        
                                    </div>    
                                    </>:
                                    <>
                                        <div className="backToDetail">
                                            <Link className="link" to="/occupations">Back to List</Link>
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
export default OccupationDetail;