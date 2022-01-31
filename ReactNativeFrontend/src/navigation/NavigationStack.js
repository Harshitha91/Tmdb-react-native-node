import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
  PopularMoviesStack,
  LatestMoviesStack,
} from './screens';
import { TABS } from './routes';

import { white, pink, blue } from '../utils/colors';

enableScreens();

const Tab = createBottomTabNavigator();
const TabsConfig = {
  tabBarOptions: {
    activeTintColor: pink,
    inactiveTintColor: blue,
    labelStyle: {
      margin: 0,
      padding: 1
    },
    style: {
      backgroundColor: white
    }
  },
  screenOptions: {headerShown: false,}
};

const AppNavigator = () => (
  <NavigationContainer>
      <Tab.Navigator {...TabsConfig}>
        <Tab.Screen
          name={TABS.POPULAR}
          component={PopularMoviesStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcon name="star" size={20} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={TABS.LATEST}
          component={LatestMoviesStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcon name="refresh" size={20} color={color} />
            )
          }}
        />
      </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
