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
import { useEffect , useState} from 'react';

function FormPage(props) {
  
    const saveAnswer = (event) => {
      event.preventDefault();
      const elementsArray = [...event.target.elements];
  
      const formData = elementsArray.reduce((accumulator, currentValue) => {
        if (currentValue.id) {
          if(currentValue.id ==='title' || currentValue.id ==='prix'|| currentValue.id ==='category'|| currentValue.id ==='oldprix'|| currentValue.id ==='description')
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
            const ImageData = elementsArray.reduce((accumulator, currentValue) => {
              if (currentValue.id) {
                if(currentValue.id ==='image1' || currentValue.id ==='image2' || currentValue.id ==='image3'|| currentValue.id ==='image4' ){
                  db.collection("produits").doc(docRef.id).set(
                   
                  {'categoryId':uid ,'id':docRef.id , 'images': firebase.firestore.FieldValue.arrayUnion(currentValue.value)},{merge:true}  
                ).then(()=> window.location.href="/Products")
                .catch((err)=>console.log(err.message) )  }
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
            <Form.Control size="lg"  id="prix" type="text"  required placeholder=" price" />
          </Form.Group>
          <Form.Group >
            <Form.Label>oldprice</Form.Label>
            <Form.Control size="lg"  id="oldprix" type="text"  required placeholder=" oldprice" />
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
          <MenuItem value={"2xyxcmoLeg5ZDXDDSJO3"}>Clothing</MenuItem>
          <MenuItem value={"3OrHH9dWRjIFZlscXF10"}> Bags Accs</MenuItem>
          <MenuItem value={"OaMNnurnPIQPkbfppitm"}>Shoes</MenuItem>
          <MenuItem value={"x1UkcfU99mTGtAZWeCPv"}>Sportswear</MenuItem>
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
}

export default FormPage;