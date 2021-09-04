import React from 'react'
import { db  } from '../firebase/firebase'
import 'firebase/firestore';
import { deleteProduct , updateProduct ,routeChange } from '../firebase/firebase'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import './tables.scss'
import './filter.js'
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";
import firebase from "firebase";
import  { useEffect} from "react";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, PagingPosition, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

    
function Products(props) {

   
        
         
    const [products, setProducts] = useState(null);

    useEffect(() => {
      db.collection('produits').get().then(snapshot=>{
        const produits =[]
        snapshot.forEach(doc=>{
            const data = doc.data()
            produits.push(data)
        })
        setProducts(produits);
  
    })
    .catch(error=>console.log(error))
    }, []);
       
        
         const [user, setUser] = useState(null);
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });


  const FilterTable = ({ elements, filterStr, changeFilterStr }) => {
    return (
      <div>
        <input
          type="text"
          value={ filterStr }
          onChange={ e => changeFilterStr(e.target.value) } />
        <ul>
          {
            elements
              .filter(e => e.includes(filterStr))
              .map(e => <li key={ e }>{ e }</li>)
          }
        </ul>
      </div>
    )
  }

  
      
        if (user) {
            return(
                <div className ="Products">
                    <thead class="thead-dark" >
                    <h1>Products</h1>
                   <Button variant="danger" 
                     onClick={()=> window.location.href="/add"}>Add new product 
                                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg>
                                    </Button> 
                    <tr>
                        <th>product title</th>
                        <th>Images</th>
                        <th>old price</th>
                        <th>Price</th>
                        <th>Description</th>
                        
                        
                    </tr>
                    </thead>
                    {products && 
                    products.map(products =>{
                        var id = products.id
                        return(
                            <tr>
                                <td>{products.title}</td>
                                <td> <img src={ products.images[0] } alt="Product Pic" height="150px" width="150px" /></td>
                                <td>{products.oldprice}</td>
                                <td>{products.price}</td>
                                <td>{products.description}</td>
                                
                                     
                                    <Button variant="secondary"  onClick={()=>props.history.push({pathname: '/update',
                                        state:  { 'id' :products.id , 
                                        'idq' :products.categoryId}
                                    })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                      </svg>
                                    </Button> 
                                    <br></br>
                                    <Button variant="danger"  onClick={async() =>await deleteProduct(id)
                                                                                 
                                                                                
                                                                                  
                                                                              }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                        </svg>
                                    </Button>   
                            </tr>
                           
                        )
                    })
                    }
                </div>
            )
           
                }else {
                    return (
                      <div>
                        <div>
                          <Row>
                            <h1>Welcome to the dashboard </h1>
                            <h1> Please sign In first</h1>
                            <Col>
                              <br></br>
                              <br></br>
                              <a
                                href="/register"
                                class="btn btn-danger btn-lg active"
                                role="button"
                                aria-pressed="true"
                              >
                                Sign Up
                              </a>
                              <br></br>
                              <br></br>
                            </Col>
                            <Col>
                              <br></br>
                              <br></br>
                              <a
                                href="/signIn"
                                class="btn btn-dark btn-lg active"
                                role="button"
                                aria-pressed="true"
                              >
                                Sign In
                              </a>
                            </Col>
                            <Col>
                              <div>
                                <Image src={imagevar} thumbnail style={{ border: "none" }} />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    );
                  }
                }
    export default Products

//===================================================================================================================