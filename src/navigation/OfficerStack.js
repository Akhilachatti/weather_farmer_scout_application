import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfficerHomeScreen from "../screens/officer/OfficerHomeScreen";
import PlotRiskListScreen from "../screens/officer/PlotRiskListScreen";
import PlotDetailScreen from "../screens/farmer/PlotDetailScreen";
import PlotListScreen from "../screens/farmer/PlotListScreen";

const Stack = createNativeStackNavigator();

export default function OfficerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OfficerHome"
        component={OfficerHomeScreen}
        options={{ title: "Mandal Disease Dashboard" }}
      />
      <Stack.Screen
        name="PlotListScreen"
        component={PlotListScreen}
        options={{ title: "Plot Details" }}
      />

      <Stack.Screen
        name="PlotDetail"
        component={PlotDetailScreen}
        options={{ title: "Plot Detail" }}
      />
      
      <Stack.Screen
        name="PlotRiskList"
        component={PlotRiskListScreen}
        options={{ title: "High-Risk Plots" }}
      />

    </Stack.Navigator>
  );
}