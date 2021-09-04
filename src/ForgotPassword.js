import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./context/AuthContext"
import { Link } from "react-router-dom"

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';





export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br></br>
            <Button variant="danger"  disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/signIn">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </>
  )
}