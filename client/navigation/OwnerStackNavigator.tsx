import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";

import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Job, Machine } from "@/data/mockData";

import OwnerHomeScreen from "@/screens/owner/OwnerHomeScreen";
import MachineDetailScreen from "@/screens/owner/MachineDetailScreen";
import OwnerJobsScreen from "@/screens/owner/OwnerJobsScreen";

export type OwnerStackParamList = {
  OwnerHome: undefined;
  MachineDetail: { machine: Machine };
  OwnerJobs: undefined;
};

const Stack = createNativeStackNavigator<OwnerStackParamList>();

export default function OwnerStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();
  const { logout } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="OwnerHome"
        component={OwnerHomeScreen}
        options={{
          headerTitle: "Dashboard",
          headerRight: () => (
            <HeaderButton onPress={logout}>
              <Feather name="log-out" size={22} color={theme.text} />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="MachineDetail"
        component={MachineDetailScreen}
        options={{ headerTitle: "Machine Details" }}
      />
      <Stack.Screen
        name="OwnerJobs"
        component={OwnerJobsScreen}
        options={{ headerTitle: "All Jobs" }}
      />
    </Stack.Navigator>
  );
}
