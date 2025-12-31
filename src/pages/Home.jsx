import { useEffect, useState } from 'react'
import { getTopArtisans } from '../services/artisansService'
import { Link } from 'react-router-dom'

function Home() {
  document.title = "Accueil | Artisans"

  const [topArtisans, setTopArtisans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTopArtisans()
      .then(data => setTopArtisans(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Étapes */}
      <section className="mb-5">
        <h2>Comment trouver mon artisan ?</h2>
        <ol>
          <li>Choisir la catégorie d’artisanat</li>
          <li>Choisir un artisan</li>
          <li>Le contacter via le formulaire</li>
          <li>Une réponse sous 48h</li>
        </ol>
      </section>
<section className="my-5 call-to-action p-4 rounded shadow-sm">
  <h2>Vous êtes artisan ?</h2>
  <p>
    Rejoignez la plateforme et proposez vos services à de nouveaux clients.
  </p>
  <Link to="/devenir-artisan" className="btn btn-primary">
    Postuler en tant qu’artisan
  </Link>
</section>


      {/* Artisans du mois */}
      <section>
        <h2>Les artisans du mois</h2>

        {loading && <p>Chargement...</p>}

        <div className="row">
          {topArtisans.map(artisan => (
            <div key={artisan.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title h5">{artisan.name}</h3>
                  <p className="mb-1"><strong>Spécialité :</strong> {artisan.specialty}</p>
                  <p className="mb-1"><strong>Ville :</strong> {artisan.location}</p>
                  <p className="mb-2"><strong>Note :</strong> {artisan.note}/5</p>

                  <Link
                    to={`/artisan/${artisan.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Voir la fiche
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && topArtisans.length === 0 && (
          <p>Aucun artisan mis en avant.</p>
        )}
      </section>
    </>
  )
}

export default Home
