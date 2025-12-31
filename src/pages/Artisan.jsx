import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtisanById } from '../services/artisansService'
import RatingStars from '../components/RatingStars'

function Artisan() {
  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: ''
  })

  const [sent, setSent] = useState(false)

  useEffect(() => {
    getArtisanById(id)
      .then(data => setArtisan(data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Chargement...</p>

  if (!artisan) {
    document.title = 'Artisan introuvable'
    return <p>Artisan introuvable.</p>
  }

  document.title = `${artisan.name} | Artisans`

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

function handleSubmit(e) {
  e.preventDefault()

  if (!form.name || !form.subject || !form.message) {
    alert('Tous les champs sont obligatoires.')
    return
  }

  const newMessage = {
    artisanId: artisan.id,
    artisanName: artisan.name,
    senderName: form.name,
    subject: form.subject,
    message: form.message,
    date: new Date().toLocaleString()
  }

  const existingMessages =
    JSON.parse(localStorage.getItem('messages')) || []

  localStorage.setItem(
    'messages',
    JSON.stringify([newMessage, ...existingMessages])
  )

  setSent(true)
}


  return (
    <>
      <h1 className="mb-3">{artisan.name}</h1>

      <p>
        <RatingStars value={artisan.note} /> ({artisan.note}/5)
      </p>

      <p><strong>Spécialité :</strong> {artisan.specialty}</p>
      <p><strong>Ville :</strong> {artisan.location}</p>

      {artisan.website && (
        <p>
          <a
            href={artisan.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site web
          </a>
        </p>
      )}

      <section className="my-4">
        <h2>À propos</h2>
        <p>{artisan.about}</p>
      </section>

      <section className="my-4">
        <h2>Contacter l’artisan</h2>

        {sent ? (
          <p className="alert alert-success">
            Message envoyé avec succès !
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="col-md-6">
            <div className="mb-3">
              <label className="form-label">
                Votre nom
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Objet
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Message
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Envoyer
            </button>
          </form>
        )}
      </section>
    </>
  )
}

export default Artisan
