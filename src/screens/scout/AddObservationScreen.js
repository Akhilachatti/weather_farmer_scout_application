import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { createDiseaseObservation } from "../../api/diseaseApi.js";

export default function AddObservationScreen({ route, navigation }) {
  const { plotId } = route.params;

  const [disease, setDisease] = useState("PADDY_BLAST");
  const [score, setScore] = useState(""); // 0–9
  const [nitrogenLevel, setNitrogenLevel] = useState("MEDIUM"); // LOW / MEDIUM / HIGH
  const [waterStatus, setWaterStatus] = useState("NORMAL"); // STRESSED / NORMAL / FLOODED
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSave = async () => {
    if (score === "") {
      Alert.alert("Missing", "Please enter 0–9 disease score.");
      return;
    }

    const numScore = Number(score);
    if (Number.isNaN(numScore) || numScore < 0 || numScore > 9) {
      Alert.alert("Invalid score", "Score must be a number from 0 to 9.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        plotId, // your controller may use body or params; params already has plotId
        disease,
        score0to9: numScore,
        nitrogenLevel,
        waterStatus,
        notes,
      };

      const res = await createDiseaseObservation(plotId, payload);
      console.log("Observation saved:", res);

      Alert.alert("Saved", "Observation recorded successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      console.log("Error saving observation:", e.response?.data || e.message);
      Alert.alert(
        "Error",
        e.response?.data?.message || "Failed to save observation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Field Observation</Text>

      <Text style={styles.label}>Disease</Text>
      <TextInput
        style={styles.input}
        value={disease}
        onChangeText={setDisease}
        placeholder="PADDY_BLAST / PADDY_BLB / ..."
      />

      <Text style={styles.label}>Disease Score (0–9)</Text>
      <TextInput
        style={styles.input}
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
        placeholder="0 (none) to 9 (severe)"
      />

      <Text style={styles.label}>Nitrogen Level</Text>
      <TextInput
        style={styles.input}
        value={nitrogenLevel}
        onChangeText={setNitrogenLevel}
        placeholder="LOW / MEDIUM / HIGH"
      />

      <Text style={styles.label}>Water Status</Text>
      <TextInput
        style={styles.input}
        value={waterStatus}
        onChangeText={setWaterStatus}
        placeholder="STRESSED / NORMAL / FLOODED"
      />

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={notes}
        onChangeText={setNotes}
        placeholder="Anything special you observed in the field..."
      />

      <View style={{ marginTop: 24 }}>
        <Button
          title={submitting ? "Saving..." : "Save Observation"}
          onPress={onSave}
          disabled={submitting}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  label: {
    fontSize: 13,
    marginTop: 12,
    marginBottom: 4,
    color: "#4b5563",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
});