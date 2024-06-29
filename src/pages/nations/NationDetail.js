import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function NationDetail(){
    const [name, setName]=useState("")
    const [people, setPeople]=useState([])
    
    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    
    const {id}=useParams();
    const user=AuthService.getCurrentUser();
    const navigate=useNavigate();
    const loadNation=()=>{
        axios.get(`http://localhost:8080/nations/${id}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setName(res.data.name)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }
    const loadPeopleForNation=()=>{
        axios.get(`http://localhost:8080/nations/${id}/people`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setPeople(res.data)

            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadNation()
        loadPeopleForNation()
    }, [])

    return(
        <>
            <div className="profile_wrap2">
            {
                    loadComplete!=true?
                    <><h2>Now Loading</h2>
                    </>
                    :<>
                    {noData!=true?
                <>
                <div className="profile_grid1">
                    <h2>Nation: <strong>{name}</strong></h2>
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
                                <Link className="link" to="/nations/create">Post</Link>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="backToDetail">
                                    <Link className="link" to="/nations">Back to List</Link>  
                                </div>
                                <div className="backToDetail">
                                    <Link className="link" to={`/nations/${id}/update`}>Update</Link>
                                </div>
                                
                            </div>    
                            </>:
                            <>
                                <div>
                                    <div className="backToDetail">
                                        <Link className="link" to="/nations">Back to List</Link>  
                                    </div>
                                </div>
                            </>
                        }
                        
                        
                    </div>
                </div>

                <div className="profile_grid1">
                    <h2>People For Nation(ref)</h2>
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
                                        people.map((p, i)=>(
                                        <tr key={i}>
                                            <td>{p.id}</td>
                                            <td><Link to={`/people/${p.id}`}>{p.name}</Link></td>
                                            
                                        </tr>
                                        ))}  
                                </tbody>
                            </table>
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
export default NationDetail;