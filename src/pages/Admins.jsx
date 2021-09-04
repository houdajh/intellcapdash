import { compressToEncodedURIComponent } from 'lz-string'
import React from 'react'
import { db } from '../firebase/firebase'
import firebase from "firebase";
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";
import { Col, Row } from "react-bootstrap";
import  { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import  {useRef } from "react";

import TopNav from '../components/topnav/TopNav'
import {  useHistory } from "react-router-dom";

function Admins() {
  
  const history = useHistory()
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        if(user.email === "topadmin@gmail.com" ){
          setUser(user);
        }
      }
      

     
      
    });
    return authObserver;
  });
  if(user){
    console.log("voilaaaaaa" , user.email)
  }
  const [admin, setAdmin] = useState(null);
  const deleteProduct = async (id) => { 
    
    await firebase.firestore().collection("Admin").doc(id.trim()).delete();
    console.log(id);
    console.log(id.length)
    window.location.reload();
  };
  
  useEffect(() => {


      db.collection('Admin').get().then(snapshot=>{
          const admin =[]
          snapshot.forEach(doc=>{
              const data = doc.data()
              admin.push(data)
          })

          setAdmin(admin);
         // console.log(snapshot)
         // console.log(orders)
          let first = Object.keys(admin[0])
          //console.log(orders[0][first].address)
      }).then(
          )
      .catch(error=>console.log(error))
  }, []);

  

  
  
    if (user ) {
      return (
        <div className ="Categories">
                    <thead class="thead-dark">
                    <h1>Admins List</h1>
                    <tr>
                        <th>email</th>
                        
                    </tr>
                    </thead>
                    {admin && 
                    admin.map(admin =>{
                        return(
                          <tr>
                              <td>{admin.email}</td>
                              <Button variant="danger"  onClick={async() => await deleteProduct(admin.email)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                      </svg>
                                  </Button>   
                              
                          </tr>
                      )
                      
                        
                    })
                    }
                   
                </div>
      );
    } else {

      
      return (
        <div>
              <h1>Not autorized </h1>
         
              </div>
              
      );
    }
  }
    export default Admins