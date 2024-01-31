import logo from "../assets/logo.png"
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


interface NavigationProps {
  handleReset: () => void; 
}
const Navigation: React.FC<NavigationProps> = ({ handleReset }) => {
    return (
    <Navbar bg="light" expand="lg">
      <Container>
         <LinkContainer to="/">
            <Navbar.Brand  onClick={handleReset}>
              <img src={logo} alt="Home Haven Logo" width="250" height="90"/>
            </Navbar.Brand>
         </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Travellers</Nav.Link>
            <Nav.Link href="#link">Affiliates</Nav.Link>
            <Nav.Link href="/">Hot Deals!</Nav.Link>
            <NavDropdown title="Languages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">French</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Spanish</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Italian</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Japanese</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mandarin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button>Become a Host!</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;