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
                            <p>Name your destination city, desired dates, and number of guests in the searchbar. Hotel Haven will do the rest for you!.</p>
                        </Col>
                        <Col className='description-box'>
                            <div>
                                <img src={chooseProperty} alt="" />
                            </div>
                            <h3>Choose property</h3>
                            <p>Survey a diverse array of options curated by our application, allowing you to handpick the property that aligns with your preferences, whether it is leisure, digital nomading, or business. .</p>
                        </Col>
                        <Col className="description-box">
                            <div>
                                <img src={bookProperty} alt="" />
                            </div>
                            <h3>Book your property</h3>
                            <p>Browse details and photos for each listing before making your choice.</p>
                        </Col>
                    </Row>
            </Container>
        </section>
    )
}

export default Description;