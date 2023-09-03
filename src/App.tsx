import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Alert, Breadcrumb } from 'react-bootstrap';
import Nav from './components/nav';
import Header from './components/header';
import Home from './components/Home';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css'

function App() {


  return (
    <>
      <Nav />
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
      </Breadcrumb>
      <Button>BUTTON TEST</Button>
      <Alert>This is not a drill!</Alert>
      <Home />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
