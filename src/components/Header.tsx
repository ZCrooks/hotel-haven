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
import { faDollarSign, faHouse, faLocationPin, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ( { handleSubmit, handleChange, handleDateRangeChange, results }) => {

    return (
        <>
        <header>
            <div className="header-div">
                 {results.length > 0 ? (
                    <>
                    <h1>{results[13].address}</h1>
                    <p>{results.length} Properties Available</p>                   
                    </>
                 ) : ( 
                <h1>Find Your Next <span>Vacation Property!</span></h1>
                )}
            </div>
            <div className="header-img-div">   
                <img 
                    className="header-img" 
                    src={results.length > 0 && results[0].images[1] ? results[1].images[4] : headerImage} 
                    alt="Header Image" 
                />    
         
            </div>
        </header>
        <Container>
            <Form className="search-form" onSubmit={handleSubmit}>
                <Row className="g-2 ms-4">
                    <Col md>
                        <Form.Control className="location-input" type="text" name="location" placeholder="Where are you going?" onChange={handleChange} />
                    </Col>
                    <Col md>
                        <DateRangePicker 
                            onChange={handleDateRangeChange} 
                        />
                    </Col>
                    <Col md>
                        <Form.Control size="lg" type="number" placeholder="Number of Guests" name="adults" onChange={handleChange} />
                    </Col>  
                    <Button type="submit" className="submit-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button> 
                </Row>
            </Form>
        </Container>

        </>
    )
}

export default Header;