const API_ENDPOINT = '/api/github'

interface CallResult {
  ok: boolean
  status: number
  data: any
}

async function call(action: string, payload: Record<string, unknown> = {}): Promise<CallResult> {
  const auth = sessionStorage.getItem('admin_auth')
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      },
      body: JSON.stringify({ action, ...payload }),
    })

    let data: any = null
    try { data = await res.json() } catch { /* no body */ }

    if (res.status === 401) {
      sessionStorage.removeItem('admin_auth')
    }

    return { ok: res.ok, status: res.status, data }
  } catch {
    return { ok: false, status: 0, data: null }
  }
}

export async function login(password: string) {
  const result = await call('login')
  if (result.ok) {
    sessionStorage.setItem('admin_auth', password)
  }
  return result
}

export async function readContent(path: string) {
  const result = await call('read', { path })
  if (!result.ok) return null
  return result.data as string
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
  const result = await call('list', { folder })
  if (!result.ok) return []
  return result.data
}
