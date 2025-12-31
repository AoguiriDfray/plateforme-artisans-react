import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchArtisans } from '../services/artisansService'

function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `Recherche : ${query}`
    searchArtisans(query)
      .then(data => setResults(data))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <>
      <h1>Résultats pour : "{query}"</h1>

      {loading && <p>Chargement...</p>}

      {!loading && results.length === 0 && (
        <p>Aucun artisan trouvé.</p>
      )}

      <div className="row mt-3">
        {results.map(a => (
          <div key={a.id} className="col-md-4 mb-3">
            <article className="card h-100">
              <div className="card-body">
                <h2 className="h5">{a.name}</h2>
                <p className="mb-1"><strong>Spécialité :</strong> {a.specialty}</p>
                <p className="mb-2"><strong>Ville :</strong> {a.location}</p>

                <Link
                  to={`/artisan/${a.id}`}
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

export default Search
