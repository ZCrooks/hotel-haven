import headerImage from "../assets/header-img.jpeg";
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, InputGroup } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faHouse, faLocationPin, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    // Set Updated Form Data (User choices)
    const [updateForm, setUpdateForm] = useState("")

    return (
        <>
        <header>
            <div className="header-div">
                <h1>Find Your Next <span>Vacation Property!</span></h1>
            </div>
            <div className="header-img-div">
                <img className="header-img" src={headerImage} alt="Header Image" />                
            </div>
        </header>
        <Container>
            <Form className="search-form">
                <Row className="g-2 ms-4">
                    <Col md>
                        <Form.Control className="location-input" type="text" placeholder="Where are you going?" />
                    </Col>
                    <Col md>
                        <DateRangePicker />
                    </Col>
                    <Col md>
                        <Form.Control size="lg" type="number" placeholder="Number of Guests" />
                    </Col>  
                    <Button type="submit" className="submit-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button> 
                </Row>
            </Form>
        </Container>

        </>
    )
}

export default Header;