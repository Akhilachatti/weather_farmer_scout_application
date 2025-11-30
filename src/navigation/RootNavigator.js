import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import AuthStack from "./AuthStack";
import FarmerStack from "./FarmerStack";
import OfficerStack from "./OfficerStack";
import AdminStack from "./AdminStack";
import ScoutStack from "./ScoutStack";      // ⬅️ add this
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : user.role === "FARMER" || user.role === "LEAD_FARMER" ? (
        <FarmerStack />
      ) : user.role === "SCOUT" ? (
        <ScoutStack />                    // ⬅️ dedicated scout flow
      ) : user.role === "MANDAL_OFFICER" ? (
        <OfficerStack />                  // ⬅️ mandal officer flow
      ) : (
        <AdminStack />
      )}
    </NavigationContainer>
  );
}