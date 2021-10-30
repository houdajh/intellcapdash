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
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
//import "animate.css/source/animate.css";
import { useHistory } from "react-router-dom";

function FormPage(props) {

  let history = useHistory();
 

  const [categorie, setCategory] = React.useState('');
    const [inputs, setInputs] = React.useState({
      titre : "",
      description : "",
      prix : 0,
      oldPrix : 0,
      images : [] 
    })

    const saveAnswer = (event) => {
      // disable the default behaviour of form tag
      event.preventDefault();

      db.collection("produits").add(inputs)
      .then( docRef => {
        
        var select = document.getElementById('category');
        var uid;
        var cat = db.collection("categorie");
        
        cat.where("titre","==",select.innerText).get()
        .then( value => {    
          value.docs.forEach( element => {
            
            uid = element.id;
           // elementsArray.reduce((accumulator, currentValue) => {
            //  if (currentValue.id) {
            //    if(currentValue.id ==='image1' || currentValue.id ==='image2' || currentValue.id ==='image3'|| currentValue.id ==='image4' ){
              
            db.collection("produits").doc(docRef.id.trim()).set(
              {
                'categorieId':uid ,
                'countlikes':0 ,  
                'id':docRef.id , 
                //'images': inputs.links /firebase.firestore.FieldValue.arrayUnion(currentValue.value)/
              },
              {merge:true})
              .then(()=>{
                window.location.href="/products";
                console.log("product added");
              
              
            })
              // .catch( err => console.log(err.message) ) 
          })});
         

          

        });
    
    }

    const HandleChange = (event) => {
      setCategory(event.target.value);
    };

    const handleInputsChanges = (e) => {
      setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const handleLinksChange = (e, index) => {
        let updatedLinks = [...inputs.images];
        updatedLinks[index] = e.target.value
        setInputs({...inputs, images : [...updatedLinks] })
    }
    
    

  return (
    <>
    <div>
        <Card>
          <Card.Body>
            <Row className="landing">
              <Col >
                <div>
                <Form onSubmit={saveAnswer} style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
                  <h1> Add new product  </h1> 
                 
                  <br/>
                  <Form.Group >
                    <Form.Label>title</Form.Label>
                    <Form.Control style={{ width:"70%" }} size="lg" name="titre" id="titre" type="text"  required placeholder="titre" onChange={handleInputsChanges}/>
                  </Form.Group>
              {/* <Form.Group  >
                  <Form.Label >category</Form.Label>
                  <Form.Control id="category" size="lg" type="text"  required placeholder=" category " />
              </Form.Group> */}
              {/* nn ga3 makatpushi l products w mazadtch id ... */}
              {/* khadi njreb akhir solution 3la allah */}
              <Form.Group >
            <Form.Label>description</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg" name="description" id="description" type="text" required placeholder="description" 
              onChange={handleInputsChanges} />
          </Form.Group>
          <Form.Group >
            <Form.Label>price</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg" name="prix" id="prix" type="text"  required placeholder=" prix" onChange={handleInputsChanges}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>oldprice</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg" name="oldPrix" id="oldPrix" type="text"  required placeholder=" oldPrix" onChange={handleInputsChanges}/>
          </Form.Group>
        

          <Form.Group >
            <Form.Label>picture 1</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg" id="image1" type="text" required placeholder="Link 1" 
            onChange={(e) => handleLinksChange(e, 0)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 2</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg"  id="image2" type="text"   placeholder="Link 2" onChange={(e) => handleLinksChange(e, 1)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 3</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg"  id="image3" type="text"   placeholder="Link 3" onChange={(e) => handleLinksChange(e, 2)}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 4</Form.Label>
            <Form.Control style={{ width:"70%" }} size="lg"  id="image4" type="text"   placeholder="Link 4" onChange={(e) => handleLinksChange(e, 3)}/>
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
          style={{ width:"70%" }}
          value={categorie}
          onChange={HandleChange}
        >
         
          <MenuItem value={10}>Clothing</MenuItem>
          <MenuItem value={20}>Bags Accs</MenuItem>  
          <MenuItem value={30}>Shoes</MenuItem>
          <MenuItem value={40}>Sportswear</MenuItem>
        </Select>
<br></br>
<br></br>
<Button  className="w-100" variant="flat" size="xl" type="submit" >
ADD
</Button>

      
</>
</Form>        
      
      
      </div>
      </Col>
    </Row>
   
    </Card.Body>
    </Card>
    
    </div>
    </>
  );
}

export default FormPage;