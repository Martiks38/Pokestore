function CardPlaceholder() {
  return (
    <div className="card-placeholder">
      <div className="card-placeholder__img"></div>
      <div className="card-placeholder__text"></div>
    </div>
  )
}

const cardNumber = 20
const cards = Array(cardNumber).fill(null)

function PlaceholderCards() {
  return (
    <div className="resultsSearch">
      <div className="resultsSearch__results">
        {cards.map((_, index) => (
          <CardPlaceholder key={`card-${index}`} />
        ))}
      </div>
    </div>
  )
}

export default PlaceholderCards
