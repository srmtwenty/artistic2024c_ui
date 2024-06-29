import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import './style1.css';
import Stack from '@mui/material/Stack';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

function ArticleList(){
    const [articles, setArticles]=useState([])
    const [field, setField]=useState("id");
    const [total, setTotal]=useState(-1);
    const [page, setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    const [loadComplete, setLoadComplete]=useState(false);
    const [noData, setNoData]=useState(false);

    const navigate=useNavigate();
    const user=AuthService.getCurrentUser();
    const loadArticles=()=>{
        axios.get("http://localhost:8080/articles", {headers:authHeader()})
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
        loadArticles();
        loadArticlesPagination();
    },[page, field, rowsPerPage, field])

    const deleteArticle=(id)=>{
        axios.delete(`http://localhost:8080/articles/${id}/delete`, {headers:authHeader()})
            .then(res=>{
                window.location.reload();
                navigate("/articles")
            })
            .catch(err=>console.log(err))
    }
    const loadArticlesPagination=()=>{
        axios.get(`http://localhost:8080/articles/${page}/${rowsPerPage}/${field}`, {headers:authHeader()})
            .then(res=>{   
                setArticles(res.data.content)
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
                                <h2 style={title}>Article List(<Link to="https://docs.google.com/spreadsheets/d/1VLB9b1Q5o_Eugrx92dEFWZE97lJkuRjteY5PrYQ1_VI/edit?usp=sharing">Articles</Link>)</h2>
                                    <div className="rowTable">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th><button onClick={()=>handleFieldName("id")}>Id</button></th>
                                                    <th><button onClick={()=>handleFieldName("name")}>Name</button></th>
                                            
                                                    <th>Date</th>
                                                    <th>People</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    articles.map((article, i)=>
                                                    <tr key={i}>
                                                        <td><Link to={`/articles/${article.id}`}>{article.id}</Link></td>
                                                        <td>{article.name}</td>
                                                    
                                                        <td>{article.date}</td>
                                                        <td>
                                                            <ul>
                                                            {
                                                                article.people.map((ar, i)=>(
                                                                    <li key={i}><Link to={`/people/${ar.id}`}>{ar.name}</Link></li>
                                                                ))
                                                            }
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            {
                                                                user && user.roles.includes("ROLE_ADMIN")?
                                                                <div className="tdButtonWrapper">
                                                                    <div className="tdButtonContainer1">
                                                                        <Link className="link" to={`/articles/${article.id}/update`}>Edit</Link>    
                                                                    </div>
                                                                    <div className="tdButtonContainer2">
                                                                        <button onClick={()=>deleteArticle(article.id)}>Delete</button>
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
                            :<h2>Article List is Empty</h2>
            
                        }
                        </>
                    }
                    {
                        user && user.roles.includes("ROLE_ADMIN")?
                        <div className="createLink">
                            <Link className="link" to="/articles/create">Create Article</Link>
                        </div>:
                        <></>
                    }
            </div>
            </div>
        </>
    )
}
export default ArticleList;