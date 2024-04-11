import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

function ChoreoList(){
    const [choreos, setChoreos]=useState([])
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const loadChoreos=()=>{
        axios.get("http://localhost:8080/choreos", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setChoreos(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadChoreos();
        //loadChoreosPagination();
    },[])

    const deleteChoreo=(id)=>{
        axios.delete(`http://localhost:8080/choreos/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/choreos")
            })
            .catch(err=>console.log(err))
    }
    const loadChoreosPagination=()=>{
        axios.get(`http://localhost:8080/choreos/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setChoreos(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadArticlesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadArticlesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadArticlesPagination();
    }

    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                choreos.length!=0?
                <>
                <h2 style={title}>Choreographic List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                    <th>Content</th>
                                
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    choreos.map((ch, i)=>
                                    <tr key={i}>
                                        <td><Link to={`/choreos/${ch.id}`}>{ch.id}</Link></td>
                                        <td>{ch.name}</td>
                                        
                                        <td>
                                        {
                                            ch.profileAddress?
                                            <>
                                                <img src={`http://localhost:8080/files/${ch.profileAddress.url}`} style={{height:"200px"}}/>
                                            </>:
                                            <>No Profile Pic</>
                                        }

                                        </td>
                                        <td>
                                            {
                                                user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/choreos/${ch.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deleteChoreo(ch.id)}>Delete</button>
                                                    </div>
                                                </div>:
                                                <></>
                                            }
                                        </td>
                                    </tr>    
                                    )
                                }
                            </tbody>
                        </table>
                        
                </div>
            </>:
            
                    <h2>Choreographic List is Empty</h2>
            
            }
            {
                user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/choreos/create">Create Choreo</Link>
                </div>:
                <></>
            }
            
            
            </div>
            </div>
        </>
    )
}
export default ChoreoList;