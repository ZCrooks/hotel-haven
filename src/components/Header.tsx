import headerImage from "../assets/header-img.jpeg";
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from "react";
import { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, InputGroup } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faDollarSign, faHouse, faLocationPin, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ( { handleSubmit, handleChange, handleDateRangeChange, results, autoCompleteResults, locationPhoto }) => {

    // Handle whether AutoComplete list is visible 
    const [showAutoComplete, setShowAutoComplete] = useState (true)

    const handleAutoCompleteClick = (result) => {
        const div = document.querySelector(".auto-complete");
        document.querySelector(".location-input").value = result.description;
        div.style.display = "none"
    };

    return (
        <>
        <header>
            <div className="header-div">
                 {results.length > 0 ? (
                    <>
                    <h1>{results[1].address}</h1>
                    <p>{results.length} Properties Available</p>                   
                    </>
                 ) : ( 
                <h1>Find Your Next <span>Vacation Property!</span></h1>
                )}
            </div>
            <div className={results.length > 0 ? "location-photo-div" : "header-img-div"}>
            <img
                className="header-img"
                src={results.length > 0 ? locationPhoto : headerImage}
                alt="Header Image"
            />
            </div>
        </header>
        <Container>
            <Form className="search-form" onSubmit={handleSubmit}>
                <Row className="g-2 ms-4">
                    <Col md>
                        <div className="location-input-container">
                        <Form.Control className="location-input" type="text" name="location" placeholder="What city are you going to?" onChange={handleChange} />
                        {autoCompleteResults.length > 0 && (
                            <div className="auto-complete">
                                {autoCompleteResults.map((result) => (
                                    <p key={result.place_id}>
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
                        />
                    </Col>
                    <Col md>
                        <Form.Control size="lg" type="number" min="0" placeholder="Number of Guests" name="adults" onChange={handleChange} />
                    </Col>  
                    <Button type="submit" className="submit-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button> 
                </Row>
            </Form>
        </Container>

        </>
    )
}

export default Header;