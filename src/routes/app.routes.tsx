import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'
import { Resume } from '../screens/Resume';

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
    tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        showLabel: false,
        style: {
          height: 72,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}