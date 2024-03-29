import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Row, Col, Card, Carousel } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { ResultsProps } from "../interfaces/ResultsProps";
import { faBed, faBath, faStar, faRotateLeft, faSwimmer, faCar, faAward} from "@fortawesome/free-solid-svg-icons";
import amenities from "../array/amenities";
import { useState, useEffect, ChangeEvent } from "react";

const Results: React.FC<ResultsProps> = ({
  results,
  currency,
  setCurrency,
  handleSelect,
  errorMessage,
  errorPresent,
  selectedCity,
  handleReset,
}) => {

    // Set State for amenity checkbox clicked
    const [selection, setSelection] = useState<number[]>([]);

    // Set state for properties upon user search
    const [filteredProperties, setFilterProperties] = useState(results);

    // Set state indicating whether property host is listed as a super Host
    const [isSuperHost, setIsSuperHost] = useState(false);

    // Set Currency Conversion state depending on user Selection
    const currencyConversion = (selectedCurrency: string) => {
        setCurrency(selectedCurrency);
    }

    //Render Currency Price based on user selection
    const convertedPrice = (price: number) => {
        let convertedPrice;
        if (currency === "cad") {
           convertedPrice = price * 1.33;
        } else {
            convertedPrice = price;
        }
        return Math.round(convertedPrice).toLocaleString();
    }

    // Convert date into more user-friendly format
    const formatDate = (dateString: string): string => {
        const date = new Date(`${dateString}T00:00:00`);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };        
        return date.toLocaleDateString('en-US', options);
    };

    // UseEffect
    useEffect(() => {
        updateResults();
    }, [selection, results, isSuperHost])

    // Update Results based on user's filter (amenities)
    const updateResults = () => {
        let filteredProperties = results;
        if (selection.length > 0) {
            filteredProperties = results.filter((property: any) =>
                selection.every((number) => property.amenityIds.includes(number))
            );
        }
        if (isSuperHost) {
            filteredProperties = results.filter((property: any) => property.isSuperhost === true);
        } 
        setFilterProperties(filteredProperties);
    }
    

    // Handle user checkbox submit for property amenities
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();        
        if (e.target.id === "super-host") {
            setIsSuperHost((prevIsSuperHost) => !prevIsSuperHost);    
        } else {
            const value = parseInt(e.target.value);
            if (!selection.includes(value)) {
                setSelection((prevSelection) => [...prevSelection, value]);
            } else {
                setSelection((prevSelection) => prevSelection.filter((item) => item !== value));
            } 
        }
        updateResults();
    };
   
    return (
        <section className="results-section">
            <Container className="results-container">
                <h2>Properties in {(typeof results[13] !=='undefined') ? selectedCity.location : ''}</h2>
                <p>{errorPresent ? errorMessage : null}</p>
                <div className="results-header-buttons">
                    <button className="reset-button" onClick={handleReset}>RESET <FontAwesomeIcon icon={faRotateLeft} style={{color: "white",}} /></button>
                    <Dropdown className="currency-dropdown">                
                        <Dropdown.Menu>
                            <Dropdown.Item 
                            onClick={() => currencyConversion("usd")}>USD <span aria-hidden="true">&#127482;&#127480;</span>
                            </Dropdown.Item>
                            <Dropdown.Item 
                            onClick={() => currencyConversion("cad")}>CAD <span aria-hidden="true">&#127464;&#127462;</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {currency === "usd" ? 
                            <span aria-hidden="true">&#127482;&#127480;</span>
                            : <span aria-hidden="true">&#127464;&#127462;</span>}
                        </Dropdown.Toggle>
                    </Dropdown>   
                </div>  
                <Row>
                    <Col lg={4} md={4}>
                    <Card className="results-features">
                        <h4>DATES Selected</h4>
                        <div className="dates">
                            <h5>{`${formatDate(selectedCity.checkin)} - ${formatDate(selectedCity.checkout)}`}</h5>
                        </div>
                        <Form className="user-preference-form">
                            <Form.Label><h4>Superhosts Only <span><FontAwesomeIcon className="super-host" icon={faAward} size="xl" style={{color: "#04b9d8",}} /></span> </h4></Form.Label>
                                <div key={results.isSuperhost} className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        id="super-host"  
                                        label="Superhost"
                                        checked={isSuperHost}
                                        onChange={handleForm}
                                    />
                                </div>
                            <Form.Label><h4>Amenities</h4></Form.Label>
                            <Form.Group controlId="amenity" className="amenities-group">
                                {amenities.map((amenityID: any) => (
                                    <div key={amenityID.value} className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id={amenityID.amenity}
                                            label={amenityID.amenity}
                                            value={amenityID.value}  
                                            checked={selection.includes(amenityID.value)} 
                                            onChange={handleForm}
                                        />
                                    </div>
                                ))}                                                           
                            </Form.Group>
                        </Form>      
                    </Card>
                    </Col>
                    <Col lg={8} md={8}>
                        <Card className="results-box">
                            {filteredProperties.map((result: any) => {
                                if (result.price.total !== null ) {
                                    return (
                                            <Card 
                                                key={result.id} className="results-card" onClick={() => handleSelect(result)}>
                                                {result.isSuperhost ? <FontAwesomeIcon className="super-host" icon={faAward} size="2xl" style={{color: "#04b9d8",}} /> : null }
                                                <Carousel  interval={null} onClick={(e) => e.stopPropagation()} >
                                                    {result.images.map((image: string, index: number) => (
                                                    <Carousel.Item key={index}>
                                                        <img src={image} alt={`Slide ${index + 1}`} className="results-image" />
                                                    </Carousel.Item>
                                                    ))}
                                                </Carousel>
                                                <Card.Body className="results-body">
                                                    <h3>{result.name}</h3>
                                                    <p>{result.address}</p>
                                                    <div className="result-features">
                                                        <p className="feature-box">
                                                            <FontAwesomeIcon icon={faBed} style={{color: "#000000",}} /> 
                                                            {result.beds} {result.beds > 1 ? "beds" : "bed"}
                                                        </p>
                                                        <p className="feature-box-2">
                                                            <FontAwesomeIcon icon={faBath} style={{color: "#000000",}} /> 
                                                            {result.bathrooms} {result.bathroom > 1 ? "bathrooms" : "bathroom"}
                                                        </p>
                                                        {result.previewAmenities.map((amenity: string) => {
                                                            return amenity === "Pool" ? (
                                                                <p className="feature-box-2">
                                                                    <FontAwesomeIcon icon={faSwimmer} style={{ color: "#000000" }} /> Pool
                                                                </p>
                                                            ) : amenity === "Free parking" ? (
                                                                <p className="feature-box-2">
                                                                    <FontAwesomeIcon icon={faCar} style={{ color: "#000000" }} /> Free Parking
                                                                </p>
                                                            ) : null
                                                        })}
                                                    </div>
                                                    <div className="results-info">
                                                        <div className="reviews">
                                                            {result.rating && result.reviewsCount ? (
                                                            <>
                                                                <FontAwesomeIcon icon={faStar} style={{color: "#ef6837",}} />
                                                                <h5>{result.rating}</h5>
                                                                <p>({result.reviewsCount}) reviews</p>                                        
                                                            </>
                                                            ) : null}
                                                        </div>
                                                        <div className="result-total-box">
                                                            <h4> <strong>${`${convertedPrice(result.price.total)}`}</strong> </h4> 
                                                        </div>
                                                    </div>                                
                                                </Card.Body >
                                            </Card>
                                            )
                                        }
                                    })}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Results;