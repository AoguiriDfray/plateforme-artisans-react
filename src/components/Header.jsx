import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.png'
import logoSmall from '../assets/logo-small.png'

function Header() {
  // ✅ LES HOOKS SONT ICI (AU BON ENDROIT)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return

    navigate(`/recherche?q=${encodeURIComponent(query)}`)
    setQuery('')
  }

  return (
    <header className="bg-dark text-white">
      <nav className="container d-flex flex-wrap gap-3 align-items-center justify-content-between py-3">

<img
  src={logoSmall}
  alt="Logo"
  height="32"
  className="logo-mobile"
/>

 <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
  <img
    src={logo}
    alt="Logo Plateforme des artisans"
    height="40"
    className="me-2"
  />
  <strong>Plateforme des artisans</strong>
</Link>


        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/categorie/batiment">
              Bâtiment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/categorie/services">
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/categorie/fabrication">
              Fabrication
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/categorie/alimentation">
              Alimentation
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link text-white" to="/messagerie">
              Messagerie
            </NavLink>

          </li>
        </ul>

        {/* 🔍 Recherche */}
      <form onSubmit={handleSubmit} className="search-form d-flex">
  <input
    type="search"
    className="search-input"
    placeholder="Rechercher un artisan"
    value={query}
    onChange={e => setQuery(e.target.value)}
    aria-label="Recherche artisan"
  />
  <button type="submit" className="search-button">
    Rechercher
  </button>
</form>


      </nav>
    </header>
  )
}

export default Header
