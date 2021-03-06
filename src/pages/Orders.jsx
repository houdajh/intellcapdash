import { compressToEncodedURIComponent } from 'lz-string'
import React from 'react'
import { db } from '../firebase/firebase'
import  { useEffect, useState } from "react";
import firebase from "firebase";
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";
import { Col, Row } from "react-bootstrap";





function Orders() {

    const [orders, setOrders] = useState(null);
  
    useEffect(() => {
        db.collection('orders').get().then(snapshot=>{
            const orders =[]
            snapshot.forEach(doc=>{
                const data = doc.data()
                orders.push(data)
            })
            setOrders(orders);
            this.setState({orders : orders})
           // console.log(snapshot)
           // console.log(orders)
            let first = Object.keys(orders[0])
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
        <div className ="Orders">
        <thead class="thead-dark">
        <h1>Orders  </h1>
        <tr>
            <th>Title of product</th>
            <th>Name of Customer</th>
            <th>adress of Customer</th>
            <th>email of Customer</th>
            <th>phone number</th>
            <th>size</th>
            <th>color</th>
            <th>description</th>
            <th>Quantity</th>
        </tr>
        </thead>
        
        {orders && 
        orders.map((index) =>{
        
        console.log(index)
            return(
                <tr>
                    <td>{ index[Object.keys(index)].title} </td>
                    <td>{ index[Object.keys(index)].name} </td>
                    <td>{ index[Object.keys(index)].address}</td>
                    <td> { index[Object.keys(index)].email} </td>
                    <td> { index[Object.keys(index)].phone} </td>
                    <td> { index[Object.keys(index)].size} </td>
                    <td> { index[Object.keys(index)].color} </td>
                    <td> { index[Object.keys(index)].description} </td>
                    <td> { index[Object.keys(index)].counter} </td>
                </tr>
            )
        })
        }
    </div>
      );
    
  }
  
    export default Orders


    