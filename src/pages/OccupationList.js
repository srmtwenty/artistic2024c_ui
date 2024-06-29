import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function OccupationList(){
    const [occupations, setOccupations]=useState([]);
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const loadOccupations=()=>{
        axios.get("http://localhost:8080/occupations", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
                //console.log(res.data)
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
        loadOccupations();
        loadOccupationsPagination();
    },[page, field, rowsPerPage, field])
    const deleteOccupation=(id)=>{
        axios.delete(`http://localhost:8080/occupations/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/occupations")
            })
            .catch(err=>console.log(err))
    }
    const loadOccupationsPagination=()=>{
        axios.get(`http://localhost:8080/occupations/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setOccupations(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadOccupationsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadOccupationsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadOccupationsPagination();
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
                <h2>Occupation List</h2>
                    <div className="rowTable">
                    <table>
                        <thead>
                            <tr>
                                <th><button onClick={()=>handleFieldName("id")}><span>Id</span></button></th>
                                <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                occupations.map((oc, i)=>(
                                <tr key={i}>
                                    <td><Link to={`/occupations/${oc.id}`}>{oc.id}</Link></td>
                                    <td>{oc.name}</td>
                                    <td>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/occupations/${oc.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteOccupation(oc.id)}>Delete</button>
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
            
                    <h2>Occupation List is Empty</h2>
                }
                </>
                }
                {
                    user && user.roles.includes("ROLE_ADMIN")?
                    <div className="createLink">
                        <Link className="link" to="/occupations/create">Post Occupation</Link>
                    </div>:
                    <></>
                }
                </div>
            </div>
        </>
    )
}
export default OccupationList;