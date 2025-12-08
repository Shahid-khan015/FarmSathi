import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";

import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Job } from "@/data/mockData";

import OperatorHomeScreen from "@/screens/operator/OperatorHomeScreen";
import OperatorJobDetailScreen from "@/screens/operator/OperatorJobDetailScreen";
import OperatorWageSummaryScreen from "@/screens/operator/OperatorWageSummaryScreen";
import OperatorWageDetailScreen from "@/screens/operator/OperatorWageDetailScreen";

export type OperatorStackParamList = {
  OperatorHome: undefined;
  OperatorJobDetail: { job: Job };
  OperatorWageSummary: undefined;
  OperatorWageDetail: { job: Job };
};

const Stack = createNativeStackNavigator<OperatorStackParamList>();

export default function OperatorStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();
  const { logout } = useApp();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="OperatorHome"
        component={OperatorHomeScreen}
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
        name="OperatorJobDetail"
        component={OperatorJobDetailScreen}
        options={{ headerTitle: "Job Details" }}
      />
      <Stack.Screen
        name="OperatorWageSummary"
        component={OperatorWageSummaryScreen}
        options={{ headerTitle: "Wage Summary" }}
      />
      <Stack.Screen
        name="OperatorWageDetail"
        component={OperatorWageDetailScreen}
        options={{ headerTitle: "Wage Details" }}
      />
    </Stack.Navigator>
  );
}
