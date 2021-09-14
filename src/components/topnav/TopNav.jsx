import React from 'react'
import {Button }  from 'react-bootstrap'
import './topnav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import { Link } from 'react-router-dom'
import { faUsers,faUser, faCut, faBullhorn, faPenNib, faCircle, faPalette, faVolumeUp, faSmile, faGrin, faShekelSign, faTv, faUserTie, faFolder, faPaintBrush, faCircleNotch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import ThemeMenu from '../thememenu/ThemeMenu'

import  { useState,  } from "react";
import firebase from "firebase";
import  {useEffect} from 'react'


import {  useHistory } from "react-router-dom";




const Topnav = () => {
    const history = useHistory()
    const signOut = () => {
        firebase
          .auth()
          .signOut()
          .then(function () {
            console.log("Successufully Signed out");
          })
          .catch(function () {
            console.log("Error Signed out");
          });
          window.location.reload();
      };





    const [user, setUser] = useState(null)
useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  console.log("user", user);


if(user){
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                   
                    <p>  <FontAwesomeIcon icon={faUser} /> {user.email} </p>
                </div>
                <div className="topnav__right-item">
                <button onClick={signOut} type="button" class="btn btn-danger">Sign out</button>
                  
                </div>
                
                
                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}
else{
    return(
        <div>
            
           <div>
               
              
           </div>
          
            
        </div>
    )
}
   
}

export default Topnav
