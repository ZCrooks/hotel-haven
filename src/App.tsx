import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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

  // SET CURRENCY
  const [currency, setCurrency] = useState("");

  // SET SEARCH RESULTS
  const [results, setResults] = useState([]);

  // SET AUTOCOMPLETE RESULTS
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  // SET LOADING STATE
  const [loading, setLoading] = useState(false);

  // SET PROPERTY SELECTED
  const [selectedProperty, setSelectedProperty] = useState({});
 
  // TOGGLE PROPERTY DETAILS DISPLAYING UPON CLICK
  const [showProperty, setShowProperty] = useState(false);

  // SET PLACEID (GOOGLE MAPS)
  const [placeID, setPlaceID] = useState("");

  // SET PLACE DETAILS (TO FIND PHOTO REFERENCE)
  const [placeDetails, setPlaceDetails] = useState([]);

  // SET SELECTED CITY'S PHOTO
  const [locationPhoto, setLocationPhoto] = useState(null);

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
        alert ("No properties found. Please try again!")
      });
    }
// axios.get('https://airbnb13.p.rapidapi.com/autocomplete', 
  // AUTOCOMPLETE SEARCH BAR
  const autoComplete = (value) => {
    axios.get('https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/autocomplete/json', {
    params: {
      input: value,
      key: 'AIzaSyBUMsi4yxyoCtP5XxFHX51HXIDqfV3Y2a8'
    },
    headers: {
      'X-RapidAPI-Key': 'b384381131mshccb5ef49cf63d0cp1af8a5jsn8468569435f3',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        console.log(response.data.predictions)
        setAutoCompleteResults(response.data.predictions)
      })
      .catch(error => {
        alert('Error fetching data'); 
      });
  }

  // GOOGLE FETCH PLACES (CITY IDS)
  const fetchPlaces = () => {
    axios.get('https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
      params: {
        input: selectedCity.location,
        inputtype: 'textquery',
        key: 'AIzaSyBUMsi4yxyoCtP5XxFHX51HXIDqfV3Y2a8'
      }
    })
    .then(response => {
      if (response.data.candidates[0]) {
        setPlaceID(response.data.candidates[0].place_id)
      } else {
        return;
      } 
    })
    .catch(error => {
      console.error("Error with data", error);
    })
  }
    // GOOGLE FETCH PLACES (CITY IDS)
  const fetchDetails = () => {
    axios.get('https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeID,
        key: 'AIzaSyBUMsi4yxyoCtP5XxFHX51HXIDqfV3Y2a8'
      }
    })
    .then(response => {
      if (response.data.result) {
        // Find Photos Array
        setPlaceDetails(response.data.result.photos)
        // Set City Photo to first pic returned from array (based on text query)
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=${response.data.result.photos[0].photo_reference}&key=AIzaSyBUMsi4yxyoCtP5XxFHX51HXIDqfV3Y2a8`;
        setLocationPhoto(imageUrl);
      } 
    })
    .catch(error => {
      console.error("Error with data", error)
    })
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      await fetchPlaces();
      await fetchDetails();
    } catch (error) {
      // Handle errors
      console.error("Error fetching data", error);
    }
  };
  fetchData();
}, [selectedCity, results]);


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
          price: property.price,
          lng: property.lng,
          lat: property.lat
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
        locationPhoto={locationPhoto}
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
                selectedCity={selectedCity}
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

export default App;
