import logo from "../assets/logo.png"
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <img src={logo} alt="Home Haven Logo" width="250" height="90"/>
        </Navbar.Brand>
        <NavDropdown title="Travellers" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Hotels</NavDropdown.Item>
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
            <Button>Feature your hotel</Button>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Navigation;