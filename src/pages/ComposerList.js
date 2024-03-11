import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ComposerList(){
    const [composers, setComposers]=useState([])
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(0);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const loadComposers=()=>{
        axios.get("http://localhost:8080/composers", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadComposers();
        loadComposersPagination();
    },[page, field, rowsPerPage, field])
    
    const deleteComposer=(id)=>{
        axios.delete(`http://localhost:8080/composers/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/composers")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadComposersPagination=()=>{
        axios.get(`http://localhost:8080/composers/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setComposers(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadComposersPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadComposersPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadComposersPagination();
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                composers.length!=0?
                <>
                <h2>Composer List</h2>
              
                <div className="rowTable">
                <table>
                    <thead>
                        <tr>
                            <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                            <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            composers.map((com)=>(
                            <tr>
                                <td><Link to={`/composers/${com.id}`}>{com.id}</Link></td>
                                <td>{com.name}</td>
        
                                <td>
                                    {
                                        user.roles.includes("ROLE_ADMIN")?
                                        <div className="tdButtonWrapper">
                                            <div className="tdButtonContainer1">
                                                <Link className="link" to={`/composers/${com.id}/update`}>Edit</Link>    
                                            </div>
                                            <div className="tdButtonContainer2">
                                                <button onClick={()=>deleteComposer(com.id)}>Delete</button>
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
                <Stack alignItems="left">
                <TablePagination 
                    rowsPerPageOptions={[10, 25, 50]} 
                    component="div"
                    count={total.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage} 
                    onRowsPerPageChange={handleChangeRowsPerPage} 
                />
                </Stack>
                </div>
            </>:
            <h2>Composer List is Empty</h2>
            }
            {
                user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/composers/create">Create Composer</Link>
                </div>:
                <></>
            }
            
            </div>
            </div>
        </>
    )
}
export default ComposerList;