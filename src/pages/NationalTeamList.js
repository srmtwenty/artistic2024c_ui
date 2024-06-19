import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function NationalTeamList(){
    const [nationalTeams, setNationalTeams]=useState([]);
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const loadNationalTeamList=()=>{
        axios.get("http://localhost:8080/nationalTeams", {headers:authHeader()})
            .then(res=>
                {
                    setTotal(res.data.length)
                }
            )
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadNationalTeamList();
        loadNationalTeamsPagination();
    },[page, field, rowsPerPage, field])

    const deleteNationalTeam=(id)=>{
        axios.delete(`http://localhost:8080/nationalTeams/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/nationalTeams")
            }
                
            )
            .catch(err=>console.log(err))
    }
    const loadNationalTeamsPagination=()=>{
        axios.get(`http://localhost:8080/nationalTeams/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setNationalTeams(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadNationalTeamsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadNationalTeamsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadNationalTeamsPagination();
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                nationalTeams.length!=0?
                <>
                <h2 style={{padding:"10px 0 10px 0"}}>National Team List</h2>
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
                                nationalTeams.map((national,i)=>(
                                <tr key={i}>
                                    <td><Link to={`/nationalTeams/${national.id}`}>{national.id}</Link></td>
                                    <td>{national.name}</td>
                                    <td>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/nationalTeams/${national.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteNationalTeam(national.id)}>Delete</button>
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
                    <h2>National Team List is Empty</h2>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/nationalTeams/create">Create National Team</Link>
                </div>:
                <></>
            }
            </div>
            </div>
                 
        </>
    )
}
export default NationalTeamList;