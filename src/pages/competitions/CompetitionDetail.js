import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';

function CompetitionDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [location, setLocation]=useState("")
    const [date, setDate]=useState(new Date());
    const [endDate, setEndDate]=useState(new Date());
    const [nation, setNation]=useState(1);
    const [allNations, setAllNations]=useState([])

    const user=AuthService.getCurrentUser();
    const {id}=useParams()
    const navigate=useNavigate();
    const loadCompetition=()=>{
        axios.get(`http://localhost:8080/competitions/${id}`, {headers:authHeader()})
            .then(res=>{
                setName(res.data.name)
                setDescription(res.data.description)
                setLocation(res.data.location)
                setDate(res.data.date)
                setEndDate(res.data.endDate)
                setNation(res.data.nation)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
            })
    }
    useEffect(()=>{
        loadCompetition();
        loadAllNations();
    },[])

    const assignNation=(nationId)=>{
        axios.put(`http://localhost:8080/competitions/${id}/assignNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/competitions/${id}`)
            })
    }
    const removeNation=(nationId)=>{
        axios.put(`http://localhost:8080/competitions/${id}/removeNation/${nationId}`, {},{headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate(`/competitions/${id}`)
            })
    }

    return(
        <>
            <div className="profile_wrap2">
            {name!=""?
                <>
                <div className="profile_grid1">
                    <h2>Competition: <strong>{name}</strong></h2>
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
                            <span className="label">Location: </span>
                            <span className="value">{location}</span>
                        </div>
                        <div className="row2">
                            <span className="label">Nation: </span>
                            <span className="value">
                            {
                                nation?
                                <><Link to={`/nations/${nation.id}`}>{nation.name}</Link>
                                {
                                    user.roles.includes("ROLE_ADMIN")?
                                    <button className="marginLeft" onClick={()=>removeNation(nation.id)}>x</button>
                                    :<></>
                                }
                                </>:
                                <>null</>
                            }    
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label">Date: </span>
                            <span className="value">
                                {date!=null?
                                <>{date.toLocaleString().split(',')[0]}</>
                                :<></>}
                            </span>
                        </div>
                        <div className="row2">
                            <span className="label">End Date: </span>
                            <span className="value">
                                {endDate!=null?
                                <>{endDate.toLocaleString().split(',')[0]}</>
                                :<></>}
                            </span>
                        </div>
                        <div className="row2">
                            <p>{description}</p> 
                        </div>  
                    </div>
                </div>
                <div className="buttonsWrapDetail">
                    {
                        user.roles.includes("ROLE_ADMIN")?
                        <>
                        <div className="postDetail">
                            <Link className="link" to="/competitions/create">Post Competition</Link>
                        </div>
                        <div>
                            <div className="backToDetail">
                                <Link className="link" to={`/competitions/${id}/update`}>Update</Link>
                            </div>
                            <div className="backToDetail">
                                <Link className="link" to="/competitions">Back to List</Link>  
                            </div>
                        </div>           
                        </>:
                        <>
                            <div>
                                <div className="backToDetail">
                                    <Link className="link" to="/competitions">Back to List</Link>  
                                </div>
                            </div>
                        </>
                    }   
                </div>
                

                {
                    user.roles.includes("ROLE_ADMIN")?
                    <div className="profile_grid1">
                    <h2>All Nations</h2>
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
                                        allNations.map((nation, i)=>(
                                        <tr key={i}>
                                            <td>{nation.id}</td>
                                            <td><Link to={`/nations/${nation.id}`}>{nation.name}</Link></td>
                                            <td>
                                                    
                                                    <button onClick={()=>assignNation(nation.id)}>Assign Nation</button>
                                                   
                                            </td>
                                        </tr>    
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>:
                <></>

                }
                
                </> 
                :<h2>No Records</h2>
                }
            </div>       
        </>
    )
}
export default CompetitionDetail;