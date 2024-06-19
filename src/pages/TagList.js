import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import UserService from '../services/user.service';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';

function TagList(){
    const [tags, setTags]=useState([])

    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);
    const navigate=useNavigate();

    const user=AuthService.getCurrentUser();
    const loadTags=()=>{
        axios.get("http://localhost:8080/tags", {headers:authHeader()})
            .then(res=>{
                setTotal(res.data.length)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        /*
        UserService.getTagsBoard().then(
            res=>{
                setTags(res.data);
                console.log(tags)
            },
            err=>console.log(err)
        )*/
        loadTags()
        loadTagsPagination()
    },[page, field, rowsPerPage, field])
    
    const deleteTag=(tagId)=>{
        axios.delete(`http://localhost:8080/tags/${tagId}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/tags")
            })
            .catch(err=>console.log(err))
    }

    const loadTagsPagination=()=>{
        axios.get(`http://localhost:8080/tags/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setTags(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
                
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadTagsPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadTagsPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadTagsPagination();
    }
    const title={
        padding:"10px 0 10px 0"
    }
    return(
        <>
            <div className="profile_wrap2">
                <div className="profile_grid1">
                    {tags.length!=0?
                    <>
                    <h2 style={title}>Tag List</h2>
                   
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
                                tags.map((tag,i)=>(
                                <tr key={i}>
                                    <td><Link to={`/tags/${tag.id}`}>{tag.id}</Link></td>
                                    <td>{tag.name}</td>
                                    <td>
                                        <div className="tdButtonWrapper">
                                            <div className="tdButtonContainer1">
                                                <Link className="link" to={`/articles/${tag.id}/update`}>Edit</Link>    
                                            </div>
                                            <div className="tdButtonContainer2">
                                                <button onClick={()=>deleteTag(tag.id)}>Delete</button>
                                            </div>
                                        </div>    
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
                            <h2>Tag List is Empty</h2>  
                    }
                    {
                        user && user.roles.includes("ROLE_ADMIN")?
                        <div className="createLink">
                            <Link className="link" to="/tags/create">Create Tag</Link>
                        </div>:
                        <></>
                    }
                    
                </div>
            </div>
        </>
    )
}
export default TagList;