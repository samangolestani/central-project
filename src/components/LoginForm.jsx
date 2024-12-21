
import { useState } from 'react';
import {json} from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function LoginForm(){
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [enteredNationalCode, setEnteredNationalCode] = useState('')
    const [enteredPassword, setEnteredPassword] = useState()
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        //if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        
          const encoder = new TextEncoder();
          const data = encoder.encode(enteredPassword)
        
          // Generate SHA-256 hash
        
          const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
          // Convert the hash to base64
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const base64Hash = btoa(hashArray.map(byte => String.fromCharCode(byte)).join(''));
        
          //const data = await request.formData();
          const authData = {
            nationalcode: enteredNationalCode,
            password: base64Hash,
          };
        
        
        
          const response = await fetch('http://localhost:3001/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
          });
        
        
        
          if (response.statusCode === 404) {
            return response;
          }
        
          if (!response.ok) {
            throw json({ message: 'nationalcode or password is not valid' }, { status: 500 })
          }
          const resData = await response.json();
        
          const token = resData.accessToken;
        
          console.log(token)
          
        
          localStorage.setItem('token', token);
        
        
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);
          localStorage.setItem('expiration', expiration.toISOString());
          document.cookie = "jwt=" + encodeURIComponent(token) + "; expires=" + expiration.toUTCString() + "; path=/; Secure";
          navigate('/')
        
       
        setValidated(true);
      };

      const handleEmailChange = (ev) => {
        setEnteredNationalCode(ev.currentTarget.value)
      }
      const handlePasswordChange = (ev) => {
        setEnteredPassword(ev.currentTarget.value)
      } 
      return (
<div className="min-vh-100 d-flex justify-content-center align-items-center login-bg">
  <Container>
    <Row className="justify-content-center" >
      <Col xs={8} sm={8} md={8} lg={8} xxl={10}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title as="h1" className="text-center">ورود</Card.Title>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group as={Row} className="mb-3" controlId="username">
                <Form.Label column sm={4} className="text-start text-sm-end">
                  Username
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleEmailChange}
                    aria-label="Username"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm={4} className="text-start text-sm-end">
                  Password
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={handlePasswordChange}
                    aria-label="Password"
                  />
                </Col>
              </Form.Group>
              <Button type="submit" className="w-100 btn btn-primary">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</div>
)
    }
        
