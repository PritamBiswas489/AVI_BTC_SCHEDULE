import { backendFetch, passThroughResponse, forwardClientHeaders } from '../../../../../lib/backend.js';

export async function POST(request, { params }) {
  const { token } = await params;
  const payload = await request.json();
  const { response, body } = await backendFetch(`/api/public/bookings/${encodeURIComponent(token)}/book`, {
    method: 'POST',
    headers: forwardClientHeaders(request),
    body: JSON.stringify(payload),
  });
  return passThroughResponse(response, body);
}
