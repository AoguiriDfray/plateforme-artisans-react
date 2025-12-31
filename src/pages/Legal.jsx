import { useLocation } from 'react-router-dom'

const CONTENT = {
  '/mentions-legales': {
    title: 'Mentions légales',
    text: "Contenu à compléter. Cette page présente les informations légales du site (éditeur, hébergeur, contact)."
  },
  '/donnees-personnelles': {
    title: 'Données personnelles',
    text: "Contenu à compléter. Cette page décrit la gestion des données personnelles (finalités, durée de conservation, droits RGPD)."
  },
  '/accessibilite': {
    title: 'Accessibilité',
    text: "Contenu à compléter. Cette page décrit le niveau d’accessibilité du site et les moyens de contact en cas de difficulté."
  },
  '/cookies': {
    title: 'Cookies',
    text: "Contenu à compléter. Cette page explique l’usage des cookies et les moyens de les gérer."
  }
}

function Legal() {
  const { pathname } = useLocation()
  const page = CONTENT[pathname] || {
    title: 'Informations légales',
    text: "Contenu à compléter."
  }



  return (
    <section className="bg-white p-4 rounded shadow-sm">
      <h1>{page.title}</h1>
      <p className="text-muted mb-0">{page.text}</p>
    </section>
  )
}

export default Legal
