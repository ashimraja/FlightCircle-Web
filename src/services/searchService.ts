import { flightService } from "./flightService";

export function buildSearchParams(params: Record<string, string | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.set(k, v);
  });
  return q.toString();
}

export async function searchFlightsApi(
  params: Record<string, string | undefined>,
) {
  // Placeholder: integrate real API here. For now delegate to local flightService.
  // Example: return fetch(`/api/search?${buildSearchParams(params)}`)
  //   .then(res => res.json());
  return flightService.searchFlights();
}
