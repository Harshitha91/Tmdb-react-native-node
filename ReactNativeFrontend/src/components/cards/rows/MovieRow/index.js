import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';

import { getResponsiveWidth } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';

import { ROUTES } from '../../../../navigation/routes';

import styles from './styles';

const WIDTH = getResponsiveWidth(30);
const HEIGHT = getResponsiveWidth(40);


const renderScore = (voteAverage) => {
  const color =
    voteAverage < 5
      ? 'low'
      : voteAverage >= 5 && voteAverage < 7
      ? 'mid'
      : 'high';

  return (
    <View style={[styles.score, styles[color]]}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

const MovieRow = memo(
  ({ item, navigate }) => (
    <>
      
        <TouchableOpacity
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View style={styles.containerItem}>
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              width={WIDTH}
              height={HEIGHT}
              style={styles.photo}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {item.release_date}
                  </Text>
                </View>
                <View style={[styles.textRow, styles.containerReview]}>
                {renderScore(item.vote_average)}
              </View>
              </View>
              
            </View>
          </View>
        </TouchableOpacity>
      
    </>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

export default MovieRow;
