import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Messages() {
  document.title = 'Messagerie | Artisans'

  const [messages, setMessages] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages')) || []
    setMessages(stored)
  }, [])

  return (
    <>
      <h1>Messagerie</h1>

      {messages.length === 0 && (
        <p>Aucun message envoyé pour le moment.</p>
      )}

      <ul className="list-group">
        {messages.map((msg, index) => (
          <li key={index} className="list-group-item">
            <p className="mb-1">
              <strong>Artisan :</strong> {msg.artisanName}
            </p>
            <p className="mb-1">
              <strong>De :</strong> {msg.senderName}
            </p>
            <p className="mb-1">
              <strong>Objet :</strong> {msg.subject}
            </p>
            <p className="text-muted small mb-2">{msg.date}</p>
            <p>{msg.message}</p>

            <Link
              to={`/artisan/${msg.artisanId}`}
              className="btn btn-sm btn-outline-primary mt-2"
            >
              Voir l’artisan
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Messages

