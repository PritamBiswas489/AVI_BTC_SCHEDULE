import { backendFetch, passThroughResponse, forwardClientHeaders } from '../../../../../lib/backend.js';

export async function GET(request) {
  const date = new URL(request.url).searchParams.get('date') || '';
  const { response, body } = await backendFetch(
    `/api/call-schedule/available-time-slots?date=${encodeURIComponent(date)}`,
    { headers: forwardClientHeaders(request) }
  );
  return passThroughResponse(response, body);
}
