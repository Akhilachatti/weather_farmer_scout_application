import apiClient from "./apiClient";

export async function createDiseaseObservation(plotId, payload) {
  const res = await apiClient.post(`/diseases/plot/${plotId}`, payload);
  return res.data;
}

export async function fetchDiseaseObservations(plotId) {
  const res = await apiClient.get(`/diseases/plot/${plotId}`);
  return res.data; // { plot, observations: [...] } (adjust to your controller)
}