import React from 'react';
import { FlatList } from 'react-native';

const MovieListRow = ({
  data,
  type,
  isSearch,
  keyGrid,
  numColumns,
  refreshing,
  onRefresh,
  navigate,
  renderItem
}) => (
  <FlatList
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    removeClippedSubviews
    keyExtractor={item => item.id.toString()}
    refreshing={refreshing}
    onRefresh={onRefresh}
    renderItem={({ item }) =>
      renderItem(item, type, isSearch, numColumns, navigate)
    }
  />
);

export default MovieListRow;
