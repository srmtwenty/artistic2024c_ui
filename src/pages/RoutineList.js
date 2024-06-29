import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';            
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function RoutineList(){
    const [routines, setRoutines]=useState([])
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const loadRoutines=()=>{
        axios.get("http://localhost:8080/routines", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
                setLoadComplete(true)
                console.log(loadComplete)
            })
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }

    useEffect(()=>{
        loadRoutines();
        loadRoutinesPagination();
    },[page, field, rowsPerPage, field])

    const deleteRoutine=(id)=>{
        axios.delete(`http://localhost:8080/routines/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/routines")
            })
            .catch(err=>console.log(err))
    }
    const loadRoutinesPagination=()=>{
        axios.get(`http://localhost:8080/routines/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setRoutines(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadRoutinesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadRoutinesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadRoutinesPagination();
    }

    return(
        <>
            
            <div className="profile_wrap2">
                <div className="profile_grid1">
                {
                loadComplete!=true?
                    <><h2>Now Loading</h2>
                    </>
                    :<>
                {
                    noData!=true?
                <>
                    <h2>Routine List</h2>
         
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                    <th>Genre</th>
                                    <th>Type</th>
                                    <th>Rank</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    routines.map((r, i)=>(
                                    <tr key={i}>
                                        <td><Link to={`/routines/${r.id}`}>{r.id}</Link></td>
                                        <td>{r.name}</td>
                                        <td>{r.genre}</td>
                                        <td>{r.type}</td>
                                        <td>{r.rank}</td>
                                        <td>{r.date.toLocaleString().split(',')[0]}</td>
                                        <td>
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/routines/${r.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deleteRoutine(r.id)}>Delete</button>
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
                            count={total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage} 
                            onRowsPerPageChange={handleChangeRowsPerPage} 
                        />
                        </Stack>
                    </div>
               
                </>:
           
                    <h2>Routine List is Empty</h2>
            }
            </>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/routines/create">Create Routine</Link>
                </div>:
                <></>
            }  
            </div>
        </div>
        </>
    )
}
export default RoutineList;