import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { createPlot } from "../../api/plotApi";

export default function AddPlotScreen({ navigation }) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("Guntur");
  const [mandal, setMandal] = useState("Chilakaluripet");
  const [village, setVillage] = useState("");
  const [areaAcre, setAreaAcre] = useState("");
  const [crop, setCrop] = useState("RICE");
  const [variety, setVariety] = useState("");
  const [sowingDate, setSowingDate] = useState(""); // YYYY-MM-DD
  const [season, setSeason] = useState("Kharif");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const onSave = async () => {
    if (!name || !village || !mandal || !district) {
      Alert.alert("Missing info", "Please fill field name, village, mandal, district.");
      return;
    }
    if (!lat || !lng) {
      Alert.alert("Missing location", "Please enter latitude and longitude.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name,
        district,
        mandal,
        village,
        areaAcre: areaAcre ? Number(areaAcre) : null,
        crop,
        variety,
        sowingDate: sowingDate || null, // backend can handle null
        season,
        location: {
          lat: Number(lat),
          lng: Number(lng),
        },
      };

      const created = await createPlot(payload);
      console.log("Created plot:", created);

      Alert.alert("Success", "Field added successfully.", [
        {
          text: "OK",
          onPress: () => {
            // Go back to plot list and refresh
            navigation.goBack();
          },
        },
      ]);
    } catch (e) {
      console.log("Error creating plot:", e.response?.data || e.message);
      Alert.alert(
        "Error",
        e.response?.data?.message || "Failed to create field. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Field</Text>

      <Text style={styles.label}>Field Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Nageswaramma Field 1"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>District</Text>
      <TextInput
        style={styles.input}
        placeholder="Guntur"
        value={district}
        onChangeText={setDistrict}
      />

      <Text style={styles.label}>Mandal</Text>
      <TextInput
        style={styles.input}
        placeholder="Chilakaluripet"
        value={mandal}
        onChangeText={setMandal}
      />

      <Text style={styles.label}>Village</Text>
      <TextInput
        style={styles.input}
        placeholder="Village name"
        value={village}
        onChangeText={setVillage}
      />

      <Text style={styles.label}>Area (acres)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2"
        keyboardType="numeric"
        value={areaAcre}
        onChangeText={setAreaAcre}
      />

      <Text style={styles.label}>Crop</Text>
      <TextInput
        style={styles.input}
        placeholder="RICE"
        value={crop}
        onChangeText={setCrop}
      />

      <Text style={styles.label}>Variety</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Swarna"
        value={variety}
        onChangeText={setVariety}
      />

      <Text style={styles.label}>Sowing Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-07-01"
        value={sowingDate}
        onChangeText={setSowingDate}
      />

      <Text style={styles.label}>Season</Text>
      <TextInput
        style={styles.input}
        placeholder="Kharif / Rabi"
        value={season}
        onChangeText={setSeason}
      />

      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        placeholder="16.086"
        keyboardType="numeric"
        value={lat}
        onChangeText={setLat}
      />

      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        placeholder="80.169"
        keyboardType="numeric"
        value={lng}
        onChangeText={setLng}
      />

      {/* Later we can add a "Use current GPS location" button here */}

      <View style={{ marginTop: 24 }}>
        <Button
          title={submitting ? "Saving..." : "Save Field"}
          onPress={onSave}
          disabled={submitting}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
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