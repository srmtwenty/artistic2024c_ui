import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

function SwimsuitList(){
    const [swimsuits, setSwimsuits]=useState([])
    //const [field, setField]=useState("id");
    //const [total, setTotal]=useState(-1);
    //const [page, setPage]=useState(0);
    //const [rowsPerPage,setRowsPerPage]=useState(10);

    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const loadSwimsuits=()=>{
        axios.get("http://localhost:8080/swimsuits", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setSwimsuits(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadSwimsuits();
        //loadAddressesPagination();
    },[])

    const deleteSwimsuit=(id)=>{
        axios.delete(`http://localhost:8080/swimsuits/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/swimsuits")
            })
            .catch(err=>console.log(err))
    }
    //const loadSwimsuitPagination=()=>{
    //    axios.get(`http://localhost:8080/addresses/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
    //        .then(res=>{   
    //            setAddresses(res.data.content)
    //            //console.log(users.length)
    //            //setUsers(res.data)
    //        })
    //        .catch(err=>console.log(err))
    //}
    //const handleFieldName=(field)=>{
    //    setField(field)
    //    //loadArticlesPagination();
    //}

    //const handleChangePage=(e, newPage)=>{
    //    setPage(newPage)
    //    //loadArticlesPagination();
    //}
    //const handleChangeRowsPerPage=(e)=>{
    //    setRowsPerPage(parseInt(e.target.value, 10));
    //    setPage(0);
    //    //loadArticlesPagination();
    //}

    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                swimsuits.length!=0?
                <>
                <h2 style={title}>Swimsuit List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Content</th>
                                
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    swimsuits.map((ss, i)=>
                                    <tr key={i}>
                                        <td><Link to={`/swimsuits/${ss.id}`}>{ss.id}</Link></td>
                                        <td>{ss.name}</td>
                                        <td>
                                        <img src={`http://localhost:8080/files/${ss.name}`} style={{width:"300px"}}/>
                                        </td>
                                        <td>
                                            {
                                                user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/swimsuits/${ss.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deleteSwimsuit(ss.id)}>Delete</button>
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
            
                    <h2>Swimsuit List is Empty</h2>
            
            }
            {
                user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/swimsuits/create">Create Swimsuit</Link>
                </div>:
                <></>
            }
            
            
            </div>
            </div>
        </>
    )
}
export default SwimsuitList;