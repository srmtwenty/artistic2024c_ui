import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function BroadcastList(){
    const [broadcasts, setBroadcasts]=useState([])
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const loadBroadcasts=()=>{
        axios.get("http://localhost:8080/broadcasts", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setTotal(res.data.length)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadBroadcasts();
        loadBroadcastsPagination();
    },[page, field, rowsPerPage, field])

    const deleteBroadcast=(id)=>{
        axios.delete(`http://localhost:8080/broadcasts/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/broadcasts")
            })
            .catch(err=>console.log(err))
    }
    const loadBroadcastsPagination=()=>{
        axios.get(`http://localhost:8080/broadcasts/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setBroadcasts(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadBroadcastsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadBroadcastsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadBroadcastsPagination();
    }

    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                broadcasts.length!=0?
                <>
                <h2 style={title}>Broadcast List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                 
                                    <th>Date</th>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    broadcasts.map((broadcast, i)=>
                                    <tr key={i}>
                                        <td><Link to={`/broadcasts/${broadcast.id}`}>{broadcast.id}</Link></td>
                                        <td>{broadcast.name}</td>
                                        <td>{broadcast.date}</td>     
                                        <td>
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/broadcasts/${broadcast.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deleteBroadcast(broadcast.id)}>Delete</button>
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
                        <Stack alignItems="left">
                        <TablePagination 
                            rowsPerPageOptions={[10, 25, 50]} 
                            component="div"
                            count={total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage} 
                            onRowsPerPageChange={handleChangeRowsPerPage} 
                        />
                        </Stack>
                </div>
            </>:
                    <h2>Broadcast List is Empty</h2>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/broadcasts/create">Create Broadcast</Link>
                </div>:
                <></>
            }
            </div>
            </div>
        </>
    )
}
export default BroadcastList;