import renterCard from "./Cards";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


const FeaturedRenters = () => {

    
   

    return (
        <section className="renters-section">
            <Container>
                <div className="renters-title">
                    <h2>Top 10 Renters of the Month</h2>
                    <p>Rating based on customer reviews and points earned</p>
                </div>
                <div className="cards-box">
                    {/* Map over Imported Array of Top 10 Renters Card Info  */}
                    {renterCard.map((card) => {
                        return  (
                            <div className="renter-cards" key={card.id}>
                               <Card className="renter-card d-flex flex-column justify-content-center align-items-center" style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src={card.backgroundImage} />
                                    <Card.Body>
                                        <div className="prof-image">
                                            <Card.Img src={card.profileImage} />
                                        </div>
                                        <Card.Title>{card.name}</Card.Title>
                                        <Card.Text>{card.socials}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            )
                            })}
                        </div>
            </Container>
        </section>
    )
    
}

export default FeaturedRenters;