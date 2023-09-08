import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Alert, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Description from './components/Description';
import FeaturedAuthors from './components/FeaturedAuthors';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';
// https://api.content.tripadvisor.com/api/v1/location/search
function App() : JSX.Element {

  // FETCH 'SEARCH' ENDPOINT
  // const fetchSearch = () => {
  //   axios.get('https://proxy.junocollege.com/https://api.content.tripadvisor.com/api/v1/location/search', {
  //     params: {
  //       key: '5D870B1826CC4460BFB3D056ADB08E60', 
  //       searchQuery: 'New York', 
  //       language: 'en', 
  //       category: 'hotels'
  //     },
  //       headers: {
  //         accept: 'application/json'
  //       }
  //   })
  //     .then(response => {
  //       console.log(response.data); // Update state with API data // Set loading to false
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     // Set loading to false in case of an error
  //     });
  //   }

  //   // FETCH 'HOTEL DETAILS' ENDPOINT
  //   const fetchDetails = () => {
  //     axios.get('https://proxy.junocollege.com/https://api.content.tripadvisor.com/api/v1/location/126260/details', {
  //       params: {
  //         key: '5D870B1826CC4460BFB3D056ADB08E60', 
  //         language: 'en', 
  //         currency: 'USD'
  //       },
  //         headers: {
  //           accept: 'application/json'
  //         }
  //     })
  //       .then(response => {
  //         console.log(response.data); // Update state with API data // Set loading to false
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       // Set loading to false in case of an error
  //       });
  //     }


    // useEffect(() => {
    //   // fetchSearch();
    // }, [])
  
  return (
    <>
      <Navigation />
      <Header />
      <Description />
      <FeaturedAuthors />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
