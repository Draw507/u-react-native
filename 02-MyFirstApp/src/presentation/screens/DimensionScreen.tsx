import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Dimensions} from 'react-native';
import {Text} from 'react-native-paper';

// const {width, height} = Dimensions.get('window');

export const DimensionScreen = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View>
      <View style={styles.container}>
        <View style={{...styles.purpleBox, width: width * 0.6}} />
      </View>
      <Text>
        w: {width}, h:{height}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
  purpleBox: {
    backgroundColor: '#5856D6',
    height: '50%',
    width: '50%',
  },
});
