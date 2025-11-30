import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function OfficerHomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, {user?.name || "Officer"}</Text>
      <Text style={styles.sub}>
        View high-risk villages and plots for your mandal and plan field visits.
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Button
          title="View Plot in Mandal Dashboard"
          onPress={() => navigation.navigate("PlotListScreen", { plotId: null })}
        />
      </View>

      <Button
        title="View High-Risk Fields"
        onPress={() => navigation.navigate("PlotRiskList")}
      />

      <View style={{ marginTop: 32 }}>
        <Button title="Logout" color="#dc2626" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  sub: { fontSize: 14, color: "#4b5563", marginBottom: 24 },
});