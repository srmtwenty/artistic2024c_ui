import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

function AddressList(){
    const [addresses, setAddresses]=useState([])
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const loadAddresses=()=>{
        axios.get("http://localhost:8080/addresses", {headers:authHeader()})
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
        loadAddresses();
        loadAddressesPagination();
    },[page, field, rowsPerPage, field])

    const deleteAddress=(id)=>{
        axios.delete(`http://localhost:8080/addresses/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/addresses")
            })
            .catch(err=>console.log(err))
    }
    const loadAddressesPagination=()=>{
        axios.get(`http://localhost:8080/addresses/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setAddresses(res.data.content)
                //console.log(users.length)
                //setUsers(res.data)
            })
            .catch(err=>console.log(err))
    }
    const handleFieldName=(field)=>{
        setField(field)
        //loadArticlesPagination();
    }

    const handleChangePage=(e, newPage)=>{
        setPage(newPage)
        //loadArticlesPagination();
    }
    const handleChangeRowsPerPage=(e)=>{
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
        //loadArticlesPagination();
    }

    const title={
        padding:"10px 0 10px 0"
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
                        <h2 style={title}>Address List</h2>
                        <div className="rowTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                        <th>Content</th>
                                        <th>Source</th>
                                        <th>Dscription</th>
                                        
                                        <th>People</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        addresses.map((address, i)=>
                                        <tr key={i}>
                                            <td><Link to={`/addresses/${address.id}`}>{address.id}</Link></td>
                                            <td><img src={`http://localhost:8080/files/${address.url}`} style={{height:"150px"}}/></td>
                                            <td>{address.source}</td>
                                            <td>{address.description}</td>
                                            
                                            <td>
                                                <ul>
                                                    {
                                                        address.peopleAlt.map((p, i)=>
                                                            <li key={i}>
                                                                <Link to={`/people/${p.id}`}>{p.name}</Link>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </td>
                                            
                                            <td>
                                                {
                                                    user && user.roles.includes("ROLE_ADMIN")?
                                                    <div className="tdButtonWrapper">
                                                        <div className="tdButtonContainer1">
                                                            <Link className="link" to={`/addresses/${address.id}/update`}>Edit</Link>    
                                                        </div>
                                                        <div className="tdButtonContainer2">
                                                            <button onClick={()=>deleteAddress(address.id)}>Delete</button>
                                                        </div>
                                                    </div>:
                                                    <></>
                                                }
                                            </td>
                                        </tr>    
                                        )
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
                :<h2>Address List is Empty</h2>
            
                }
                
            
            </>
            }
            {
                user && user.roles.includes("ROLE_ADMIN")?
                <div className="createLink">
                    <Link className="link" to="/addresses/create">Create Address</Link>
                </div>:
            <></>
            }
            
            </div>
            </div>
        </>
    )
}
export default AddressList;