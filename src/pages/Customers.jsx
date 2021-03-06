import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Col, Row } from "react-bootstrap";
import { db } from "../firebase/firebase";
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";

function Customers() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        setUsers(users);
      })
      .catch((error) => console.log(error));
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });
  
    return (
      <div className="Customers">
        <thead className="thead-dark">
          <h1>Customers List</h1>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>email</th>
            <th>phone number</th>
            <th>address</th>
          </tr>
        </thead>
        {users &&
          users.map((users) => {
            return (
              <tr>
                <td>{users.first_name}</td>
                <td>{users.last_name}</td>
                <td>{users.email}</td>
                <td>{users.phone_number}</td>
                <td>{users.address}</td>
              </tr>
            );
          })}
      </div>
    );
  
  
}

export default Customers;
