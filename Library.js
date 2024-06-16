import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Library() {
  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -100) { // Swipe left threshold
          navigation.navigate('Home'); // Navigate to Home on swipe left
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.viewContainer} {...panResponder.panHandlers}>
        <View style={styles.libraryTextAndIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <FontAwesome name="gear" size={width * 0.1} color="white" />
          </TouchableOpacity>
          <Text style={styles.libraryText}>Library</Text>
        </View>

        {/* Additional UI elements from the second file */}
        <Text style={styles.MeloraText}>Recent Meloras</Text>

        <View style={styles.categories}>
          <View style={styles.dashedRectangle}>
            <FontAwesome name="close" size={width * 0.14} color={'white'} style={styles.closeIcon}/>
            <Text style={styles.rectangleText}>Play full tracks and more</Text>
          </View>
          <View style={styles.dashedRectangle2}>
            <FontAwesome name="close" size={width * 0.14} color={'white'} style={styles.closeIcon}/>
            <Text style={styles.rectangleText}>Play full tracks and more</Text>
          </View>
        </View>

        {/* End of additional UI elements */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#131d45', // Updated background color to match second file
    paddingTop: height * 0.03,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#131d45', // Updated background color to match second file
    paddingVertical: height * 0.005,
  },
  libraryTextAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  libraryText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: width * 0.02,
  },
  MeloraText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
    marginLeft: width * 0.05,
    marginTop: height * 0.3,
  },
  dashedRectangle: {
    borderWidth: 2,
    backgroundColor: '#ee1414',
    borderColor: '#ee1414',
    borderStyle: 'solid',
    height: height * 0.35,
    width: width * 0.4,
    borderRadius: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  dashedRectangle2: {
    borderWidth: 2,
    borderColor: '#706666',
    borderStyle: 'solid',
    height: height * 0.35,
    width: width * 0.4,
    borderRadius: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  closeIcon: {
    bottom: height * 0.1,
    left: width * 0.25,
  },
  rectangleText: {
    bottom: height * 0.06,
    left: width * 0.01,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 2,
    padding: width * 0.01,
  },
  categories: {
    flexDirection: 'row',
  },
});
