import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScoutHomeScreen from "../../src/screens/scout/ScoutHomeScreen";
import ScoutPlotListScreen from "../../src/screens/scout/ScoutPlotListScreen";
import ScoutPlotDetailScreen from "../../src/screens/scout/ScoutPlotDetailScreen";
import AddObservationScreen from "../../src/screens/scout/AddObservationScreen";

const Stack = createNativeStackNavigator();

export default function ScoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScoutHome"
        component={ScoutHomeScreen}
        options={{ title: "Scout Dashboard" }}
      />
      <Stack.Screen
        name="ScoutPlotList"
        component={ScoutPlotListScreen}
        options={{ title: "My Assigned Fields" }}
      />
      <Stack.Screen
        name="ScoutPlotDetail"
        component={ScoutPlotDetailScreen}
        options={{ title: "Field Risk & Visits" }}
      />
      <Stack.Screen
        name="AddObservation"
        component={AddObservationScreen}
        options={{ title: "Add Field Observation" }}
      />
    </Stack.Navigator>
  );
}