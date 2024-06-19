import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function CompetitionList(){
    const [competitions, setCompetitions]=useState([])
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    //const [compNationName, setCompNationName]=useState("")

    const user=AuthService.getCurrentUser();
    const loadCompetitions=()=>{
        axios.get("http://localhost:8080/competitions", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadCompetitions();
        loadCompetitionsPagination();
    },[page, field, rowsPerPage, field])

    const deleteCompetition=(id)=>{
        axios.delete(`http://localhost:8080/competitions/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/competitions")
            })
            .catch(err=>console.log(err))
    }
    const loadCompetitionsPagination=()=>{
        axios.get(`http://localhost:8080/competitions/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setCompetitions(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadCompetitionsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadCompetitionsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadCompetitionsPagination();
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                competitions.length!=0?
                <>
            <h2 style={{padding:"10px 0 10px 0"}}>Competition List</h2>
                <div className="rowTable">
                    <table>
                        <thead>
                            <tr>
                                <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                competitions.map((comp, i)=>(
                                <tr key={i}>
                                    <td><Link to={`/competitions/${comp.id}`}>{comp.id}</Link></td>
                                    <td>{comp.name}</td>
                                    <td>{comp.location},<br></br>
                                        {
                                            comp.nation?
                                            <>{comp.nation.name}</>:
                                            <>null</>
                                        }
                                    </td>
                                    <td>{
                                        comp.date?
                                        <>
                                            {comp.date.toLocaleString().split(',')[0]}
                                        </>:
                                        <>
                                            null
                                        </>
                                        }<br></br>
                                        {
                                        comp.endDate?
                                        <>
                                            {comp.endDate.toLocaleString().split(',')[0]}
                                        </>:
                                        <>null</>
                                        }
                                    </td>
                                    <td>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/competitions/${comp.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteCompetition(comp.id)}>Delete</button>
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
            <h2>Competition List is Empty</h2>
                
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/competitions/create">Create Competition</Link>
                </div>:
                <></>
            }
            </div>
            </div>
        </>
    )
}
export default CompetitionList;