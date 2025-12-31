import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArtisansByCategory } from '../services/artisansService'

function Category() {
  const { name } = useParams()
  document.title = `${name} | Artisans`

  const [artisans, setArtisans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArtisansByCategory(name)
      .then(data => setArtisans(data))
      .finally(() => setLoading(false))
  }, [name])

  return (
    <>
      <h1 className="mb-4 text-capitalize">
        Catégorie : {name}
      </h1>

      {loading && <p>Chargement...</p>}

      {!loading && artisans.length === 0 && (
        <p>Aucun artisan trouvé dans cette catégorie.</p>
      )}

      <div className="row">
        {artisans.map(artisan => (
          <div key={artisan.id} className="col-md-4 mb-3">
            <article className="card h-100">
              <div className="card-body">
                <h2 className="h5 card-title">{artisan.name}</h2>
                <p className="mb-1">
                  <strong>Spécialité :</strong> {artisan.specialty}
                </p>
                <p className="mb-1">
                  <strong>Ville :</strong> {artisan.location}
                </p>
                <p className="mb-2">
                  <strong>Note :</strong> {artisan.note}/5
                </p>

                <Link
                  to={`/artisan/${artisan.id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  Voir la fiche
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  )
}

export default Category
