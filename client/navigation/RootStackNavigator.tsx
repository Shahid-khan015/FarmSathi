import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useApp } from "@/context/AppContext";

import AuthStackNavigator from "@/navigation/AuthStackNavigator";
import RoleSelectScreen from "@/screens/RoleSelectScreen";
import OperatorStackNavigator from "@/navigation/OperatorStackNavigator";
import FarmerStackNavigator from "@/navigation/FarmerStackNavigator";
import OwnerStackNavigator from "@/navigation/OwnerStackNavigator";

export type RootStackParamList = {
  Auth: undefined;
  RoleSelect: undefined;
  OperatorStack: undefined;
  FarmerStack: undefined;
  OwnerStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();
  const { currentRole } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {currentRole === null ? (
        <>
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoleSelect"
            component={RoleSelectScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : currentRole === "operator" ? (
        <Stack.Screen
          name="OperatorStack"
          component={OperatorStackNavigator}
          options={{ headerShown: false }}
        />
      ) : currentRole === "farmer" ? (
        <Stack.Screen
          name="FarmerStack"
          component={FarmerStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="OwnerStack"
          component={OwnerStackNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
