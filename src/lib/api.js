const baseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
let csrfToken = '';

export async function api(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    if (!csrfToken) {
      const csrfResponse = await fetch(`${baseUrl}/auth/csrf`, { credentials: 'include' });
      const csrf = await csrfResponse.json();
      csrfToken = csrf.csrfToken || '';
    }
    headers.set('X-CSRF-Token', csrfToken);
  }
  const response = await fetch(`${baseUrl}${path}`, { ...options, method, headers, credentials: 'include' });
  if (response.status === 403 && !['GET', 'HEAD'].includes(method)) {
    csrfToken = '';
    throw new Error('Security token expired. Please retry your action.');
  }
  if (response.status === 204) return null;
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Request failed.');
  return result;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append('image', file);
  const result = await api('/uploads', { method: 'POST', body: form });
  return result.url;
}
