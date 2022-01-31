import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';
import { getImageApi } from '../../../../utils/images';

import styles from './styles';

const PosterRow = ({
  title,
  backdropPath,
}) => {

  return (
    <View style={styles.containerMainPhoto}>
      <Image
        accessibilityLabel={`${title} image`}
        uri={getImageApi(backdropPath)}
        resizeMode="cover"
        width="100%"
        height="100%"
      />
      <TouchableOpacity
        style={styles.containerMainPhotoInfo}
        activeOpacity={ 1}
        onPress={ null}
      >
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={2} style={styles.photoInfo}>
            {title}
          </Text>
          <View style={styles.photoStar}>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PosterRow;
