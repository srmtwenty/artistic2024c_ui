import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function SoundtrackList(){
    const [soundtracks, setSoundtracks]=useState([]);
    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);
    
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(30);

    

    const loadSoundtrackList=()=>{
        axios.get("http://localhost:8080/soundtracks", {headers:authHeader()})
            .then(res=>
                {
                    setTotal(res.data.length)
                    setLoadComplete(true)
                    console.log(loadComplete)
                }
            )
            .catch(err=>{
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }
    
    useEffect(()=>{
        loadSoundtrackList();
        loadSoundtracksPagination();
    },[page, field, rowsPerPage, field])
    
    const deleteSoundtrack=(id)=>{
        axios.delete(`http://localhost:8080/soundtracks/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/soundtracks")
            })
            .catch(err=>console.log(err))
    }
    const loadSoundtracksPagination=()=>{
        axios.get(`http://localhost:8080/soundtracks/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setSoundtracks(res.data.content)
               
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadSoundtracksPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadSoundtracksPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadSoundtracksPagination();
    }
    const pageChange=(e)=>{
        e.preventDefault()
        
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
            {noData!=true?
            <>
            <h2>Soundtracks List</h2>
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
                            soundtracks.map((sound, i)=>(
                            <tr key={i}>
                                <td><Link to={`/soundtracks/${sound.id}`}>{sound.id}</Link></td>
                                <td>{sound.name}</td>
                                <td>
                                    {
                                        user && user.roles.includes("ROLE_ADMIN")?
                                        <div className="tdButtonWrapper">
                                            <div className="tdButtonContainer1">
                                                <Link className="link" to={`/soundtracks/${sound.id}/update`}>Edit</Link>    
                                            </div>
                                            <div className="tdButtonContainer2">
                                                <button onClick={()=>deleteSoundtrack(sound.id)}>Delete</button>
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
                <div>
                    <p>Page:{page}</p>
                    <form onSubmit={pageChange}>
                        <input type="number" onChange={(e)=>setPage(e.target.value)} placeholder={page}/>
                        <input type="submit" id="submitbtn"/>
                    </form>
                </div>
            </div>
            </>:
                <h2>Soundtrack List is Empty</h2>
            }
            </>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/soundtracks/create">Post Soundtrack</Link>
                </div>:
                <></>
            }
            </div>
        </div>
        </>
    )
}
export default SoundtrackList;