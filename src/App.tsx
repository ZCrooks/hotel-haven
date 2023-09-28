import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Rental } from './interfaces/Rental';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Results from './components/Results';
import Property from './components/Property';
import Description from './components/Description';
import FeaturedRenters from './components/FeaturedRenters';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';
import { onValue } from 'firebase/database';


function App() : JSX.Element {
  // SET UPDATED FORM DATA (USER CHOICES)
  const [updateForm, setUpdateForm] = useState("")

  // SET USER'S SELECTED CITY
  const [selectedCity, setSelectedCity] = useState({
    location: "",
    checkin: "",
    checkout: "",
    adults: "",
  });

  const [currency, setCurrency] = useState("");

  // SET SEARCH RESULTS
  const [results, setResults] = useState([]);

  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  // SET LOADING STATE
  const [loading, setLoading] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState({
    //   name: "",
    // rating: "", 
    // address: "",
    // type: "",
    // pricePerNight: "",
    // totalPrice: "",
    // beds: "",
    // bathrooms: "",
    // bedrooms: "",
    // persons: ""
  });
 
  const [showProperty, setShowProperty] = useState(false);
  

  // FETCH 'SEARCH' ENDPOINT (AIRBNB API)
  const fetchSearch = () => {
    axios.get('https://airbnb13.p.rapidapi.com/search-location', {
    params: {
      location: selectedCity.location.toString(),
      checkin: selectedCity.checkin.toString(),
      checkout: selectedCity.checkout.toString(),
      adults: selectedCity.adults.toString(),
    },
    headers: {
      'X-RapidAPI-Key': 'b384381131mshccb5ef49cf63d0cp1af8a5jsn8468569435f3',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        setResults(response.data.results)
        setLoading(false);
      })
      .catch(error => {
        alert('Error fetching data');
      });
    }

  const autoComplete = (value) => {
    axios.get('https://airbnb13.p.rapidapi.com/autocomplete', {
    params: {
      query: value
    },
    headers: {
      'X-RapidAPI-Key': 'b384381131mshccb5ef49cf63d0cp1af8a5jsn8468569435f3',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        setAutoCompleteResults(response.data)
      })
      .catch(error => {
        alert('Error fetching data'); 
      });
  }

    // HANDLE PROPERTY SEARCH FORM INPUT CHANGES
    const handleChange = (e) => {
      const value = e.target.value
      setSelectedCity ({
        ...selectedCity,
        [e.target.name]: value
      })
      if (e.target.name === "location") {
        autoComplete(value)
      }
    }

    // HANDLE DATE RANGE SELECTIONS
    const handleDateRangeChange = (value) => {
      if (value) {
        setSelectedCity({
          ...selectedCity,
          checkin: value[0].toLocaleDateString(),
          checkout: value[1].toLocaleDateString()
        })
      }
    }
    
    // HANDLE PROPERTY SEARCH USER SUBMISSION
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setCurrency("usd");
      fetchSearch();
    }

    // HANDLE RESET OF RESULTS AND USER INPUT
    const handleReset = () => {
      setResults([])
      setSelectedCity({
        location:"",
        checkin: "",
        checkout:"",
        adults: ""
      })
    }

    // HANDLE CLICK ON EACH PROPERTY CARD THAT COMES UP AFTER SEARCH
    const handleSelect = (property) => {
        setShowProperty(true)
        setSelectedProperty({
          ...selectedProperty,
          name: property.name,
          rating: property.rating,
          address: property.address,
          type: property.type,
          beds: property.beds,
          images: property.images,
          bathrooms: property.bathrooms,
          bedrooms: property.bedrooms,
          persons: property.persons,
          totalPrice: property.price.total,
          pricePerNight: property.price.rate,
          reviewsCount: property.reviewsCount,
          hostPic: property.hostThumbnail,
          previewAmenities: property.previewAmenities,
          amenityIds: property.amenityIds,
          price: property.price
        })
    }

    const handleGoBack = () => {
      setShowProperty(false)
    }

  return (
    <>
      <Navigation
        handleReset={handleReset} 
      />
      <Header 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleDateRangeChange={handleDateRangeChange}
        results={results}
        autoCompleteResults={autoCompleteResults}
      />
      {showProperty ? (
        <>
         <Property
         handleGoBack={handleGoBack}
         selectedProperty={selectedProperty} /> 
         ) 
         <Footer />
         </> ) : (
          <>
           {loading ?
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span> 
          </Spinner> 
        </div> : 
          results.length > 0 ? (
            <>
              <Results 
                handleReset={handleReset}
                results={results}
                currency={currency}
                setCurrency={setCurrency}
                handleSelect={handleSelect}
              />
              <Newsletter />
              <Footer />
            </>
            ) : ( 
            <>
              <Description />
              <FeaturedRenters />
              <Newsletter />
              <Footer />
            </>
          )}
          </>
         )}
    </>
  )
}

export default App
