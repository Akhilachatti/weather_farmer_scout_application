import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchMyPlots } from "../../api/plotApi";

export default function ScoutPlotListScreen({ navigation }) {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlots = async () => {
    try {
      setLoading(true);
      const data = await fetchMyPlots();
      setPlots(data || []);
    } catch (e) {
      console.log("Error fetching plots for scout:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadPlots);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadPlots();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading assigned fields...</Text>
      </View>
    );
  }

  if (!plots.length) {
    return (
      <View style={styles.center}>
        <Text>No fields are assigned to you yet.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={plots}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ScoutPlotDetail", { plotId: item._id })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sub}>
              {item.village}, {item.mandal}, {item.district}
            </Text>
            <Text style={styles.subSmall}>
              Crop: {item.crop} • Variety: {item.variety} • {item.areaAcre} acres
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
  subSmall: { fontSize: 12, color: "#6b7280", marginTop: 4 },
});