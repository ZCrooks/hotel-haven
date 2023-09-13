import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Description from './components/Description';
import FeaturedRenters from './components/FeaturedRenters';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';


function App() : JSX.Element {
  // Set Updated Form Data (User choices)
  const [updateForm, setUpdateForm] = useState("")

  // Set User's Selected City
  const [selectedCity, setSelectedCity] = useState({
    location: "",
    checkin: "",
    checkout: "",
    adults: ""
  });

  // FETCH 'SEARCH' ENDPOINT
  const fetchSearch = () => {
    axios.get('https://airbnb13.p.rapidapi.com/search-location', {
    params: {
      location: 'New York City',
      checkin: '2023-11-16',
      checkout: '2023-11-25',
      adults: '1',
    },
    headers: {
      'X-RapidAPI-Key': 'b384381131mshccb5ef49cf63d0cp1af8a5jsn8468569435f3',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        console.log(response.data); // Update state with API data // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      // Set loading to false in case of an error
      });
    }

    // useEffect(() => {
    //   fetchSearch();
    // }, [])

    // HANDLE FORM SUBMISSION
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("success")
    }

    // HANDLE FORM INPUT CHANGES
    const handleChange = (e) => {
      const value = e.target.value
      setSelectedCity ({
        ...selectedCity,
        [e.target.name]: value
      })
    }

    // HANDLE DATE RANGE SELECTIONS
    const handleDateRangeChange = (value) => {
      console.log(value)
      if (value) {
        setSelectedCity({
          ...selectedCity,
          checkin: value[0].toLocaleDateString(),
          checkout: value[1].toLocaleDateString()
        })
      }
    }

    console.log(selectedCity)
  
  return (
    <>
      <Navigation />
      <Header 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <Description />
      <FeaturedRenters />
      <Newsletter />
      <Footer />
    </>
  )
}

export default App
