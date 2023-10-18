import logo from "../assets/logo.png"
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

interface NavigationProps {
  handleReset: () => void; 
}
const Navigation: React.FC<NavigationProps> = ({ handleReset }) => {
    return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" onClick={handleReset}>
          <img src={logo} alt="Home Haven Logo" width="250" height="90"/>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Travellers</Nav.Link>
            <Nav.Link href="#link">Affiliates</Nav.Link>
            <NavDropdown title="Languages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Spanish</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button>Become a Host!</Button>
      </Container>
    </Navbar>
  );
}

export default Navigation;