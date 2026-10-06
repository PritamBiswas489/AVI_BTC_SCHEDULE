import { backendFetch, passThroughResponse, forwardClientHeaders } from '../../../../../lib/backend.js';

export async function GET(request, { params }) {
  const { token } = await params;
  const { response, body } = await backendFetch(`/api/public/bookings/${encodeURIComponent(token)}/dates`, { headers: forwardClientHeaders(request) });
  return passThroughResponse(response, body);
}
