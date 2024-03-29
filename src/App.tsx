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

  // SET CITY NAME FOR RESULTS PAGE
  const [location, setLocation] = useState<string>("");

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
    deeplink: "",
    isSuperhost: ""
  });
 
  // SET PLACEID (GOOGLE MAPS)
  const [placeID, setPlaceID] = useState<string>("");

  // SET SELECTED CITY'S PHOTO
  const [cityImages, setCityImages] = useState([]);

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
        if (response.data.predictions && response.data.predictions.length > 0) {
          const firstPrediction = response.data.predictions[0];
          setPlaceID(firstPrediction.place_id);
        }
      })
      .catch(error => {
        alert(error); 
      });
  }

  const div = document.querySelector(".auto-complete") as HTMLDivElement | null;
  
  const handleAutoCompleteClick = (result: any) => {
    const locationInput = document.querySelector(".location-input") as HTMLInputElement | null;
    if (locationInput) {
        locationInput.value = result.description;
    }
    if (div) {
      div.style.display = "none";
    } 
  }; 
 
  window.addEventListener("click", (e) => {
    if (div && !div.contains(e.target as Node) && !document.querySelector(".location-input")?.contains(e.target as Node)) {
        div.style.display = "none";
    }
  });

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
 
        // Set city's images (readying for carousel)
        const photos = response.data.result.photos.map((photo: {photo_reference: string}) => photo.photo_reference);
        setCityImages(photos.map((photoRef: string) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=${photoRef}&key=${googleAPIKey}`));
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
      setLocation(value);
      if (e.target.name === "location") {
        autoComplete(value)
      }
      setSelectedCity ({
        ...selectedCity,
        [e.target.name]: value
      })
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
      navigate(`/searchQuery/${placeID}`);
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
      setLocation("");
      setAutoCompleteResults([]);
      const locationInput = document.querySelector(".location-input") as HTMLInputElement | null;
      if (locationInput) {
        locationInput.value = "";
      }
      navigate(`/`);
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
          deeplink: property.deeplink,
          isSuperhost: property.isSuperhost
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
              cityImages={cityImages}
              handleAutoCompleteSelect={handleAutoCompleteSelect}
              handleAutoCompleteClick={handleAutoCompleteClick}
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
              cityImages={cityImages}
               handleAutoCompleteClick={handleAutoCompleteClick}
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
                    location={location}
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
              cityImages={cityImages}
              handleAutoCompleteClick={handleAutoCompleteClick}
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

 