import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function ArtistList(){
    const [artists, setArtists]=useState([]);
    const navigate=useNavigate();

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(30);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const user=AuthService.getCurrentUser();
    const loadArtists=()=>{
        axios.get("http://localhost:8080/artists", {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
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
        loadArtists();
        loadArtistsPagination();
    },[page, field, rowsPerPage, field])

    const deleteArtist=(id)=>{
        axios.delete(`http://localhost:8080/artists/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/artists")
            })
            .catch(err=>console.log(err))
    }

    const loadArtistsByName=(field)=>{
        axios.get(`http://localhost:8080/artists/sort/${field}`, {headers:authHeader()})
            .then(res=>{
                console.log(res.data)
                setArtists(res.data)
            })
            .catch(err=>console.log(err))
    }
    const loadArtistsPagination=()=>{
  
        axios.get(`http://localhost:8080/artists/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setArtists(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadArtistsPagination();
    }
    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadArtistsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadArtistsPagination();
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
                    {
                    noData!=true?
                    <>
                    <h2>Artist List</h2>
              
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
                                artists.map((artist, i)=>(
                                <tr key={i}>
                                    <td><Link to={`/artists/${artist.id}`}>{artist.id}</Link></td>
                                    <td>{artist.name}</td>
                                    <td>
                                        {
                                            user && user.roles.includes("ROLE_ADMIN")?
                                            <div className="tdButtonWrapper">
                                                <div className="tdButtonContainer1">
                                                    <Link className="link" to={`/artists/${artist.id}/update`}>Edit</Link>    
                                                </div>
                                                <div className="tdButtonContainer2">
                                                    <button onClick={()=>deleteArtist(artist.id)}>Delete</button>
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
                <h2>Artist List is Empty</h2>
            }
            </>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/artists/create">Post Artist</Link>
                </div>:
                <></>
            }
            </div>
            </div>
        </>
    )
}
export default ArtistList;