import apiClient from "./apiClient";

export async function fetchRisksForPlot(plotId) {
  const res = await apiClient.get(`/risks/plot/${plotId}`);
  const data = res.data;

  // Backend currently returns an array, normalize it:
  if (Array.isArray(data)) {
    return { risks: data };
  }

  // If later you change backend to { plot, risks }, this still works
  return data;
}

// 🔹 Recompute risk for ONE plot (same as Postman call)
export async function recomputeRisksForPlot(plotId, daysWindow = 7) {
  const res = await apiClient.post(
    `/risks/plot/${plotId}/recompute`,
    null, // no body
    { params: { daysWindow } } // ?daysWindow=7
  );
  return res.data; // { message, plotId, plotName, risks: [...] }
}