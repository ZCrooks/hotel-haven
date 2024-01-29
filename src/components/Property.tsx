import { Card, Container, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBath, faBed, faUser, faDoorOpen, faLocationDot, faWifi, faFan, faCar, faKitchenSet, faPersonSwimming, faSmoking, faDog, faDumbbell, faMugSaucer, faTv, faKey, faHotTubPerson, faFire, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { PropertyProps } from "../interfaces/PropertyProps";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


const Property: React.FC<PropertyProps> = ({
  handleReturn,
  selectedProperty
}) => {

    // GOOGLE MAPS - MAP RENDERING LOGIC
    const googleAPIKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY as string; // Use process.env to access environment variables
    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleAPIKey
    });

    if (loadError) return "Error loading maps"; // Return an error message if the maps fail to load

    const center = {
    lat: selectedProperty.lat,
    lng: selectedProperty.lng
    };

    // RESERVE BUTTON CLICK
    const handleReserve = () => {
        alert(`MOCK WEBSITE: Please visit link to reserve this property: ${selectedProperty.deeplink}`)
    }

    return (
        <section className="property">
            <Container>
                <Button className="back-button" onClick={handleReturn}>BACK <FontAwesomeIcon icon={faRotateLeft} style={{color: "white",}} /></Button>
        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              zoom={15}
              center={center}
              mapContainerClassName="map-container"
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
                <Row className="property-main">
                    <Col xs={8}>
                        <Card className="property-key-card">
                            <p className="property-type">{selectedProperty.type}</p>
                            <h2>{selectedProperty.name}</h2>
                            <div className="property-details">
                                <div className="property-intro">
                                    <FontAwesomeIcon icon={faStar} style={{color: "#ef6837",}} />
                                    <h5>{selectedProperty.rating}</h5>
                                    <p>({selectedProperty.reviewsCount}) reviews</p>                             
                                </div>
                                <div className="property-location">
                                    <FontAwesomeIcon icon={faLocationDot} style={{color: "#676e7c",}} />
                                    <p>{selectedProperty.address}</p>                            
                                </div>
                            </div>
                            <div className="property-host">
                                <div className="property-host-div">
                                    <div className="host-pic">
                                        <Card.Img  src={selectedProperty.hostThumbnail}/>
                                    </div>
                                    <p>Hosted by <strong>RENTER</strong></p>                            
                                </div>
                                <div className="property-previewAmenity-div">
                                    <p>{selectedProperty.previewAmenities.includes("Wifi") ? <FontAwesomeIcon icon={faWifi}/> : null }</p>
                                    <p>{selectedProperty.previewAmenities.includes("Air conditioning") ? <FontAwesomeIcon icon={faFan}/> : null }</p>
                                    <p>{selectedProperty.previewAmenities.includes("Free parking") ? <FontAwesomeIcon icon={faCar}/> : null }</p>
                                    <p>{selectedProperty.previewAmenities.includes("Kitchen") ? <FontAwesomeIcon icon={faKitchenSet}/> : null }</p>
                                </div>
                            </div>
                            <div className="property-features">
                                <div>
                                    <FontAwesomeIcon icon={faUser} style={{color: "#676e7c",}} />
                                    <p>{selectedProperty.persons} {selectedProperty.persons > 1 ? "guests" : "guest"}</p> 
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faBed} style={{color: "#676e7c",}} />
                                    <p>{selectedProperty.beds} {selectedProperty.beds > 1 ? "beds" : "bed"}</p>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faBath} style={{color: "#676e7c",}} />
                                    <p>{selectedProperty.bathrooms} {selectedProperty.bathrooms > 1 ? "baths" : "bath"}</p>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faDoorOpen} style={{color: "#676e7c",}} />
                                    <p>{selectedProperty.bedrooms} {selectedProperty.bedrooms > 1 ? "bedrooms" : "bedroom"}</p>
                                </div>                               
                            </div>
        
                            <ul className="property-photos">
                                {selectedProperty.images.slice(0, 9).map((image: string) => {
                                    return (
                                        <li key={image}>
                                             <Zoom>
                                                <Card.Img  
                                                    src={image} 
                                                    alt="Property Image"
                                                />
                                            </Zoom>
                                        </li>
                                    )
                                })}                        
                            </ul>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="property-booking">
                            <h3>${selectedProperty.price.rate}<span> /night</span></h3>  
                            <Row>                        
                                <Col>
                                    <p>{selectedProperty.price.priceItems[0].title}</p>
                                </Col>
                                <Col>
                                    <p className="amount">${selectedProperty.price.priceItems[0].amount.toLocaleString()}</p>
                                </Col>
                            </Row>  
                            <Row>
                                <Col>
                                    <p>{selectedProperty.price.priceItems[1] !== undefined ? selectedProperty.price.priceItems[1].title : null}</p>
                                </Col>
                                <Col>
                                    <p className="amount">{selectedProperty.price.priceItems[1] === undefined || selectedProperty.price.priceItems[1].title === "Cleaning fee" || selectedProperty.price.priceItems[1].title === "Taxes" || selectedProperty.price.priceItems[1].title === "Airbnb service fee" ? (
                                         <>${selectedProperty.price.priceItems[1].amount}</>) : 
                                         <>-${selectedProperty.price.priceItems[1].amount} </>}</p> 
                                                       
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{selectedProperty.price.priceItems[2] !== undefined ? selectedProperty.price.priceItems[2].title : null}</p>
                                </Col>
                                <Col>
                                    <p className="amount">{selectedProperty.price.priceItems[2] !== undefined ? (<>${selectedProperty.price.priceItems[2].amount}</> ): null}</p>                       
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{selectedProperty.price.priceItems[3] !== undefined ? selectedProperty.price.priceItems[3].title : null}</p>
                                </Col>
                                <Col>
                                    <p className="amount">{selectedProperty.price.priceItems[3] !== undefined ? (<>${selectedProperty.price.priceItems[3].amount}</> ): null}</p>               
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col>
                                    <p><strong>Total</strong></p>
                                </Col>
                                <Col>
                                    <p className="amount"><strong>${selectedProperty.price.total.toLocaleString()}</strong></ p>                         
                                </Col>
                            </Row>
                            <Button className="reserve-button" onClick={handleReserve}>Reserve</Button>                            
                        </Card>                
                    </Col>
                </Row>
                <Card className="property-description-card">
                    <h3>Stay Information</h3>
                    <hr></hr>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum adipisci aliquam, quae voluptatibus quod incidunt quas eveniet maxime ratione nulla ad reiciendis suscipit natus iste perspiciatis. Animi consectetur quas minima placeat laudantium odio facere dolor non quam. Maiores maxime quae, reprehenderit ipsam hic, eligendi facilis laborum veritatis provident libero cum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae rem facere itaque provident at iure quasi quod nobis voluptate molestias!</p>
                </Card>

                <Card className="property-amenities-card">
                    <h3>Amenities</h3>
                    <p>About the property's amenities and services</p>
                    <hr></hr>
                <ul className="amenities">
                    {selectedProperty.amenityIds.map((id: number) => {
                        return id === 51 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faKey} style={{ color: "#676e7c" }} /> Self Check-in
                            </li>
                            ) : id === 2 || id === 8 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faKitchenSet} style={{ color: "#676e7c" }} /> Kitchen
                            </li>
                            ) : id === 4 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faWifi} style={{ color: "#676e7c" }} /> Wifi Included
                            </li>
                            ) : id === 5 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faFan} style={{ color: "#676e7c" }} /> Air Conditioning
                            </li>
                            ) : id === 30 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faFire} style={{ color: "#676e7c" }} /> Heating
                            </li>
                            ) : id === 7 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faPersonSwimming} style={{ color: "#676e7c" }} /> Swimming Pool
                            </li>
                            ) : id === 25 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faHotTubPerson} style={{ color: "#676e7c" }} /> Hot Tub
                            </li>
                            ) : id === 9 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faCar} style={{ color: "#676e7c" }} /> Free Parking on premises
                            </li>
                            ) : id === 11 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faSmoking} style={{ color: "#676e7c" }} /> Smoking allowed
                            </li> 
                            ) : id === 12 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faDog} style={{ color: "#676e7c" }} /> Pets allowed
                            </li> 
                            ) : id === 15 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faDumbbell} style={{ color: "#676e7c" }} /> Gym
                            </li> 
                            ) : id === 16 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faMugSaucer} style={{ color: "#676e7c" }} /> Breakfast Included
                            </li> 
                            ) : id === 58 ? (
                            <li key={id} className="amenities-item">
                                <FontAwesomeIcon icon={faTv} style={{ color: "#676e7c" }} /> TV
                            </li> 
                        ) : null
                    })}
                </ul>
                </Card>
            </Container>
        </section>
    )
}

export default Property;                           
                            
                               
            
                                 
    
