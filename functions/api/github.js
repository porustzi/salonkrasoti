const REPO = 'porustzi/salonkrasoti';
const BRANCH = 'main';
const BASE = `https://api.github.com/repos/${REPO}/contents`;

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400); }

  const auth = request.headers.get('Authorization');
  const authed = auth && auth === `Bearer ${env.ADMIN_PASSWORD}`;

  if (!authed) {
    const readOnly = ['list', 'read'];
    if (!readOnly.includes(body.action)) {
      return json({ error: 'Unauthorized' }, 401);
    }
    if (body.action === 'login') {
      return json({ error: 'Unauthorized' }, 401);
    }
  }

  const headers = {
    Authorization: `Bearer ${env.GITHUB_PAT}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'salonkrasoti-admin',
  };

  try {
    const { action } = body;

    switch (action) {
      case 'login':
        return json({ ok: true });

      case 'list': {
        const folder = body.folder || 'content';
        const res = await fetch(`${BASE}/${encodeURIComponent(folder)}?ref=${BRANCH}`, { headers });
        if (!res.ok) return json([]);
        const items = await res.json();
        return json((items || []).map(f => ({ name: f.name, path: f.path, type: f.type, sha: f.sha })));
      }

      case 'read': {
        const path = body.path;
        if (!path) return json({ error: 'path required' }, 400);
        const res = await fetch(`${BASE}/${encodeURIComponent(path)}?ref=${BRANCH}`, { headers });
        if (res.status === 404) return json({ content: null });
        if (!res.ok) return proxyError(res);
        const data = await res.json();
        const text = data.content
          ? decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))))
          : '';
        return json({ content: text });
      }

      case 'write': {
        const { path, content, message } = body;
        if (!path || content === undefined) return json({ error: 'path and content required' }, 400);

        const encoded = btoa(unescape(encodeURIComponent(content)));

        async function attempt(attemptSha) {
          const payload = {
            message: message || `Оновлення ${path}`,
            content: encoded,
            branch: BRANCH,
          };
          if (attemptSha) payload.sha = attemptSha;

          const res = await fetch(`${BASE}/${encodeURIComponent(path)}`, {
            method: 'PUT', headers, body: JSON.stringify(payload)
          });
          return res;
        }

        // Re-fetch current sha and retry once on conflict (409)
        const current = await fetch(`${BASE}/${encodeURIComponent(path)}`, { headers });
        let sha = null;
        if (current.ok) {
          const cj = await current.json();
          sha = cj.sha;
        }

        let res = await attempt(sha);
        if (res.status === 409) {
          const fresh = await fetch(`${BASE}/${encodeURIComponent(path)}`, { headers });
          if (fresh.ok) {
            const fj = await fresh.json();
            res = await attempt(fj.sha);
          }
        }

        if (!res.ok) return proxyError(res);
        return json({ ok: true, sha: res.sha });
      }

      case 'upload': {
        const { name, content, folder } = body;
        if (!name || !content) return json({ error: 'name and content required' }, 400);
        const ext = name.split('.').pop();
        const base = name.slice(0, -(ext.length + 1)).replace(/[^a-zA-Z0-9_\-]/g, '_');
        const ts = Date.now();
        const dir = folder || 'content/images';
        const path = `${dir}/${base}_${ts}.${ext}`;
        const payload = {
          message: `Завантаження ${name}`,
          content,
          branch: BRANCH,
        };
        const res = await fetch(`${BASE}/${encodeURIComponent(path)}`, {
          method: 'PUT', headers, body: JSON.stringify(payload)
        });
        if (!res.ok) return proxyError(res);
        return json({ url: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}` });
      }

      case 'delete': {
        const { path } = body;
        if (!path) return json({ error: 'path required' }, 400);
        const existing = await fetch(`${BASE}/${encodeURIComponent(path)}`, { headers });
        if (!existing.ok) return json({ error: 'Not found' }, 404);
        const ex = await existing.json();
        const res = await fetch(`${BASE}/${encodeURIComponent(path)}`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({ message: `Видалення ${path}`, sha: ex.sha, branch: BRANCH }),
        });
        if (!res.ok) return proxyError(res);
        return json({ ok: true });
      }

      default:
        return json({ error: 'Unknown action' }, 400);
    }
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function proxyError(res) {
  const text = await res.text();
  return json({ error: `GitHub error: ${res.status}`, detail: text }, res.status);
}
