import React from 'react';
import { Text } from 'react-native';

export function MenloText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Menlo' }]} />
  );
}
