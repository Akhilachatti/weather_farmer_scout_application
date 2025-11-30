import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { fetchMyPlots } from "../../api/plotApi";

export default function PlotListScreen({ navigation }) {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlots = async () => {
    try {
      const data = await fetchMyPlots();
      setPlots(data);
    } catch (e) {
      console.log("Error fetching plots:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // reload when coming back from AddPlot
      setLoading(true);
      loadPlots();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadPlots();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading fields...</Text>
      </View>
    );
  }

  if (!plots.length) {
    return (
      <View style={styles.center}>
        <Text>No fields registered yet.</Text>
        <View style={{ marginTop: 16 }}>
          <Button
            title="Add First Field"
            onPress={() => navigation.navigate("AddPlot")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>My Fields</Text>
        <Button
          title="+ Add Field"
          onPress={() => navigation.navigate("AddPlot")}
        />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={plots}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PlotDetail", { plotId: item._id })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sub}>
              {item.village}, {item.mandal} ({item.areaAcre} acres)
            </Text>
            <Text style={styles.subSmall}>
              Crop: {item.crop} • Variety: {item.variety}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 13, color: "#4b5563", marginTop: 4 },
  subSmall: { fontSize: 12, color: "#6b7280", marginTop: 4 },
});