import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function ScoutHomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, Scout</Text>
      <Text style={styles.sub}>
        Monitor fields, update on-ground observations, and recompute disease risks
        using the latest weather data.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ScoutPlotList")}
      >
        <Text style={styles.cardTitle}>My Assigned Fields</Text>
        <Text style={styles.cardSub}>
          View all fields mapped to your mandal and see current disease risk.
        </Text>
      </TouchableOpacity>

      {/* add the logout button */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.cardTitle}>Logout</Text>
        <Text style={styles.cardSub}>Sign out of your scout account.</Text>
      </TouchableOpacity>

      {/* Later you can add high-risk filter, visits due today, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f3f4f6" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  sub: { fontSize: 14, color: "#4b5563", marginBottom: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
});