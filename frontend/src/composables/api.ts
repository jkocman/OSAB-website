import router from '@/router'

const URL = 'https://osab-website.onrender.com'

export const postFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const token = localStorage.getItem('token')
  if (!token) throw new Error('Token není v localStorage')

  const res = await fetch(`${URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!res.ok) {
    let message = 'Upload failed'

    try {
      const data = await res.json()
      message = data.error || message
    } catch {
      message = res.statusText
    }

    throw new Error(message)
  }

  return await res.json()
}

export const getAllBeatmaps = async () => {
  const res = await fetch(`${URL}/beatmaps`)
  if (!res.ok) throw new Error('Failed to fetch beatmaps')
  return res.json()
}

export const getUserBeatmaps = async (userId: number) => {
  const res = await fetch(`${URL}/beatmaps?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch user beatmaps')
  return res.json()
}

export const deleteBeatmap = async (id: number) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Token není v localStorage')

  const res = await fetch(`${URL}/beatmaps/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const updateDownloads = async (id: number) => {
  const res = await fetch(`${URL}/beatmaps/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getBeatmapImage = (id: number) => {
  return `${URL}/beatmaps/${id}/image?v=${Date.now()}`
}

export const login = async (identifier: string, password: string) => {
  const res = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Wrong email or password.')
  }

  const data = await res.json()

  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))

  router.push('/dashboard')
}

export const register = async (email: string, username: string, password: string) => {
  const res = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))

  router.push('/dashboard')
}

export const downloadGame = async (variant: 'osab_stable' | 'osab_experimental') => {
  const res = await fetch(`${URL}/download/game/${variant}`)

  if (!res.ok) {
    alert('Chyba při získávání odkazu')
    return
  }

  const data = await res.json()
  const downloadUrl = data.url

  const a = document.createElement('a')
  a.href = downloadUrl
  a.download = `${variant}.zip`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export const downloadBeatmap = (id: number, name: string) => {
  const url = `${URL}/download/beatmap/${id}`

  const a = document.createElement('a')
  a.href = url
  a.download = `${name}-${id}.zip`

  document.body.appendChild(a)
  a.click()
  a.remove()
}
