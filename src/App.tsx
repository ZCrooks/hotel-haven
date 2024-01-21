import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const [results, setResults] = useState<any[]>([]);

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
    id: 0,
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
 
  // SET PLACEID (GOOGLE MAPS)
  const [placeID, setPlaceID] = useState<string>("");

  // SET SELECTED CITY'S PHOTO
  const [locationPhoto, setLocationPhoto] = useState<string>("");

  // DEFINE NAVIGATION
  const navigate = useNavigate();

  // FETCH 'SEARCH' ENDPOINT (AIRBNB API)
  const fetchSearch = () => {
    const checkIn = new Date(selectedCity.checkin).toISOString().slice(0,10);
    const checkOut = new Date(selectedCity.checkout).toISOString().slice(0,10);
    axios.get('https://proxy.junocollege.com/https://airbnb13.p.rapidapi.com/search-location', {
    params: {
      location: selectedCity.location.toString(),
      checkin: checkIn,
      checkout: checkOut,
      adults: selectedCity.adults.toString(),
    },
    headers: {
      'X-RapidAPI-Key': rapidAPIKey,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
    })
      .then(response => {
        if (response.data.error) alert(response.data.message);
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
        console.log(response.data.predictions);
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
      navigate(`/searchQuery/${placeID}`)
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
        setSelectedProperty({
          ...selectedProperty,
          name: property.name,
          rating: property.rating,
          address: property.address,
          type: property.type,
          id: property.id,
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
        navigate(`/property/${property.id}`)
        window.scrollTo(0, 0);
    }

    const handleReturn = () => {
      setAutoCompleteResults([]);
      navigate(`/searchQuery/${placeID}`)
    }

  return (
    <>
      <Navigation
        handleReset={handleReset} 
      />
      <Routes>
        <Route
          path="/"
          element = {
            <>
            <Header 
              handleSubmit={handleSubmit} 
              handleChange={handleChange}
              handleDateRangeChange={handleDateRangeChange}
              results={results}
              autoCompleteResults={autoCompleteResults}
              locationPhoto={locationPhoto}
              handleAutoCompleteSelect={handleAutoCompleteSelect}
            />
            <Description />
            <FeaturedRenters />
            <Newsletter />
            <Footer />
            </>
          }
        />
        <Route
          path="/searchQuery/:placeID"
          element = {
            <>
            <Header  
              handleSubmit={handleSubmit} 
              handleChange={handleChange}
              handleDateRangeChange={handleDateRangeChange}
              results={results}
              autoCompleteResults={autoCompleteResults}
              locationPhoto={locationPhoto}
              handleAutoCompleteSelect={handleAutoCompleteSelect} />
              {loading ?
                <div className="spinner-container">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span> 
                  </Spinner> 
                </div> : (
                <>
                  <Results 
                    results={results}
                    currency={currency}
                    setCurrency={setCurrency}
                    handleSelect={handleSelect}
                    selectedCity={selectedCity}
                    errorMessage={''} 
                    errorPresent={false} 
                    handleReset={handleReset}
                  />
                  <Newsletter />
                  <Footer />
                </>
                )}
            </>
          }
        />
        <Route
          path="/property/:propertyID"
          element = {
            <>
              <Header  
              handleSubmit={handleSubmit} 
              handleChange={handleChange}
              handleDateRangeChange={handleDateRangeChange}
              results={results}
              autoCompleteResults={autoCompleteResults}
              locationPhoto={locationPhoto}
              handleAutoCompleteSelect={handleAutoCompleteSelect} />
              <Property
                handleReturn={handleReturn}
                selectedProperty={selectedProperty} /> 
              <Footer />
            </>
          }
        />
      </Routes>
    </> 
  )
}

export default App;

 