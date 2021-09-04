import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";


import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { useState } from "react";
import firebase from "firebase";
import { useEffect } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span style={{ textDecoration: "none" }}>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );
  if (user) {
    return (
      <div className="sidebar">
        <div className="sidebar__logo">
          <h1>Paris JJ</h1>
        </div>
        {sidebar_items.map((item, index) => (
          <Link
            to={item.route}
            key={index}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))}
        <br></br>
      </div>
    );
  } else {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Paris JJ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/signIn">Sign In</Nav.Link>
              <Nav.Link href="/register">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default Sidebar;
