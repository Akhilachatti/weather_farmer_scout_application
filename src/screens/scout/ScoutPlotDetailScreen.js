import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { fetchPlotById } from "../../api/plotApi";
import {
  fetchRisksForPlot,
  recomputeRisksForPlot,
} from "../../api/riskApi";
import { fetchDiseaseObservations } from "../../api/diseaseApi.js";
import RiskBadge from "../../components/RiskBadge";

export default function ScoutPlotDetailScreen({ route, navigation }) {
  const { plotId } = route.params;

  const [plot, setPlot] = useState(null);
  const [risks, setRisks] = useState([]);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recomputing, setRecomputing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const plotData = await fetchPlotById(plotId);
      setPlot(plotData);

      const riskData = await fetchRisksForPlot(plotId);
      console.log("riskData in ScoutPlotDetailScreen:", riskData);
      setRisks(riskData.risks || []);

      // optional: load past observations for scout
      try {
        const obsData = await fetchDiseaseObservations(plotId);
        setObservations(obsData.observations || obsData.data || []);
      } catch (obsErr) {
        console.log("Error fetching observations:", obsErr.message);
      }
    } catch (e) {
      console.log("Error loading scout plot detail:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadData);
    return unsub;
  }, [navigation, plotId]);

  useEffect(() => {
    loadData();
  }, [plotId]);

  const onRecompute = async () => {
    try {
      setRecomputing(true);
      const result = await recomputeRisksForPlot(plotId, 7);
      const newRisks = result.risks || [];
      setRisks(newRisks);

      Alert.alert("Updated", "Disease risk recomputed from latest weather.");
    } catch (err) {
      console.log("Error recomputing risk:", err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to recompute risk."
      );
    } finally {
      setRecomputing(false);
    }
  };

  const goToAddObservation = () => {
    navigation.navigate("AddObservation", { plotId });
  };

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
      {/* Field info */}
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

      {/* Actions */}
      <View style={[styles.card, styles.rowBetween]}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Button
            title={recomputing ? "Recomputing..." : "Recompute Risk (7 days)"}
            onPress={onRecompute}
            disabled={recomputing}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Button title="Add Observation" onPress={goToAddObservation} />
        </View>
      </View>

      {/* Risk section */}
      <Text style={styles.sectionTitle}>Current Disease Risk</Text>

      {(!risks || risks.length === 0) ? (
        <View style={styles.card}>
          <Text>No risk forecast stored yet for this field.</Text>
          <Text style={styles.subSmall}>
            Tap "Recompute Risk" to generate 7-day weather-based disease risk.
          </Text>
        </View>
      ) : (
        risks.map((r) => (
          <View key={r._id} style={styles.card}>
            <View style={styles.rowBetween}>
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

      {/* Observations section (optional) */}
      <Text style={styles.sectionTitle}>Field Observations</Text>
      {(!observations || observations.length === 0) ? (
        <View style={styles.card}>
          <Text>No observations recorded yet.</Text>
          <Text style={styles.subSmall}>
            After visiting, add a new observation with disease score and N / water
            status.
          </Text>
        </View>
      ) : (
        observations.map((obs) => (
          <View key={obs._id} style={styles.card}>
            <Text style={styles.disease}>{obs.disease || "Observation"}</Text>
            <Text style={styles.explanation}>
              Score (0–9): {obs.score0to9 ?? "-"}
            </Text>
            <Text style={styles.meta}>
              N-level: {obs.nitrogenLevel || "NA"} • Water:{" "}
              {obs.waterStatus || "NA"}
            </Text>
            <Text style={styles.meta}>
              {new Date(obs.observationDate || obs.createdAt).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "700" },
  sub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
  subSmall: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12 },
  disease: { fontSize: 14, fontWeight: "700" },
  explanation: { fontSize: 13, color: "#4b5563", marginTop: 6 },
  meta: { fontSize: 11, color: "#9ca3af", marginTop: 4 },
});