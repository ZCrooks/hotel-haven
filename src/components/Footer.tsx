import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import youtube from "../assets/square-youtube.svg";
import facebook from "../assets/square-facebook.svg";
import instagram from "../assets/square-instagram.svg";
import x from "../assets/x-twitter.svg";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row className="justify-content-between align-items-start">
                    <Col md={4}>
                        <ul className="brand-links">
                            <li>
                                <img src={logo} alt="Hotel Haven Logo" className="logo-image" />
                            </li>
                            <li>
                                <a href="facebook.com" className="url"> 
                                    <img src={facebook} aria-hidden="true" alt="Facebook Logo" className="brand-logo" />
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a href="twitter.com" className="url">
                                    <img src={x} alt="X Logo" className="brand-logo" />
                                    <span>X (Formerly Twitter)</span>
                                </a>
                            </li>
                            <li>
                                <a href="youtube.com" className="url">
                                    <img src={youtube} alt="Youtube Logo" className="brand-logo" />
                                    <span>Youtube</span>
                                </a>
                            </li>
                            <li>
                                <a href="instagram.com" className="url">
                                    <img src={instagram} alt="Instagram Logo" className="brand-logo" />
                                    <span>Instagram</span>
                                </a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Getting Started</h3>
                            </li>
                            <li>
                                <a href="#">Why Hotel Haven?</a>
                            </li>
                            <li>
                                <a href="#">Account Registration</a>
                            </li>
                            <li>
                                <a href="#">Cancellation Policy</a>
                            </li>
                            <li>
                                <a href="#">FAQs</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Explore</h3>
                            </li>
                            <li>
                                <a href="#">Hotels</a>
                            </li>
                            <li>
                                <a href="#">Destinations</a>
                            </li>
                            <li>
                                <a href="#">Packages</a>
                            </li>
                            <li>
                                <a href="#">Safety</a>
                            </li>
                            <li>
                                <a href="#">Affiliates</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Resources</h3>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Releases</a>
                            </li>
                        </ul>
                    </Col> 
                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Community</h3>
                            </li>
                            <li>
                                <a href="#">Discussion Forums</a>
                            </li>
                            <li>
                                <a href="#">Code of Conduct</a>
                            </li>
                            <li>
                                <a href="#">Community Resources</a>
                            </li>
                            <li>
                                <a href="#">Contributing</a>
                            </li>
                            <li>
                                <a href="#">Concurrent Mode</a>
                            </li>
                        </ul>
                    </Col>                   
                 </Row>
            </Container>
        </footer>
    )
}

export default Footer;