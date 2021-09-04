import React, {useEffect} from 'react'

import { Col, Row } from "react-bootstrap";
import {Image} from "react-bootstrap";
import  { useState,  } from "react";
import firebase from "firebase";
import Chart from 'react-apexcharts'
import { db } from '../firebase/firebase'
import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import imagevar from "../assets/images/signIn.jpg"





const chartOptions = {

    
    series: [{
        name: 'Online Customers',
        data: [0,70,20,90,36,80,30,91,60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}










    
 
 const Dashboard =  ()=> {
    
    useEffect(() => {

        const quantit =[]
        db.collection('produits').get().then(snapshot=>{
            
            snapshot.forEach(doc=>{
                const data = doc.data().quantity
                quantit.push(data)
                console.log("*****" , quantit)
            })
    
        }).then(
            )
        .catch(error=>console.log(error))
    }, []);
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    let [size, setSize] = React.useState("");

  
    const getSize=async () => {
    await db.collection('users').get().then(snap => {
      size = snap.size 
      console.log(size)
      setSize(size);
     // will return the collection size
    })
    } 
  getSize()
  console.log(size)      
  console.log("==========")  



  let [sizeP, setSizeP] = React.useState("");
  const getSizeP=async () => {
    await db.collection('produits').get().then(snap => {
      sizeP = snap.size 
      console.log(sizeP)
      setSizeP(sizeP);
     // will return the collection size
    })
    } 
    getSizeP()



    let [sizeO, setSizeO] = React.useState("");
  const getSizeO=async () => {
    await db.collection('orders').get().then(snap => {
      sizeO = snap.size 
      console.log(sizeO)
      setSizeO(sizeO);
     // will return the collection size
    })
    } 
    getSizeO()







    const [user, setUser] = useState(null)
    useEffect(() => {
        const user = firebase.auth().currentUser;
        const authObserver = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
        });
        return authObserver;
      });
    
      console.log("user", user);




    let [sizeG, setSizeG] = React.useState("");
  const getSizeG=async () => {
    await db.collection('categorie').get().then(snap => {
      sizeG = snap.size 
      console.log(sizeG)
      setSizeG(sizeG);
     // will return the collection size
    })
    } 
    getSizeG()

if(user){
    return (
        
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            
                                <div className="col-6" >
                                     <Row>
                                     <Col>
                                    <StatusCard
                                        icon={"bx bx-user"}
                                        count={size}
                                        title={"total users"}
                                    />
                                    </Col>
                                    <Col>
                                   <StatusCard
                                    icon={"bx bx-cart"}
                                    count={sizeP}
                                    title={"Total Product"}
                                    />
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                     <StatusCard
                                    icon={"bx bx-receipt"}
                                    count={sizeO}
                                    title={ "Total orders"}
                                     />
                                     </Col>
                                     <Col>
                                    <StatusCard
                                    icon={ "bx bx-category"}
                                     count={ sizeG}
                                    title={"Total Categories"}
                                     />
                                    </Col>
                                    </Row>
                                    
                                </div>
                           
                        }
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

else{
    return(
        <div>
            
           <div>
              <Row>
              <h1>Welcome to the dashboard </h1>
               <h1> Please sign In first</h1>
               
              <Col >
              <br></br>
               <br></br>
            <a href="/register" class="btn btn-danger btn-lg active" role="button" aria-pressed="true">Sign Up</a>
            <br></br>
            <br></br>
            </Col>
            <Col>
            <br></br>
               <br></br>
            <a href="/signIn" class="btn btn-dark btn-lg active" role="button" aria-pressed="true">Sign In</a>

            </Col>
            <Col > 
            <div>
               <Image src={imagevar} thumbnail style={{border:"none"}} /> 
            </div>
            </Col>
              </Row>
               
           </div>
            
            
        </div>
    )
    
}
    
}


export default Dashboard