import authorCard from "./Cards"

const FeaturedAuthors = () => {

    const card = authorCard;

    return (
        <section className="authors-section">
            {card.map((card) => {
                return  (
                    <div key={card.id}>{card.name}</div>
                )
            })}



        </section>


    )
    
}

export default FeaturedAuthors;