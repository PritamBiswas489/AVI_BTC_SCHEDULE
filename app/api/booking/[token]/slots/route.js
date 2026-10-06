import { backendFetch, passThroughResponse, forwardClientHeaders } from '../../../../../lib/backend.js';

export async function GET(request, { params }) {
  const { token } = await params;
  const date = new URL(request.url).searchParams.get('date') || '';
  const { response, body } = await backendFetch(
    `/api/public/bookings/${encodeURIComponent(token)}/slots?date=${encodeURIComponent(date)}`,
    { headers: forwardClientHeaders(request) }
  );
  return passThroughResponse(response, body);
}
