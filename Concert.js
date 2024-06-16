import React, { useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Concert() {
  const navigation = useNavigation();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 100) { // Swipe right threshold
          navigation.navigate('Home'); // Navigate back to Home (App.js) on swipe right
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={styles.viewContainer} {...panResponder.panHandlers}>
      <View style={styles.concertAndSearch}>
        <Text style={styles.concertText}>Concerts</Text>
        <FontAwesome name="search" size={width * 0.08} color="#ffffff" style={styles.icon} />
      </View>
      <View style={styles.line} />

      <Text style={styles.savedConcertText}>Saved concerts</Text>
      
      {/* Rectangle with dashed border and text inside */}
      <View style={styles.dashedRectangle}>
        <Text style={styles.rectangleText}>Concerts you save will show up here</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.exploreForYou}>
        <Text style={styles.exploreText}>Explore:</Text>
        <Text style={styles.forYouText}>For you</Text>
        <FontAwesome name="angle-down" size={width * 0.06} color="#655d5d" style={styles.icon} />
      </View>

      <Text style={styles.artistsYouMeloraText}>Upcoming concerts from artists you Melora</Text>

      <Button
        title="Press Me"
        onPress={() => Alert.alert('Melora 🎵🎶🎶🔊')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#131d45',
    flex: 1,
  },
  concertAndSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.08,
    paddingHorizontal: width * 0.05,
  },
  concertText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 25,
    marginLeft: width * 0.35,
    right: width * 0.04,
  },
  icon: {
    right: width * 0.1,
  },
  line: {
    height: height * 0.002,
    backgroundColor: '#dbd2d2',
    width: '100%',
  },
  savedConcertText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 27,
    marginTop: height * 0.035,
    marginLeft: width * 0.05,
  },
  dashedRectangle: {
    borderWidth: 2,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
    padding: 20,
    marginTop: height * 0.020,
    marginBottom : height * 0.03,
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  exploreForYou: {
    flexDirection: 'row',
    marginTop : height * 0.02
  },
  exploreText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 30,
    marginRight: width * 0.02,
  },
  forYouText: {
    color: '#250eb7',
    fontWeight: '700',
    fontSize: 30,
  },
  icon:{
    left: width * 0.05,
    top: width * 0.02,
  },
  artistsYouMeloraText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    marginTop : height * 0.02
  },
});

