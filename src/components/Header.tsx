import headerImage from "../assets/header-img.jpeg";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderProps } from "../interfaces/HeaderProps";
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface AutoCompleteResult {
  place_id: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({
  handleSubmit,
  handleChange,
  handleDateRangeChange,
  results,
  autoCompleteResults,
  locationPhoto,
  handleAutoCompleteSelect,
  handleAutoCompleteClick
}) =>  {
    return (
        <>
        <header>
            <div className="header-div">
                 {results && results.length > 0 ? (
                    <>
                    <h1>{results[1].address}</h1>                 
                    </>
                 ) : ( 
                <h1>Find Your Next <span>Vacation Property!</span></h1>
                )}
            </div>
            <div className={results ? "location-photo-div" : "header-img-div"}>
            <img
                className="header-img"
                src={results && results.length > 0 ? locationPhoto : headerImage}
                alt="Header Image"
            />
            </div>
        </header>
        <Container>
            <Form className="search-form" onSubmit={handleSubmit}>
                <Row className="g-2 ms-4">
                    <Col md>
                        <div className="location-input-container">
                        <Form.Control className="location-input" type="text" name="location" placeholder="City" onChange={handleChange} />
                        {autoCompleteResults.length > 0 && (
                            <div className="auto-complete">
                                {autoCompleteResults.map((result: AutoCompleteResult) => (
                                    <p key={result.place_id} onClick={() => handleAutoCompleteSelect(result)}>
                                        <button
                                            type="button"
                                            className="autocomplete-result-button"
                                            onClick={() => handleAutoCompleteClick(result)}
                                        >
                                        {result.description}
                                        </button>    
                                    </p>
                                ))}
                            </div>
                        )}
                         </div>
                    </Col>
                    <Col md>
                        <DateRangePicker 
                            onChange={handleDateRangeChange} 
                            placeholder="Select Date Range"
                        />
                    </Col>
                    <Col md>
                        <Form.Control size="lg" type="number" min="0" placeholder="Guests" name="adults" onChange={handleChange} />
                    </Col>  
                    <Button type="submit" className="submit-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button> 
                </Row>
            </Form>
        </Container>

        </>
    )
}

export default Header;