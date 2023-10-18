import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Results from './components/Results';
import Property from './components/Property';
import Description from './components/Description';
import FeaturedRenters from './components/FeaturedRenters';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { City } from './interfaces/City';
import { PropertyDetails } from './interfaces/PropertyDetails';
import { ChangeEvent, FormEvent } from 'react';
import './App.css';


function App(): JSX.Element {
  // API KEYS
  const rapidAPIKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;
  const googleAPIKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

  // SET USER'S SELECTED CITY
  const [selectedCity, setSelectedCity] = useState<City>({
    location: "",
    checkin: "",
    checkout: "",
    adults: "",
  });

  // SET CURRENCY
  const [currency, setCurrency] = useState<string>("");

  // SET SEARCH RESULTS
  const [results, setResults] = useState([]);

  // SET AUTOCOMPLETE RESULTS
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);

  // SET LOADING STATE
  const [loading, setLoading] = useState<boolean>(false);

  // SET PROPERTY SELECTED
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails>({
    name: "",
    rating: 0,
    address: "",
    type: "",
    beds: 0,
    images: [],
    bathrooms: 0,
    bedrooms: 0,
    persons: 0,
    totalPrice: 0,
    pricePerNight: 0,
    reviewsCount: 0,
    hostThumbnail: "",
    previewAmenities: [],
    amenityIds: [],
    price: {},
    lng: 0,
    lat: 0,
    deeplink: ""
  });
 
  // TOGGLE PROPERTY DETAILS DISPLAYING UPON CLICK
  const [showProperty, setShowProperty] = useState<boolean>(false);

  // SET PLACEID (GOOGLE MAPS)
  const [placeID, setPlaceID] = useState<string>("");

  // SET SELECTED CITY'S PHOTO
  const [locationPhoto, setLocationPhoto] = useState<string>("");

  // FETCH 'SEARCH' ENDPOINT (AIRBNB API)
  const fetchSearch = () => {
    axios.get('https://proxy.junocollege.com/https://airbnb13.p.rapidapi.com/search-location', {
    params: {
      location: selectedCity.location.toString(),
      checkin: selectedCity.checkin.toString(),
      checkout: selectedCity.checkout.toString(),
      adults: selectedCity.adults.toString(),
    },
    headers: {
      'X-RapidAPI-Key': rapidAPIKey,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        setResults(response.data.results)
        setLoading(false);
      })
      .catch(error => {
        alert (error)
      });
    }

  // AUTOCOMPLETE SEARCH BAR
  const autoComplete = (value: string) => {
    axios.get('https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/autocomplete/json', {
    params: {
      input: value,
      key: googleAPIKey,
      types: "locality"
    }
    })
      .then(response => {
        // Update state with API data // Set loading to false
        setAutoCompleteResults(response.data.predictions)
      })
      .catch(error => {
        alert(error); 
      });
  }

  const handleAutoCompleteSelect = (selection: {place_id: string}) => {
    setPlaceID(selection.place_id)
  }


  // GOOGLE FETCH DETAILS (CITY IDS)
  const fetchDetails = () => {
    axios.get('https://proxy.junocollege.com/https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeID,
        key: googleAPIKey,
        types: "locality",
        fields: "photo"
      }
    })
    .then(response => {
      if (response.data.result) {
        // Set City Photo to first pic returned from array (based on text query)
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=${response.data.result.photos[0].photo_reference}&key=${googleAPIKey}`;
        setLocationPhoto(imageUrl);
      } 
    })
    .catch(error => {
      alert(error)
    })
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      await fetchDetails();
    } catch (error) {
      // Handle errors
      alert(error);
    }
  };
  fetchData();
}, [results]);


    // HANDLE PROPERTY SEARCH FORM INPUT CHANGES
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    const handleDateRangeChange = (value: Date[] | null) : void => {
      if (value) {
        setSelectedCity({
          ...selectedCity,
          checkin: value[0].toLocaleDateString(),
          checkout: value[1].toLocaleDateString()
        })
      }
    }
    
    // HANDLE PROPERTY SEARCH USER SUBMISSION
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setCurrency("usd");
      fetchSearch();
    }

    // HANDLE RESET OF RESULTS AND USER INPUT
    const handleReset = () => {
      setResults([]);
      setSelectedCity({
        location:"",
        checkin: "",
        checkout:"",
        adults: ""
      });
      setAutoCompleteResults([]);
    }

    // HANDLE CLICK ON EACH PROPERTY CARD THAT COMES UP AFTER SEARCH
    const handleSelect = (property: PropertyDetails) => {
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
          hostThumbnail: property.hostThumbnail,
          previewAmenities: property.previewAmenities,
          amenityIds: property.amenityIds,
          price: property.price,
          lng: property.lng,
          lat: property.lat,
          deeplink: property.deeplink
        })
    }

    const handleReturn = () => {
      setShowProperty(false);
      setAutoCompleteResults([]);
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
        handleAutoCompleteSelect={handleAutoCompleteSelect}
      />
      {showProperty ? (
        <>
         <Property
         handleReturn={handleReturn}
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
                results={results}
                currency={currency}
                setCurrency={setCurrency}
                handleSelect={handleSelect}
                selectedCity={selectedCity}
                errorMessage={''} 
              errorPresent={false} 
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
