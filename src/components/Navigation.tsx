import logo from "../assets/logo.png"
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ handleReset }) => {
    return (
    <Navbar expand="lg" className="bg-body-primary">
      <Container>
        <Navbar.Brand href="#" onClick={handleReset}>
          <img src={logo} alt="Home Haven Logo" width="250" height="90"/>
        </Navbar.Brand>
        <NavDropdown title="Travellers" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Renters</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Affiliates</NavDropdown.Item>
        </NavDropdown> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Currency" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">USD</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               CAD
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Language" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               French
              </NavDropdown.Item>
            </NavDropdown>        
            <Button>Become a Renter!</Button>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Navigation;