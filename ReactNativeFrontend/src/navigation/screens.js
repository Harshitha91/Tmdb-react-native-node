import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MovieList from '../screens/MovieList';
import MovieDetails from '../screens/MovieDetails';

import { white, darkBlue } from '../utils/colors';

import { ROUTES } from './routes';

const screenOptions = {
  headerStyle: {
    backgroundColor: white
  },
  headerTintColor: darkBlue,
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

const PopularStack = createStackNavigator();
export const PopularMoviesStack = () => (
  <PopularStack.Navigator screenOptions={{ ...screenOptions }}>
    <PopularStack.Screen
      name={ROUTES.POPULAR_MOVIE_LIST}
      component={MovieList}
      options={{
        title:'Popular Movies'
      }}
    />
    <PopularStack.Screen
      name={ROUTES.MOVIE_DETAILS}
      component={MovieDetails}
      options={({ route }) => {
        const { title } = route.params || {};

        return {
          title
        };
      }}
    />
  </PopularStack.Navigator>
);

const LatestStack = createStackNavigator();
export const LatestMoviesStack = () => (
  <LatestStack.Navigator screenOptions={{ ...screenOptions }}>
    <LatestStack.Screen
      name={ROUTES.LATEST_MOVIE_LIST}
      component={MovieList}
      options={{
        title:'Latest Movies',
        params: {id:'yyyyyyyyy'}
      }}
    />
    <LatestStack.Screen
      name={ROUTES.MOVIE_DETAILS}
      component={MovieDetails}
      options={({ route }) => {
        const { title } = route.params || {};

        return {
          title
        };
      }}
    />
  </LatestStack.Navigator>
);
