import React, { Component } from 'react'

import { db } from './firebase/firebase'
import "bootstrap/dist/css/bootstrap.css"
import {Button }  from 'react-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";
import {Image} from "react-bootstrap";
import imagevar from "./assets/images/signIn.jpg"
import "bootstrap/dist/css/bootstrap.css"
import {Card }  from 'react-bootstrap'
import { Alert} from "react-bootstrap";
import  {useRef, useState, useEffect } from "react";
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext"



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
    
    
    
    
    
    
    const Register = () => {
      const emailRef = useRef()
      const passwordRef = useRef()
      const passwordConfirmRef = useRef()
      const [user, setUser] = useState(null)
      const [error, setError] = useState("")
      const [loading, setLoading] = useState(false)
      const history = useHistory()
      const { signup } = useAuth()
    
      async function handleSubmit(e) {
        e.preventDefault()
    
       if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          
            const user = firebase.auth().currentUser;
            const authObserver = firebase.auth().onAuthStateChanged((user) => {
              db.collection('Admin').doc(user.email).set({
                'email': user.email
            })
              setUser(user);
            });
          
          history.push("/")
        } catch(err) {
          setError("Failed to create an account")
          console.log(err)
        }
    
        setLoading(false)
      }
    
      useEffect(() => {
        const user = firebase.auth().currentUser;
        const authObserver = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
        });
        return authObserver;
      });
    
      console.log("user", user);


      
       
    
     
        
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
                <h1> If you already has an account  </h1>  
            <h1>just sign in , we've missed you!</h1>
              <br/>
                    <Form.Group  id="email">
                        <Form.Label >Enter your email</Form.Label>
                        <Form.Control size="lg" type="email" ref={emailRef} required placeholder=" email" />
                    </Form.Group>
                    <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control size="lg" type="password" ref={passwordRef} required placeholder=" password" />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control size="lg" type="password" ref={passwordConfirmRef} required placeholder=" password" />
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
      Submit
      </Button>
      
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
  
    


export default Register