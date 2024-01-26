import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Row, Col, Card } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { ResultsProps } from "../interfaces/ResultsProps";
import { faBed, faBath, faStar, faRotateLeft, faSwimmer, faCar} from "@fortawesome/free-solid-svg-icons";
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

    // Set States
    const [selection, setSelection] = useState<number[]>([]);
    const [filteredProperties, setFilterProperties] = useState(results);

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
    }, [selection, results])

    // Update Results based on user's filter (amenities)
    const updateResults = () => {
        let filteredProperties = results;
        selection.forEach((number) => {
            filteredProperties = results.filter((property: any) => property.amenityIds.includes(number));
        });
        setFilterProperties(filteredProperties);
    }

    // Handle user checkbox submit for property amenities
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        if (!selection.includes(value)) {
            setSelection((prevSelection) => [...prevSelection, value]);
        } else {
            setSelection((prevSelection) => prevSelection.filter((item) => item !== value));
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
                        <div className="dates">
                            <h4>{`${formatDate(selectedCity.checkin)} - ${formatDate(selectedCity.checkout)}`}</h4>
                        </div>
                        <Form className="amenities-form">
                            <Form.Label><h4>Amenities</h4></Form.Label>
                            <Form.Group controlId="amenity">
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
                                            <Card key={result.id} className="results-card" onClick={() => handleSelect(result)}>
                                                    <Card.Img  src={result.images[0]} className="results-image" />
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