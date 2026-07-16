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
      window.location.href = '/admin/login'
    }

    return { ok: res.ok, status: res.status, data }
  } catch {
    return { ok: false, status: 0, data: null }
  }
}

export async function login(password: string, _login?: string) {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${password}`,
    },
    body: JSON.stringify({ action: 'login' }),
  })
  let data: any = null
  try { data = await res.json() } catch { /* no body */ }
  if (res.ok) {
    sessionStorage.setItem('admin_auth', password)
  }
  return { ok: res.ok, status: res.status, data }
}

export async function readContent(path: string) {
  const result = await call('read', { path })
  if (!result.ok) return null
  const data = result.data as { content?: string | null; contentBase64?: string | null } | string
  if (typeof data === 'string') return data
  if (data?.contentBase64) {
    try {
      const binary = atob(data.contentBase64)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      return new TextDecoder('utf-8').decode(bytes)
    } catch {
      return data?.content ?? null
    }
  }
  return data?.content ?? null
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
