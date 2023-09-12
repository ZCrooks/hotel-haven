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
                                <a href="#">Installation</a>
                            </li>
                            <li>
                                <a href="#">Release Notes</a>
                            </li>
                            <li>
                                <a href="#">Upgrade Guide</a>
                            </li>
                            <li>
                                <a href="#">Browser Support</a>
                            </li>
                            <li>
                                <a href="#">Editor Support</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Explore</h3>
                            </li>
                            <li>
                                <a href="#">Design Features</a>
                            </li>
                            <li>
                                <a href="#">Prototyping</a>
                            </li>
                            <li>
                                <a href="#">Design Systems</a>
                            </li>
                            <li>
                                <a href="#">Pricing</a>
                            </li>
                            <li>
                                <a href="#">Security</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <ul className="footer-menu">
                            <li>
                                <h3>Resources</h3>
                            </li>
                            <li>
                                <a href="#">Best Practices</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Developers</a>
                            </li>
                            <li>
                                <a href="#">Learn Design</a>
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