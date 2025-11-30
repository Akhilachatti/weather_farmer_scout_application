import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function FarmerHomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Namaste, {user?.name || "Farmer"} 👋</Text>
      <Text style={styles.sub}>
        This week’s rice disease risk for your fields will be shown here.
      </Text>

      <Button
        title="View My Fields & Risks"
        onPress={() => navigation.navigate("PlotList")}
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