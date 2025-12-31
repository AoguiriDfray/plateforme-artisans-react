function RatingStars({ value }) {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} aria-hidden="true">
        {i <= value ? '⭐' : '☆'}
      </span>
    )
  }

  return (
    <span aria-label={`Note ${value} sur 5`}>
      {stars}
    </span>
  )
}

export default RatingStars
