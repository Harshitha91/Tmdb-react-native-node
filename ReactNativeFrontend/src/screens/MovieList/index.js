import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import MovieListRow from '../../components/cards/rows/MovieListRow';
import MovieRow from '../../components/cards/rows/MovieRow';

import request from '../../services/api';

import styles from './styles';

const MovieList = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState({
    type: 'popularity.desc',
    name: 'Most popular'
  });

  const routeName = route?.name ?? '';

  const requestMoviesList = async () => {
    try {
      setIsLoading(true);

      const data = routeName == 'PopularMovieList' ? await request(`popular-movies`) : await request(`latest-movies`)

      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(false);
      setResults( data);
    } catch (err) {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefresh(false);
      setIsError(true);
    }
  };

  const handleRefresh = async () => {
    await setIsRefresh(true);
    await requestMoviesList();
  };


  const renderItem = (item, type, isSearch, numColumns, navigate) => (
    <MovieRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
      navigate={navigate}
    />
  );

  useEffect(() => {
    requestMoviesList();
  }, []);

  const { navigate } = navigation;

  return (
    <Screen>
      <View style={styles.container}>
        {isLoading && !isRefresh && !isLoadingMore ? (
          <Spinner />
        ) : isError ? (
          <NotificationCard icon="alert-octagon" onPress={requestMoviesList} />
        ) : results.length === 0 ? (
          <NotificationCard
            icon="thumbs-down"
            textError="No results available."
          />
        ) : (
          <View style={styles.containerList}>
            <MovieListRow
              data={results}
              type="normal"
              isSearch={false}
              keyGrid={1}
              numColumns={1}
              refreshing={isRefresh}
              onRefresh={handleRefresh}
              navigate={navigate}
              renderItem={renderItem}
            />
          </View>
        )}

      </View>
    </Screen>
  );
};

export default MovieList;
