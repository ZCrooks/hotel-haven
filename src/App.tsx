import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Alert, Breadcrumb } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Description from './components/Description';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';


function App() {


  return (
    <>
      <Navigation />
      <Header />
      <Description />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
