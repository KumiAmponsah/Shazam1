import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnlyButton4 from './onlyButton4'; // Import OnlyButton4 component
import Concert from './Concert'; // Import Concert component
import Library from './Library'; // Import Library component
import Settings from './Settings';

const { width, height } = Dimensions.get('window');

function HomeScreen() {
  const navigation = useNavigation();
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -100) { // Adjust this threshold for sensitivity
          navigation.navigate('Concert'); // Navigate to Concert screen on swipe left
        } else if (gestureState.dx > 100) {
          navigation.navigate('Library'); // Navigate to Library screen on swipe right
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={styles.viewContainer} {...panResponder.panHandlers}>
      <View style={styles.libraryAndConcert}>
        {/* Library section containing the icon and text */}
        <View style={styles.libraryContainer}>
          <FontAwesome name="book" size={width * 0.1} color="#110f0f" style={styles.icon} />
          <Text style={styles.libraryText}>Library</Text>
        </View>

        {/* Concert section containing the icon and text */}
        <View style={styles.concertContainer}>
          <FontAwesome name="ticket" size={width * 0.125} color="#110f0f" style={styles.icon} />
          <Text style={styles.concertText}>Concerts</Text>
        </View>
      </View>

      {/* "Tap to" section with text */}
      <View style={styles.centerContainer}>
        <Text style={styles.tapToText}>Ttap to</Text>

        {/* TouchableOpacity component with an image */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OnlyButton4')}>
          <Image
            source={require('./assets/meloraImage.png')} // Replace this with an actual URL
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Search icon container */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={width * 0.1} color="#ffffff" />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnlyButton4" component={OnlyButton4} options={{ headerShown: false }} />
        <Stack.Screen name="Concert" component={Concert} options={{ headerShown: false }} />
        <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#195497'
  },
  libraryAndConcert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.08, // Adjust the spacing as needed
    marginTop: height * 0.05
  },
  libraryContainer: {
    alignItems: 'center',
  },
  concertContainer: {
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
  },
  tapToText: {
    fontSize: width * 0.075,
    color: '#ffffff',
    fontWeight: '900',
    marginBottom: height * 0.1, // Adjust the spacing as needed
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // 40% of screen width to maintain a square shape
    borderRadius: (width * 0.4) / 2, // Half of the width/height to make it a perfect circle
    marginBottom: height * 0.09, // Adjust the spacing as needed
  },
  logo: {
    width: width * 0.324, // Adjusted width as a percentage
    height: (width * 0.324) * 0.92, // Adjust height to maintain aspect ratio
  },
  searchContainer: {
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: '#7a777a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (width * 0.15) / 2,
  },
  libraryText: {
    fontSize: width * 0.04, // Adjusted font size as a percentage
    marginLeft: width * 0.02, // Adjust the spacing as needed
  },
  concertText: {
    fontSize: width * 0.045, // Adjusted font size as a percentage
    fontWeight: '900',
    marginLeft: width * 0.02, // Adjust the spacing as needed
  },
});
