import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function MusicList(){
    const [musics, setMusics]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const user=AuthService.getCurrentUser();
    const loadMusicList=()=>{
        axios.get("http://localhost:8080/musics", {headers:authHeader()})
            
            .then(res=>{
                setLoadComplete(true)
                console.log(loadComplete)
                setTotal(res.data.length)
                console.log(total)
            })
            .catch(err=>{
                setLoadComplete(true)
                console.log(loadComplete)
                console.log(err)
                setNoData(true)
                console.log(noData)
            })
    }

    useEffect(()=>{
        loadMusicList();
        loadMusicsPagination();
    },[total, page, field, rowsPerPage, field])

    const deleteMusic=(id)=>{
        axios.delete(`http://localhost:8080/musics/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/musics")
            })
            .catch(err=>console.log(err))
    }
    const loadMusicsPagination=()=>{
        axios.get(`http://localhost:8080/musics/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setMusics(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadMusicsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadMusicsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadMusicsPagination();
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
                                <h2>Music List</h2>
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
                                                musics.map((music, i)=>(
                                                <tr key={i}>
                                                    <td><Link to={`/musics/${music.id}`}>{music.id}</Link></td>
                                                    <td>{music.name}</td>
                                        
                                                    <td>
                                                        {
                                                            user && user.roles.includes("ROLE_ADMIN")?
                                                            <div className="tdButtonWrapper">
                                                                <div className="tdButtonContainer1">
                                                                    <Link className="link" to={`/musics/${music.id}/update`}>Edit</Link>    
                                                                </div>
                                                                <div className="tdButtonContainer2">
                                                                    <button onClick={()=>deleteMusic(music.id)}>Delete</button>
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
                            </>
                            :<h2>Music List is Empty</h2>
                            }
                            {
                                user && user.roles.includes("ROLE_ADMIN")?
                                <div className="createLink">
                                    <Link className="link" to="/musics/create">Create Music</Link>
                                </div>:
                                <></>
                            }

                        </>
                    }
                </div>
            </div>
        </>
    )
}
export default MusicList;