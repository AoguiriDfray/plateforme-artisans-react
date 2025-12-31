import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './pages/Search'
import ApplyArtisan from './pages/ApplyArtisan'
import Home from './pages/Home'
import Category from './pages/Category'
import Artisan from './pages/Artisan'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Messages from './pages/Messages'

function App() {
  return (
    <>
      <Header />

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie/:name" element={<Category />} />
          <Route path="/artisan/:id" element={<Artisan />} />
          <Route path="/messagerie" element={<Messages />} />

          {/* Pages légales (vides mais accessibles depuis le footer) */}
          <Route path="/mentions-legales" element={<Legal title="Mentions légales" />} />
          <Route path="/donnees-personnelles" element={<Legal title="Données personnelles" />} />
          <Route path="/accessibilite" element={<Legal title="Accessibilité" />} />
          <Route path="/cookies" element={<Legal title="Cookies" />} />
          <Route path="/recherche" element={<Search />} />
          <Route path="/devenir-artisan" element={<ApplyArtisan />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
