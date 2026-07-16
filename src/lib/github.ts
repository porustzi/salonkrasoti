const API_ENDPOINT = '/api/github'

async function call(action: string, payload: Record<string, unknown> = {}) {
  const auth = sessionStorage.getItem('admin_auth')
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
    },
    body: JSON.stringify({ action, ...payload }),
  })
  if (res.status === 401) {
    sessionStorage.removeItem('admin_auth')
    window.location.href = '/admin/login'
    return null
  }
  return res.json()
}

export async function login(password: string) {
  const result = await call('login')
  if (result?.ok) {
    sessionStorage.setItem('admin_auth', password)
  }
  return result
}

export async function readContent(path: string) {
  return call('read', { path })
}

export async function writeContent(path: string, content: string, message?: string) {
  return call('write', { path, content, message })
}

export async function uploadImage(name: string, content: string, folder?: string) {
  return call('upload', { name, content, folder })
}

export async function deleteContent(path: string) {
  return call('delete', { path })
}

export async function listContent(folder: string) {
  return call('list', { folder })
}
