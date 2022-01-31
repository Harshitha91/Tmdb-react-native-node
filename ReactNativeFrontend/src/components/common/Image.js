/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';

const ImageCustom = ({
  accessibilityRole = 'image',
  accessibilityLabel = '',
  resizeMode = 'cover',
  uri = '',
  width,
  height,
  style
}) => {
  const image = uri ? { ...uri } : null;

  if(image) {
    return (
      <Image
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        resizeMode={resizeMode}
        source={image}
        style={[style, { width, height }]}
      />
    );
  } else {
    return null;
  }

  
};

export { ImageCustom as Image };
