const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function backendFetch(path, options = {}) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  const text = await response.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { message: text }; }

  return { response, body };
}

export function passThroughResponse(response, body) {
  const headers = {};
  const retryAfter = response.headers.get('retry-after');
  if (retryAfter) headers['retry-after'] = retryAfter;
  return Response.json(body ?? {}, { status: response.status, headers });
}

export function forwardClientHeaders(request) {
  const headers = {};
  const forwardedFor = request?.headers?.get?.('x-forwarded-for');
  const realIp = request?.headers?.get?.('x-real-ip');
  const userAgent = request?.headers?.get?.('user-agent');
  if (forwardedFor) headers['x-forwarded-for'] = forwardedFor;
  if (realIp) headers['x-real-ip'] = realIp;
  if (userAgent) headers['user-agent'] = userAgent;
  return headers;
}
