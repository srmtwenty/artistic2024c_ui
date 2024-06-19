import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function SwimsuitDetailList(){
    const [swimsuitDetails, setSwimsuitDetails]=useState([]);
    
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    
    const loadSwimsuitDetailList=()=>{
        axios.get("http://localhost:8080/swimsuitDetails", {headers:authHeader()})
            .then(res=>
                {
                    setSwimsuitDetails(res.data)
                    console.log(res.data)
                }
            )
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuitDetailList();
        //loadNationalTeamsPagination();
    },[])

    const deleteSwimsuitDetail=(id)=>{
        axios.delete(`http://localhost:8080/swimsuitDetails/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/swimsuitDetails")
            })
            .catch(err=>console.log(err))
    }
    
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                swimsuitDetails.length!=0?
                <>
                <h2>Swimsuit Detail List</h2>
                 <div className="rowTable">
               
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Content</th>
                                <th>People</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                swimsuitDetails.map((sd,i)=>(
                                <tr key={i}>
                                    <td><Link to={`/swimsuitDetails/${sd.id}`}>{sd.id}</Link></td>
                                    <td>{sd.name}</td>
                                    <td>
                                        {
                                            sd.swimsuitProfilePic?
                                            <>
                                                <img src={`http://localhost:8080/files/${sd.swimsuitProfilePic.url}`} style={{height:"150px"}}/>
                                            </>:
                                            <>No Profile Pic</>
                                        }  
                                    </td>
                                    <td>
                                        <ul>
                                            {
                                                sd.peopleForSwimsuit.map((p, i)=>
                                                <li key={i}><Link to={`/people/${p.id}`}>{p.name}</Link></li>
                                                )
                                            }
                                        </ul>
                                    </td>
                                    <td>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/swimsuitDetails/${sd.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteSwimsuitDetail(sd.id)}>Delete</button>
                                                </div>
                                            </div>:
                                            <></>    
                                        }
                                    </td>
                                </tr>    
                                ))
                            }
                            
                        </tbody>
                    </table>
           
                    
                    </div>
                
                </>:
                    <h2>SwimsuitDetail List is Empty</h2>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/swimsuitDetails/create">Create Swimsuit Detail</Link>
                </div>:
                <></>
            }
            </div>
            </div>
                 
        </>
    )
}
export default SwimsuitDetailList;