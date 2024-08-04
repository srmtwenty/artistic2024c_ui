import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

import bgImage from './pexels-pixabay-34514b.jpg'

function MainPage(){

    return(
        <div style={{backgroundImage:`url(${bgImage})`, height:"800px"}}>
            <div style={{padding: "70px 0", textAlign:"center"}}>
                <h2>Welcome to the Athlete Database</h2>
                <p>Please Login or Register</p>
            </div>
        </div> 
    )
}
export default MainPage;