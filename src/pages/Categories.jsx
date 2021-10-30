import { compressToEncodedURIComponent } from 'lz-string'
import React from 'react'
import { db } from '../firebase/firebase'
import firebase from "firebase";
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";
import { Col, Row } from "react-bootstrap";
import  { useEffect, useState } from "react";
import './pages.css'
function Categories() {

    const [categorie, setCategories] = useState(null);
  
    useEffect(() => {
        db.collection('categorie').get().then(snapshot=>{
            const categorie =[]
            snapshot.forEach(doc=>{
                const data = doc.data()
                categorie.push(data)
            })

            setCategories(categorie);
           // console.log(snapshot)
           // console.log(orders)
            let first = Object.keys(categorie[0])
            //console.log(orders[0][first].address)
        }).then(
            )
        .catch(error=>console.log(error))
    }, []);
  
    const [user, setUser] = useState(null);
    useEffect(() => {
      const authObserver = firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
      return authObserver;
    });
  
      return (
        
        <div className ="Categories">
                    <thead class="thead-dark">
                    <h1>Categories  List</h1>
                    <tr>
                        <th>name of category</th>
                        <br></br>
                        
                    </tr>
                    </thead>
                    {categorie && 
                    categorie.map(categorie =>{
                        return(
                            <tr>
                                <td>{categorie.titre}</td>
                                <br></br>
                                <td> <img src={ categorie.image } alt="Product Pic" height="150px" width="150px" /></td>
                                
                                <br></br>
                            </tr>
                           
                        )
                    })
                    }
                </div>
      );
    
  }
    export default Categories


    