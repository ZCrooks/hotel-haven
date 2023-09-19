import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { faBed, faBath, faStar} from "@fortawesome/free-solid-svg-icons";

const Results = ( { handleReset, results }) => {

    console.log(results)
    return (
        <section className="results-section">
            <Container>
                <h2>Property in {results[13].city}</h2>
                <div className="results-box">
                    {results.map((result) => {
                        return (
                                <Card key={result.id} className="results-card">
                                        <Card.Img  src={result.images[3]} className="results-image" />
                                    <Card.Body className="results-body">
                                        <h3>{result.name}</h3>
                                        <div className="result-features">
                                            <p className="feature-box">
                                                 <FontAwesomeIcon icon={faBed} style={{color: "#000000",}} /> 
                                                 {result.beds} {result.beds > 1 ? "beds" : "bed"}
                                            </p>
                                            <p className="feature-box-2">
                                                <FontAwesomeIcon icon={faBath} style={{color: "#000000",}} /> 
                                                {result.bathrooms} {result.bathroom > 1 ? "bathrooms" : "bathroom"}
                                            </p>
                                        </div>
                                        <div className="results-info">
                                            <div className="reviews">
                                                {result.rating && result.reviewsCount ? (
                                                <>
                                                    <FontAwesomeIcon icon={faStar} style={{color: "#ef6837",}} />
                                                    <h5>{result.rating}</h5>
                                                    <p>({result.reviewsCount}) reviews</p>                                        
                                                </>
                                                ) : null}
                                            </div>
                                            <div className="result-total-box">
                                                <h4>${result.price.total.toLocaleString()}</h4> 
                                            </div>
                                        </div>
    
                                       
                                    </Card.Body >
                                </Card>


                        )
                    })}
                </div>


            </Container>








            {/* <button onClick={handleReset}>RESET</button> */}



        </section>
    )
}

export default Results;