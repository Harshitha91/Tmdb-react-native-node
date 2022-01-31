import React from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from '../../common/TouchableOpacity';

import styles from './styles';

const NotificationCard = ({
  style = styles.containerError,
  icon = 'alert-octagon',
  textError = 'Something wrong has happened, please try again later.',
  textButton = 'Load',
  onPress = null
}) => (
  <View style={style}>
    <Text style={styles.errorInfo}>{textError}</Text>
    {onPress && (
      <TouchableOpacity style={styles.loadingButton} onPress={onPress}>
        <Text style={styles.loadingText}>{textButton}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default NotificationCard;
