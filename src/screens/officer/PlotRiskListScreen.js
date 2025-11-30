import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchHighRiskPlots } from "../../api/riskApi";
import RiskBadge from "../../components/RiskBadge";

export default function PlotRiskListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHighRiskPlots({ minScore: 50 });
        setItems(data);
      } catch (e) {
        console.log("Error fetching high risk plots:", e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading high-risk plots...</Text>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text>No high-risk plots at this moment.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={items}
      keyExtractor={(item) => item.plot._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("PlotDetail", { plotId: item.plot._id })
          }
        >
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>{item.plot.name}</Text>
              <Text style={styles.sub}>
                {item.plot.village}, {item.plot.mandal}
              </Text>
              <Text style={styles.subSmall}>
                Farmer: {item.plot.farmerName || "Unknown"}
              </Text>
            </View>
            <RiskBadge severity={item.severity} score={item.score} />
          </View>
          <Text style={styles.subSmall}>
            Top disease: {item.disease} • {item.explanation}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white", 
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
  subSmall: { fontSize: 12, color: "#6b7280", marginTop: 4 },
});