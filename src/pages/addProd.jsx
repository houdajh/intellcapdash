import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {Button }  from 'react-bootstrap'
import MenuItem from '@material-ui/core/MenuItem';
import { Dropdown } from 'bootstrap';
import { Navbar, Nav,  Container } from 'react-bootstrap';
import { Col, Row, Form } from "react-bootstrap";
import {Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import {Card }  from 'react-bootstrap'
import { db } from '../firebase/firebase';
import firebase from "firebase";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import imagevar from "../assets/images/signIn.jpg";
import { useEffect , useState} from 'react';

function FormPage(props) {
  
    const saveAnswer = (event) => {
      event.preventDefault();
      const elementsArray = [...event.target.elements];
  
      const formData = elementsArray.reduce((accumulator, currentValue) => {
        if (currentValue.id) {
          if(currentValue.id ==='title' || currentValue.id ==='price'|| currentValue.id ==='nbNote'|| currentValue.id ==='oldprice'|| currentValue.id ==='description')
          accumulator[currentValue.id] = currentValue.value;
        }
  
        return accumulator;
      },{});
  
      console.log({formData});
      db.collection("produits").add(formData).then(function (docRef) {
        var select = document.getElementById('category');
        var uid;
        var cat = db.collection("categorie");
         cat.where("titre","==",select.innerText).get().then(function(value){
          value.docs.forEach(function(element){
            
            uid=element.id;
             elementsArray.reduce((accumulator, currentValue) => {
              if (currentValue.id) {
                if(currentValue.id ==='image1' || currentValue.id ==='image2' || currentValue.id ==='image3'|| currentValue.id ==='image4' ){
                  db.collection("produits").doc(docRef.id).set(
                   
                  {
                    'categoryId':uid ,
                    'id':docRef.id , 
                    'images': firebase.firestore.FieldValue.arrayUnion(currentValue.value)
                  },{merge:true}  
                ).then(()=> console.log("window.location.href=/products"))
                .catch((err)=>console.log(err.message) ) 
               }
               }
              return accumulator;
            },{});

          });
        });
        
    });
    
    
    
    };
    const HandleChange = (event) => {
      setCategory(event.target.value);
    };
    
    const [categorie, setCategory] = React.useState('');



    const [user, setUser] = useState(null);
    useEffect(() => {
      const authObserver = firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
      return authObserver;
    });

    if (user ) {
  return (
    <>
    <div>
      

        <Card>
    <Card.Body>
       
          <Row className="landing">
      <Col > <div>
          
          <Form onSubmit={saveAnswer} style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
          <h1> Add new product  </h1>  
      
        <br/> <Form.Group >
            <Form.Label>title</Form.Label>
            <Form.Control size="lg"  id="title" type="text"  required placeholder="title" />
          </Form.Group>
              {/* <Form.Group  >
                  <Form.Label >category</Form.Label>
                  <Form.Control id="category" size="lg" type="text"  required placeholder=" category " />
              </Form.Group> */}
              
              <Form.Group >
            <Form.Label>description</Form.Label>
            <Form.Control size="lg" id="description" type="text"  required placeholder=" description" />
          </Form.Group>
          <Form.Group >
            <Form.Label>price</Form.Label>
            <Form.Control size="lg"  id="price" type="text"  required placeholder=" price" />
          </Form.Group>
          <Form.Group >
            <Form.Label>oldprice</Form.Label>
            <Form.Control size="lg"  id="oldprice" type="text"  required placeholder=" oldprice" />
          </Form.Group>
          
          <Form.Group >
            <Form.Label>picture 1</Form.Label>
            <Form.Control size="lg"  id="image1" type="text"  required placeholder="Link 1" />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 2</Form.Label>
            <Form.Control size="lg"  id="image2" type="text"   placeholder="Link 2" />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 3</Form.Label>
            <Form.Control size="lg"  id="image3" type="text"   placeholder="Link 3" />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 4</Form.Label>
            <Form.Control size="lg"  id="image4" type="text"   placeholder="Link 4" />
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
<InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select id='category'
          labelId="demo-simple-select-label"
          
          value={categorie}
          onChange={HandleChange}
        >
          <MenuItem value={10}>Clothing</MenuItem>
          <MenuItem value={20}> Bags Accs</MenuItem>
          <MenuItem value={30}>Shoes</MenuItem>
          <MenuItem value={40}>Sportswear</MenuItem>
        </Select>
<br></br>
<br></br>
<Button  className="w-100" variant="flat" size="xl" type="submit">
ADD
</Button>

</>
          </Form>
      </div></Col>
      
      
    </Row>
    </Card.Body>
    </Card>
    </div>
    
    </>
  );
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

export default FormPage;