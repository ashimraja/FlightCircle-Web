import { flightService } from "./flightService";
import type { SearchParams } from "../types";

export function buildSearchParams(params: Record<string, string | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.set(k, v);
  });
  return q.toString();
}

export async function searchFlightsApi(params: {
  from?: string;
  to?: string;
  depart?: string;
  ret?: string;
  travellers?: string;
  cabin?: string;
}) {
  // Map form parameters to SearchParams
  if (!params.from || !params.to || !params.depart) {
    throw new Error("Missing required search parameters: from, to, depart");
  }

  // Parse cabin class - default to economy
  let cabinClass: SearchParams["cabinClass"] = "economy";
  if (params.cabin) {
    const cabin = params.cabin.toLowerCase();
    if (cabin.includes("premium")) cabinClass = "premium_economy";
    else if (cabin.includes("business")) cabinClass = "business";
    else if (cabin.includes("first")) cabinClass = "first";
  }

  const searchParams: SearchParams = {
    origin: params.from,
    destination: params.to,
    travelDate: params.depart,
    returnDate: params.ret,
    adults: parseInt(params.travellers || "1"),
    cabinClass,
  };

  return flightService.searchFlights(searchParams);
}
