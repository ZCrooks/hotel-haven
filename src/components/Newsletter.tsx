import NewsletterImage from '../assets/newsletter.png';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { db } from '../Firebase';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';

const Newsletter = () => {

    // Store User Input (email) in State
    const [input, setInput] = useState("")

    // Set User Input in State
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // add to firebase Firestore
        if (input) {
            await addDoc(collection(db, "newsletter emails"), {
                email: input,
                timestamp: serverTimestamp()
            })
            .then(() => {
                alert("Thank you for subscribing! Hotel & Flight details coming your way!")
            })
            setInput("")
        }
    }

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
                             <Form className="newsletter-form" method="POST" onSubmit={handleSubmit}  >
                                <Row className="g-2">
                                    <Col md>
                                        <Form.Control size="lg" type="text" placeholder="Enter your Email" onChange={handleInput} />
                                    </Col>  
                                    <Button type="submit" className="newsletter-submit-button"><FontAwesomeIcon icon={faMagnifyingGlass}/>
                                    </Button> 
                                </Row>
                            </Form>
                    </Col>
                    <Col className="newsletter-image">
                        <img src={NewsletterImage} alt="" />
                    </Col>
                </Row>
            </Container>






        </section>
    )
}

export default Newsletter;