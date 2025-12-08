import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";

import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Job } from "@/data/mockData";

import FarmerHomeScreen from "@/screens/farmer/FarmerHomeScreen";
import FarmerJobDetailScreen from "@/screens/farmer/FarmerJobDetailScreen";
import FarmerJobHistoryScreen from "@/screens/farmer/FarmerJobHistoryScreen";

export type FarmerStackParamList = {
  FarmerHome: undefined;
  FarmerJobDetail: { job: Job };
  FarmerJobHistory: undefined;
};

const Stack = createNativeStackNavigator<FarmerStackParamList>();

export default function FarmerStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();
  const { logout } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="FarmerHome"
        component={FarmerHomeScreen}
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
        name="FarmerJobDetail"
        component={FarmerJobDetailScreen}
        options={{ headerTitle: "Job Details" }}
      />
      <Stack.Screen
        name="FarmerJobHistory"
        component={FarmerJobHistoryScreen}
        options={{ headerTitle: "Job History" }}
      />
    </Stack.Navigator>
  );
}
