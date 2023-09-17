import { useState, useEffect } from 'react'
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Results from './components/Results';
import Description from './components/Description';
import FeaturedRenters from './components/FeaturedRenters';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';


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

  // SET SEARCH RESULTS
  const [results, setResults] = useState([]);


  // USEEFFECT TO HANDLE FETCHSEARCH FUNCTION UPON STATE CHANGE
  useEffect(() => {
      fetchSearch();
    }, [])


  // FETCH 'SEARCH' ENDPOINT (AIRBNB API)
  const fetchSearch = () => {
    axios.get('https://airbnb13.p.rapidapi.com/search-location', {
    params: {
      location: "New York",
      checkin: "2023-10-17",
      checkout: "2023-10-31",
      adults: "2",
      // location: selectedCity.location,
      // checkin: selectedCity.checkin,
      // checkout: selectedCity.checkout,
      // adults: selectedCity.adults,
    },
    headers: {
      'X-RapidAPI-Key': 'b384381131mshccb5ef49cf63d0cp1af8a5jsn8468569435f3',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        setResults(response.data.results)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      // Set loading to false in case of an error
      });
    }

    // HANDLE PROPERTY SEARCH USER SUBMISSION
    const handleSubmit = (e) => {
      e.preventDefault();
    }

    // HANDLE PROPERTY SEARCH FORM INPUT CHANGES
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

    // console.log(selectedCity)
  
    const handleReset = () => {
      setResults([])
    }
  return (
    <>
      <Navigation />
      <Header 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        handleDateRangeChange={handleDateRangeChange}
        results={results}
      />

      {results.length > 0 ? (
        <>
        <Results 
          handleReset={handleReset}
          results={results}
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
  )
}

export default App
