import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterFarmerScreen from "../screens/auth/RegisterFarmerScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "AP Agri Guard - Login" }}
      />
      <Stack.Screen
        name="RegisterFarmer"
        component={RegisterFarmerScreen}
        options={{ title: "Farmer Registration" }}
      />
    </Stack.Navigator>
  );
}