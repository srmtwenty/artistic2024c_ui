import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/";

const getPublicContent=()=>{
    return axios.get(API_URL+"all");
};

const getUserBoard=()=>{
    return axios.get(API_URL+"user",{headers:authHeader()})
};

const getModeratorBoard=()=>{
    return axios.get(API_URL+"mod", {headers: authHeader()})
}

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getTagsBoard=()=>{
    return axios.get("http://localhost:8080/tags", {headers:authHeader()});
}


  const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getTagsBoard,
  };
  
  export default UserService;