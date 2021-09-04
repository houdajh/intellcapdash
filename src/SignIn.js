import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {Card , Button }  from 'react-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";
import {Image , Alert} from "react-bootstrap";
import imagevar from "./assets/images/signIn.jpg"
import  {useRef, useState, useEffect } from "react";
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

import { db } from './firebase/firebase'



var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("Check your email.");
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
  },
};






const SignIn = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [user, setUser] = useState(null);



  async function handleSubmit(e) {
    e.preventDefault()
    console.log(emailRef.current.value)
    try {
      console.log("saaaaaamiiiiiii3")
      console.log(emailRef.current.value)
      db.collection("Admin").doc(emailRef.current.value).get()
      .then(doc => {
        if(doc.exists){
          console.log(doc.exists)
          setError("")
        setLoading(true)
         login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
        }
        
        
      }).catch(
        err => console.dir(err)
      )

      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

 
    return (
      <>
      <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
          <Container>

<Navbar.Brand  href="/">Paris JJ</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
        <Nav.Link href="/signIn">Sign In</Nav.Link>
        <Nav.Link href="/register">Sign Up</Nav.Link>
       
    </Nav>
</Navbar.Collapse>
</Container>

          </Navbar>
          <Card>
      <Card.Body>
         
            <Row className="landing">
        <Col > <div>
            <br/>
            <br/>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>

            <h1> Sign in and </h1>  
            <h1>let's discover</h1>
              
           
          <br/>
                <Form.Group  id="email">
                    <Form.Label >Enter your email</Form.Label>
                    <Form.Control size="lg" type="email" ref={emailRef} required placeholder=" email" />
                </Form.Group>
                <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control size="lg" type="password" ref={passwordRef} required placeholder=" password" />
            </Form.Group>
            
                <br></br>
                
                <>
  <style type="text/css">
    {`
    .btn-flat {
      background-color: #ff4f5a ;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
  </style>

  <Button disabled={loading} className="w-100" variant="flat" size="xxl" type="submit">
  Log In
  </Button>
  <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
  <StyleFirebaseAuth  uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  
</>
            </Form>
        </div></Col>
        
        <Col > <div>
           <Image src={imagevar} thumbnail style={{border:"none"}} /> 
        </div></Col>
        
      </Row>
      </Card.Body>
      </Card>
      </div>
      
      </>
    );
  }



export default SignIn