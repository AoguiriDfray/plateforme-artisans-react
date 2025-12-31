function Footer() {
  return (
    <footer className="mt-5 py-4">
      <div className="container">
        <div className="row gy-3">

          {/* Liens légaux */}
          <div className="col-md-6">
            <ul className="list-unstyled mb-2">
              <li><a href="/mentions-legales">Mentions légales</a></li>
              <li><a href="/donnees-personnelles">Données personnelles</a></li>
              <li><a href="/accessibilite">Accessibilité</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </div>

          {/* Adresse & contact */}
          <div className="col-md-6">
            <p className="fw-bold mb-1">Antenne de Lyon</p>
            <address className="mb-0">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <span className="d-block mt-1">
                <strong>Tél :</strong> +33 (0)4 26 73 40 00
              </span>
            </address>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer

