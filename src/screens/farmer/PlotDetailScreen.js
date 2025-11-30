import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { fetchPlotById } from "../../api/plotApi";
import { fetchRisksForPlot, recomputeRisksForPlot } from "../../api/riskApi";
import RiskBadge from "../../components/RiskBadge";
import { AuthContext } from "../../contexts/AuthContext";

export default function PlotDetailScreen({ route }) {
  const { plotId } = route.params;
  const { user } = useContext(AuthContext);

  const [plot, setPlot] = useState(null);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recomputing, setRecomputing] = useState(false);

  // roles allowed to call POST /risks/plot/:plotId/recompute
  const CAN_RECOMPUTE = [
    "SCOUT",
    "MANDAL_OFFICER",
    "DISTRICT_COORDINATOR",
    "ADMIN",
  ];
  const canRecomputeForThisUser = user && CAN_RECOMPUTE.includes(user.role);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1) plot info
      const plotData = await fetchPlotById(plotId);
      setPlot(plotData);

      // 2) existing risk history
      const riskData = await fetchRisksForPlot(plotId); // { plot, risks }
      const existingRisks = riskData.risks || [];
      setRisks(existingRisks);

      // 3) If no risks and user can recompute → call recompute
      if ((!existingRisks || existingRisks.length === 0) && canRecomputeForThisUser) {
        try {
          setRecomputing(true);
          const recomputeResult = await recomputeRisksForPlot(plotId, 7);
          const newRisks = recomputeResult.risks || [];
          setRisks(newRisks);
        } catch (err) {
          console.log("Error recomputing risks:", err.response?.data || err.message);
          Alert.alert(
            "Risk update failed",
            err.response?.data?.message || "Could not recompute disease risk."
          );
        } finally {
          setRecomputing(false);
        }
      }
    } catch (e) {
      console.log("Error loading plot detail:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [plotId]);

  // ---- UI ----

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading field details...</Text>
      </View>
    );
  }

  if (!plot) {
    return (
      <View style={styles.center}>
        <Text>Field not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{plot.name}</Text>
        <Text style={styles.sub}>
          {plot.village}, {plot.mandal}, {plot.district}
        </Text>
        <Text style={styles.subSmall}>
          Crop: {plot.crop} • Variety: {plot.variety}
        </Text>
        <Text style={styles.subSmall}>Area: {plot.areaAcre} acres</Text>
      </View>

      <Text style={styles.sectionTitle}>7-Day Disease Risk</Text>

      {recomputing && (
        <View style={styles.card}>
          <Text>Updating forecast-based risk for this field...</Text>
        </View>
      )}

      {(!risks || risks.length === 0) && !recomputing ? (
        <View style={styles.card}>
          <Text>No disease risk data available yet for this field.</Text>
          {canRecomputeForThisUser ? (
            <Text style={styles.subSmall}>
              Risk was just recomputed automatically. If still empty, weather
              data may not be available yet.
            </Text>
          ) : (
            <Text style={styles.subSmall}>
              Your Agricultural Officer / Scout will update disease risk once
              latest weather data is processed.
            </Text>
          )}
        </View>
      ) : (
        risks.map((r) => (
          <View key={r._id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.disease}>{r.disease}</Text>
              <RiskBadge severity={r.severity} score={r.score} />
            </View>
            <Text style={styles.explanation}>{r.explanation}</Text>
            <Text style={styles.meta}>
              Horizon: {r.horizonDays} days • Date:{" "}
              {new Date(r.date).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "700" },
  sub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
  subSmall: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  disease: { fontSize: 14, fontWeight: "700" },
  explanation: { fontSize: 13, color: "#4b5563", marginTop: 6 },
  meta: { fontSize: 11, color: "#9ca3af", marginTop: 4 },
});