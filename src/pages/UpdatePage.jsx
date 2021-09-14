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
import { useSelector } from 'react-redux'
function UpdatePage(props) {
    
    const saveAnswer = (event) => {
      event.preventDefault();
      const elementsArray = [...event.target.elements];
  
      const formData = elementsArray.reduce((accumulator, currentValue) => {
        if (currentValue.id) {
          if(currentValue.id ==='titre' || currentValue.id ==='prix'|| currentValue.id ==='category'|| currentValue.id ==='nbNote'|| currentValue.id ==='oldPrix'|| currentValue.id ==='description')
          accumulator[currentValue.id] = currentValue.value;
        }
  
        return accumulator;
      },{});
  
      console.log({formData});
      db.collection("produits").doc(props.location.state.id.trim()).delete();
      db.collection("produits").doc(props.location.state.id.trim()).set(formData,{merge:true}).then(function (docRef) {
        var select = document.getElementById('category');
        var uid;
        var cat = db.collection("categorie");
         cat.where("titre","==",select.innerText).get().then(function(value){
          value.docs.forEach(function(element){
            
            uid=element.id;
           elementsArray.reduce((accumulator, currentValue) => {
              if (currentValue.id) {
                if(currentValue.id ==='image1' || currentValue.id ==='image2' || currentValue.id ==='image3'|| currentValue.id ==='image4' ){
                  db.collection("produits").doc(props.location.state.id.trim()).set(
                   
                  {'categorieId':uid ,
                   'id':props.location.state.id.trim(), 
                   'images': firebase.firestore.FieldValue.arrayUnion(currentValue.value)
                  },{merge:true}  
                ).then(()=> window.location.href="/products")
                .catch((err)=>console.log(err.message) )  }
               }
        
              return accumulator;
            },{});

          })
        });
        
    });
     };
     const themeReducer = useSelector(state => state.ThemeReducer.mode)
      let [titleP, setTitle] = React.useState("");
      let [descriptionP, setdescriptionP] = React.useState("");
      let [priceP, setpriceP] = React.useState();
      let [oldPriceP, setoldPriceP] = React.useState();
      let [picture1P, setpicture1P] = React.useState("");
      let [picture2P, setpicture2P] = React.useState("");
      let [picture3P, setpicture3P] = React.useState("");
      let [picture4P, setpicture4P] = React.useState("");
      const getData=async(id)=>{
       var updatedProduct=db.collection("produits");
      await updatedProduct.doc(id).get().then(function(element){
        titleP = element.data().titre;
         setTitle(titleP);
         descriptionP = element.data().description;
         setdescriptionP(descriptionP);
         priceP = element.data().prix;
         setpriceP(parseFloat(priceP));
         oldPriceP = element.data().oldPrix;
         setoldPriceP(oldPriceP);
        // nbNoteP = element.data().nbNote;
        // setnbNoteP(nbNoteP);
         picture1P = element.data().images[0];
         setpicture1P(picture1P);
         picture2P = element.data().images[1];
         setpicture2P(picture2P);
         picture3P = element.data().images[2];
         setpicture3P(picture3P);
         picture4P = element.data().images[3];
         setpicture4P(picture4P);
         });
      
    }
    console.log(props.location.state.id)

    getData(props.location.state.id.trim());
    const HandleChange = (event) => {
      setCategory(event.target.value);
    };
    
    const [categorie, setCategory] = React.useState(props.location.state.idq);
   
   
  return (
    
    <>
    <div>
      

        <Card>
    <Card.Body>
       
          <Row className="landing">
      <Col > <div>
          
          <Form onSubmit={saveAnswer} style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
          <h1> Edit product  </h1>  
      
        <br/> <Form.Group >
            <Form.Label>title</Form.Label>
            <Form.Control size="lg"  id="titre" type="text"  required defaultValue={titleP} />
          </Form.Group>
              {/* <Form.Group  >
                  <Form.Label >category</Form.Label>
                  <Form.Control id="category" size="lg" type="text"  required placeholder=" category " />
              </Form.Group> */}
              
              <Form.Group >
            <Form.Label>description</Form.Label>
            <Form.Control size="lg" id="description" type="text"  required defaultValue={descriptionP} />
          </Form.Group>
          <Form.Group >
            <Form.Label>price</Form.Label>
            <Form.Control size="lg"  id="prix" type="number"  required defaultValue={priceP} />
          </Form.Group>
          <Form.Group >
            <Form.Label>oldprice</Form.Label>
            <Form.Control size="lg"  id="oldPrix" type="number"  required defaultValue={oldPriceP} />
          </Form.Group>
         
          <Form.Group >
            <Form.Label>picture 1</Form.Label>
            <Form.Control size="lg"  id="image1" type="text"  required defaultValue={picture1P} />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 2</Form.Label>
            <Form.Control size="lg"  id="image2" type="text"  defaultValue={picture2P} />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 3</Form.Label>
            <Form.Control size="lg"  id="image3" type="text"  defaultValue={picture3P} />
          </Form.Group>
          <Form.Group >
            <Form.Label>picture 4</Form.Label>
            <Form.Control size="lg"  id="image4" type="text"  defaultValue={picture4P} />
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
          required
          value={categorie}
          onChange={HandleChange}
        >
          <MenuItem value={"2xyxcmoLeg5ZDXDDSJO3"}>Clothing</MenuItem>
          <MenuItem value={"3OrHH9dWRjIFZlscXF10"}>Bags Accs</MenuItem>
          <MenuItem value={"OaMNnurnPIQPkbfppitm"}>Shoes</MenuItem>
          <MenuItem value={"x1UkcfU99mTGtAZWeCPv"}>Sportswear</MenuItem>
        </Select>
<br></br>
<br></br>
<Button  className="w-100" variant="flat" size="xl" type="submit" >
UPDATE
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

export default UpdatePage;