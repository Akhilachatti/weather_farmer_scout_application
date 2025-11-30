import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmerHomeScreen from "../screens/farmer/FarmerHomeScreen";
import PlotListScreen from "../screens/farmer/PlotListScreen";
import PlotDetailScreen from "../screens/farmer/PlotDetailScreen";
import AddPlotScreen from "../screens/farmer/AddPlotScreen";

const Stack = createNativeStackNavigator();

export default function FarmerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FarmerHome"
        component={FarmerHomeScreen}
        options={{ title: "My Rice Disease Risk" }}
      />
      <Stack.Screen
        name="PlotList"
        component={PlotListScreen}
        options={{ title: "My Fields" }}
      />
      <Stack.Screen
        name="PlotDetail"
        component={PlotDetailScreen}
        options={{ title: "Field Details" }}
      />
      <Stack.Screen
        name="AddPlot"
        component={AddPlotScreen}
        options={{ title: "Add New Field" }}
      />
    </Stack.Navigator>
  );
}