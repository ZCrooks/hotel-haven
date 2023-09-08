import NewsletterImage from '../assets/newsletter.png';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Newsletter = () => {
    return (
        <section className="newsletter-section">
            <Container>
                <Row>
                    <Col>
                        <h2>Join our newsletter &#127881;</h2>
                        <p>Read to gain new perspectives on the hottest locations, experiences, and hotel deals!</p>
                   
                            <div className="link-box">
                                <Button variant="info">01</Button> 
                                <p>Get exclusive Hotel Offers!</p>                               
                            </div>
                            <div className="link-box">
                                <Button variant="info" className="link-box-2">02</Button> 
                                <p>Limited time Flight deals</p>                                 
                            </div>
                             <Form className="newsletter-form">
                                <Row className="g-2">
                                    <Col md>
                                        <Form.Control size="lg" type="text" placeholder="Enter your Email" />
                                    </Col>  
                                    <Button type="submit" className="newsletter-submit-button"><FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Button> 
                                </Row>
                            </Form>
                    </Col>
                    <Col>
                        <img src={NewsletterImage} alt="" />
                    </Col>
                </Row>
            </Container>






        </section>
    )
}

export default Newsletter;