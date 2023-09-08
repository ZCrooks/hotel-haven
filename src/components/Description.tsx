import smartSearch from '../assets/smart-search.png';
import chooseProperty from '../assets/choose-property.png';
import bookProperty from '../assets/book-property.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Description = () => {



    return (
        <section className="description-container">
            <Container >
                <div className='description-title'>
                    <h2>How it works</h2>
                    <p>Keep calm & travel on</p>
                </div>
                    <Row>
                        <Col className='description-box'>
                            <div>
                                <img src={smartSearch} alt="" />
                            </div>
                            <h3>Smart search</h3>
                            <p>Name the destination and hotel price range in the searchbar. Our app will find you the perfect match.</p>
                        </Col>
                        <Col className='description-box'>
                            <div>
                                <img src={chooseProperty} alt="" />
                            </div>
                            <h3>Choose property</h3>
                            <p>Survey a diverse array of options curated by our application, allowing you to handpick the property that aligns with your preferences for exploration.</p>
                        </Col>
                        <Col className="description-box">
                            <div>
                                <img src={bookProperty} alt="" />
                            </div>
                            <h3>Book your property</h3>
                            <p>Find a luxurious getaway or space from your search bar. Enter your specific  location, property type, and price range.</p>
                        </Col>
                    </Row>
            </Container>
        </section>
    )
}

export default Description;