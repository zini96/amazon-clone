import React from 'react';
import {Link} from "react-router-dom"
import './Banner.css'
import { auth } from '../firebase & axios/firebase';
import { useStateValue } from '../StateProvider/StateProvider';

function Banner() {
    const [{user}, dispatch] = useStateValue();

    const handleAuthentication = ()=>{
        if(user){
            auth.signOut();
        }
    };

    return (
        <div className='banner_container' onClick={handleAuthentication}>
            {user ? 
                <div className='banner_3'>
                    <img src='./amazon.png' alt='amazon'/>
                </div> 
                :            
                <div className='banner_1' >
                    <p className='banner_name'>Sign in for the best experience</p>
                    <Link to={!user && "/login"} >
                        <button className='banner_btn' >Sign in securely</button>
                    </Link>
                </div>         
            }
            {user ? "" :            
                <div className='banner_2'/>
            }
    
        </div>
    );
}

export default Banner;