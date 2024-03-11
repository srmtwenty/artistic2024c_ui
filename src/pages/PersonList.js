import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function PersonList(){
    const [people, setPeople]=useState([])
    const [pName, setPName]=useState([])
    //const [cont, setCont]=useState([])
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const [str, setStr]=useState("")
    const [searchMode, setSearchMode]=useState(false);

    const loadPeople=()=>{
        axios.get("http://localhost:8080/people", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadPeople();
        loadPeoplePagination();
        loadPeopleByName();
    },[page, field, rowsPerPage, field, str])

    const deletePerson=(id)=>{
        axios.delete(`http://localhost:8080/people/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/people")
            })
            .catch(err=>console.log(err))
    }
    const loadPeoplePagination=()=>{
        axios.get(`http://localhost:8080/people/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{ 
                //console.log(res.data.content)  
                setPeople(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const loadPeopleByName=()=>{
        axios.get(`http://localhost:8080/people/search/${str}`, {headers:authHeader()})
            .then(res=>setPName(res.data))
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadPeoplePagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadPeoplePagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        //setRowsPerPage(e.target.value);
        setPage(0);
        //loadPeoplePagination();
    }

    const handleChangeName=(e)=>{
        e.preventDefault()
       
        setStr(e.target.value)
        console.log(str)
    }
    const title={
        padding:"10px 0 10px 0"
    }

    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
            {
                people?
                <>
                <form>
                    <div>
                        <input type="text" onChange={handleChangeName}/>
                    </div>
                    <input type="submit" value="Search"/> 
                </form>
                
                    <h2 style={title}>Person List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><Link to="/people" onClick={()=>handleFieldName("id")}>Id</Link></th>
                                    <th><Link to="/people" onClick={()=>handleFieldName("name")}>Name</Link></th>
                                    <th>Description</th>
                                    <th><Link to="/people" onClick={()=>handleFieldName("nationality")}>Nationality</Link></th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            {
                                str==""?
                                <tbody>
                                {
                                    
                                    
                                    people.map((person, i)=>(
                                    <tr key={i}>
                                        <td><Link to={`/people/${person.id}`}>{person.id}</Link></td>
                                        <td>{person.name}</td>
                                        <td>{person.description}</td>
                                        <td>{
                                            person.nationality?
                                            <>{person.nationality.name}</>:
                                            <>Null</>
                                            }
                                        </td>
                                        <td>{person.gender}</td>
                                        <td>
                                            {
                                                user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/people/${person.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deletePerson(person.id)}>Delete</button>
                                                    </div>
                                                </div>:
                                                <></>
                                            }
                                            
                                        </td>
                                    </tr> 
                                      
                                    ))
                                }
                            </tbody>:
                            <tbody>
                            {
                                
                                
                                pName.map((person, i)=>(
                                <tr key={i}>
                                    <td><Link to={`/people/${person.id}`}>{person.id}</Link></td>
                                    <td>{person.name}</td>
                                    <td>{person.description}</td>
                                    <td>{
                                        person.nationality?
                                        <>{person.nationality.name}</>:
                                        <>Null</>
                                        }
                                    </td>
                                    <td>{person.gender}</td>
                                    <td>
                                        {
                                            user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/people/${person.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deletePerson(person.id)}>Delete</button>
                                                </div>
                                            </div>:
                                            <></>
                                        }
                                        
                                    </td>
                                </tr> 
                                  
                                ))
                            }
                            </tbody>
                            }
                            
                        </table>
                        <Stack>
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
                    <h2>Person List is Empty</h2>
            }
            {
                user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/people/create">Create Person</Link>
                </div>:
                <></>
            }
            </div>
            </div>
        </>
    )
}
export default PersonList;