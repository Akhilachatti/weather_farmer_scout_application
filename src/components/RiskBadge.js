import React from "react";
import { View, Text, StyleSheet } from "react-native";

const COLORS = {
  GREEN: "#16a34a",
  YELLOW: "#eab308",
  ORANGE: "#f97316",
  RED: "#dc2626",
};

export default function RiskBadge({ severity, score }) {
  const color = COLORS[severity] || "#6b7280";
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>
        {severity} ({score})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: { color: "white", fontWeight: "600", fontSize: 12 },
});