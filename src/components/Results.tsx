import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Form, Row, Col, Card } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { ResultsProps } from "../interfaces/ResultsProps";
import { faBed, faBath, faStar, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

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
                        <h3>DATES: {`${selectedCity.checkin} - ${selectedCity.checkout}`}</h3>
                    </div>
                    <Form>
                    {['checkbox'].map((type) => (
                        <div key={`default-${type}`} className="mb-3">
                        <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />
                        <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />
                        <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />      
                        <Form.Check 
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />                                            
                        </div>
                    ))}
                    </Form>       
                </Card>
                </Col>
                <Col lg={8} md={8}>
                <Card className="results-box">
                    {results.map((result: any) => {
                        if (result.price.total !== null ) {
                            return (
                                    <Card key={result.id} className="results-card" onClick={() => handleSelect(result)}>
                                            <Card.Img  src={result.images[0]} className="results-image" />
                                        <Card.Body className="results-body">
                                            <h3>{result.name}</h3>
                                            <div className="result-features">
                                                <p className="feature-box">
                                                    <FontAwesomeIcon icon={faBed} style={{color: "#000000",}} /> 
                                                    {result.beds} {result.beds > 1 ? "beds" : "bed"}
                                                </p>
                                                <p className="feature-box-2">
                                                    <FontAwesomeIcon icon={faBath} style={{color: "#000000",}} /> 
                                                    {result.bathrooms} {result.bathroom > 1 ? "bathrooms" : "bathroom"}
                                                </p>
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
                                                    <h4>${`${convertedPrice(result.price.total)}`}</h4> 
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