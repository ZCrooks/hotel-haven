import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Alert, Breadcrumb } from 'react-bootstrap';
import './App.css'

function App() {


  return (
    <>
    <h1>TEST</h1>
    <Breadcrumb>
      <Breadcrumb.Item>Test</Breadcrumb.Item>
    </Breadcrumb>
    <Button>BUTTON TEST</Button>
    <Alert>This is not a drill!</Alert>
    </>
  )
}

export default App
