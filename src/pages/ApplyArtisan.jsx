import { useEffect, useMemo, useState } from 'react'

const BASE_OPTIONS = ['Bâtiment', 'Services', 'Fabrication', 'Alimentation']
const STORAGE_KEY = 'customSpecialties'

function ApplyArtisan() {
  document.title = "Devenir artisan | Artisans"

  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    fullname: '',
    specialty: '',
    location: '',
    email: '',
    website: '',
    message: ''
  })

  const [addingSpecialty, setAddingSpecialty] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState('')
  const [customOptions, setCustomOptions] = useState([])

  // Charger les spécialités ajoutées depuis localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
      if (Array.isArray(stored)) setCustomOptions(stored)
    } catch {
      setCustomOptions([])
    }
  }, [])

  // Options finales (base + custom) uniques
  const options = useMemo(() => {
    const all = [...BASE_OPTIONS, ...customOptions]
      .map(s => s.trim())
      .filter(Boolean)
    return Array.from(new Set(all))
  }, [customOptions])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const required = ['fullname', 'specialty', 'location', 'email']
    const missing = required.some(k => !form[k].trim())
    if (missing) {
      alert('Merci de remplir tous les champs obligatoires.')
      return
    }

    console.log('Candidature artisan:', form)
    setSent(true)
  }

  function handleAddSpecialty() {
    const value = newSpecialty.trim()
    if (!value) {
      alert('Veuillez saisir une spécialité.')
      return
    }

    // Eviter doublons (insensible à la casse)
    const exists = options.some(opt => opt.toLowerCase() === value.toLowerCase())
    if (exists) {
      // si déjà existant : on la sélectionne quand même
      const match = options.find(opt => opt.toLowerCase() === value.toLowerCase())
      setForm(prev => ({ ...prev, specialty: match }))
      setNewSpecialty('')
      setAddingSpecialty(false)
      return
    }

    const updated = [value, ...customOptions]
    setCustomOptions(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    // sélection directe
    setForm(prev => ({ ...prev, specialty: value }))
    setNewSpecialty('')
    setAddingSpecialty(false)
  }

  return (
    <>
      <h1>Devenir artisan</h1>
      <p className="text-muted">
        Remplissez ce formulaire pour proposer votre profil. Nous vous répondrons sous 48h.
      </p>

      {sent ? (
        <p className="alert alert-success">
          Candidature envoyée ! Merci, nous vous recontactons rapidement.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="col-lg-7">
          <div className="mb-3">
            <label className="form-label">
              Nom / Prénom *
              <input
                className="form-control"
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* ✅ Liste + ajout custom + bouton pressé */}
          <div className="mb-3">
            <label className="form-label">
              Spécialité *
              <select
                className="form-select"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  -- Choisir une spécialité --
                </option>

                {options.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-2 d-flex gap-2 flex-wrap align-items-center">
              <button
                type="button"
                className={`btn btn-sm btn-toggle ${addingSpecialty ? 'is-active' : ''}`}
                onClick={() => setAddingSpecialty(v => !v)}
                aria-pressed={addingSpecialty}
              >
                + Ajouter une autre spécialité
              </button>

              {addingSpecialty && (
                <>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    style={{ maxWidth: 260 }}
                    placeholder="Ex: Jardinage, Serrurerie..."
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleAddSpecialty}
                  >
                    Ajouter
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Ville *
              <input
                className="form-control"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email *
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Site web (optionnel)
              <input
                className="form-control"
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://"
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Message (optionnel)
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Envoyer ma candidature
          </button>
        </form>
      )}
    </>
  )
}

export default ApplyArtisan
