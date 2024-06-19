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
    const [cont, setCont]=useState([])
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const [str, setStr]=useState("")
    const [searchMode, setSearchMode]=useState(false);
    const [nation, setNation]=useState(0);
    const [nations, setNations]=useState([]);
    const [allNations, setAllNations]=useState([])

    const loadPeople=()=>{
        axios.get("http://localhost:8080/people", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    

    useEffect(()=>{
        loadPeople();
        loadPeoplePagination();
        loadPeopleByName();
        loadPeopleByNation();
        loadAllNations();
            
        
       
    },[page, field, rowsPerPage, field, str, nation])

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
                console.log(people)  
                setPeople(res.data.content)
                console.log(res.data.content)
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

    const loadPeopleByNation=()=>{
        
        axios.get(`http://localhost:8080/people/searchNation/${nation}`, {headers:authHeader()})
            .then(res=>
                {
                    setNations(res.data)
                    setPeople(nations)
                    
            })
            .catch(err=>console.log(err))
    }

    const loadAllNations=()=>{
        axios.get("http://localhost:8080/nations", {headers:authHeader()})
            .then(res=>{
                setAllNations(res.data)
                console.log(allNations)
                }
            )
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
    const handleChangeNation=(e)=>{
        e.preventDefault()
        setNation(e.target.value)
        
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
                    
                    <div style={{display:"flex", justifyContent:"space-between", margin:"auto",maxWidth:"1000px"}}>
                        <div className="postDetail">
                            <form>
                                <div>
                                    <input type="text" placeholder="Search Name" onChange={handleChangeName}/>
                                    <input type="submit" value="Search"/> 
                                </div>
                            </form>
                        </div>
                        <div className="backToDetail">
                            <form>
                                <div>
                                    <select id="nation" name="nation" onChange={handleChangeNation}>
                                        <option>Select Nation</option>
                                        {
                                            allNations.map((nt, i)=>
                                                <option key={i} value={nt.id}>{nt.name}</option>
                                            )
                                        }    
                                    </select>
                                    <input type="submit" value="Search Nation"/>
                                </div> 
                            </form>
                        </div>
                    </div>
                
                    <h2 style={title}>Athlete && Coach List</h2>
                    <div className="rowTable">
                        <table>
                            <thead>
                                <tr>
                                    <th><Link className="table_field" to="/people" onClick={()=>handleFieldName("id")}>Id</Link></th>
                                    <th><Link className="table_field" to="/people" onClick={()=>handleFieldName("name")}>Name</Link></th>
                                    <th>Photo</th>
                                    <th>Description</th>
                                    <th><Link className="table_field" to="/people" onClick={()=>handleFieldName("nationality")}>Nationality</Link></th>
                                    <th>Gender</th>
                                    <th>Occupation</th>
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
                                        <td><Link to={`/people/${person.id}`}>{person.name}</Link></td>
                                        <td>
                                        {
                                                person.profilePicAlt?
                                                <img src={`http://localhost:8080/files/${person.profilePicAlt}`} style={{width:"100px"}} />
                                                :<></>
                                            }
                                        </td>
                                        <td>{person.description}</td>
                                        <td>{
                                            person.nationality?
                                            <>{person.nationality.name}</>:
                                            <>Null</>
                                            }
                                        </td>
                                        <td>{person.gender}</td>
                                        <td>
                                            <ul className="ultest2">
                                            {
                                                person.occupations.map((o, i)=>(
                                                <li key={i} className="list-block">
                                                    {o.name}
                                                </li>
                                            ))
                                            }
                                            </ul>
                                        </td>
                                        <td>
                                            {
                                                user && user.roles.includes("ROLE_ADMIN")?
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
                                            user && user.roles.includes("ROLE_ADMIN")?
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
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/people/create">Create Person</Link>
                </div>:
                <></>
            }


            {/*

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

                            
                                
                                <tbody>
                                {
                                    
                                    
                                    nations.map((ps, i)=>(
                                    <tr key={i}>
                                        <td><Link to={`/people/${ps.id}`}>{ps.id}</Link></td>
                                        <td>{ps.name}</td>
                                        <td>{ps.description}</td>
                                        <td>{
                                            ps.nationality?
                                            <>{ps.nationality.name}</>:
                                            <>Null</>
                                            }
                                        </td>
                                        <td>{ps.gender}</td>
                                        <td>
                                            {
                                                user.roles.includes("ROLE_ADMIN")?
                                                <div className="tdButtonWrapper">
                                                    <div className="tdButtonContainer1">
                                                        <Link className="link" to={`/people/${ps.id}/update`}>Edit</Link>    
                                                    </div>
                                                    <div className="tdButtonContainer2">
                                                        <button onClick={()=>deletePerson(ps.id)}>Delete</button>
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
                        
                            </div>*/}
            </div>
            </div>
        </>
    )
}
export default PersonList;