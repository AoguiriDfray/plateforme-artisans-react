const DATA_URL = '/datas.json'

export async function getAllArtisans() {
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error('Erreur chargement données')
  return res.json()
}

export async function getTopArtisans() {
  const artisans = await getAllArtisans()
  return artisans.filter(a => a.top === true)
}

export async function getArtisansByCategory(category) {
  const artisans = await getAllArtisans()
  return artisans.filter(
    a => a.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getArtisanById(id) {
  const artisans = await getAllArtisans()
  return artisans.find(a => String(a.id) === String(id))
}
export async function searchArtisans(query) {
  const artisans = await getAllArtisans()
  const q = query.toLowerCase()

  return artisans.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.location.toLowerCase().includes(q) ||
    a.specialty.toLowerCase().includes(q)
  )
}
