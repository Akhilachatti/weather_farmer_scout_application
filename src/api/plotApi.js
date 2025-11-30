import apiClient from "./apiClient";

export async function fetchMyPlots() {
  const res = await apiClient.get("/plots");
  return res.data; // array of plots
}

export async function fetchPlotById(plotId) {
  const res = await apiClient.get(`/plots/${plotId}`);
  return res.data;
}

// 🔹 NEW: create plot (field)
export async function createPlot(payload) {
  // payload: { name, district, mandal, village, areaAcre, crop, variety, sowingDate, season, location }
  const res = await apiClient.post("/plots", payload);
  return res.data;
}