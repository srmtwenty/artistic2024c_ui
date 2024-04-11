import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

function MainPage(){

    return(
        <>
            <h2>Welcome to the Athelete Database</h2>
            <p>Please Login or Register</p>
        </>
    )
}
export default MainPage;