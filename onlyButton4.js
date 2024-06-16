import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnlyButton4() {
  const [isSearching, setIsSearching] = useState(true);
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    if (isSearching) {
      startRippleAnimation();
      startButtonRotation();
    } else {
      stopRippleAnimation();
      stopButtonRotation();
    }
  }, [isSearching]);

  const startRippleAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopRippleAnimation = () => {
    scaleValue.stopAnimation();
    opacityValue.stopAnimation();
  };

  const startButtonRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopButtonRotation = () => {
    rotateValue.stopAnimation();
  };

  const handleTap = () => {
    setIsSearching(prev => !prev);
  };

  const buttonRotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={handleTap} style={styles.buttonContainer}>
          <Animated.View style={[styles.button, { transform: [{ rotate: buttonRotation }] }]}>
            <View style={styles.rippleBox}>
              {isSearching && (
                <Animated.View
                  style={[
                    styles.ripple,
                    {
                      transform: [{ scale: scaleValue }],
                      opacity: opacityValue,
                    },
                  ]}
                />
              )}
              <View style={styles.logoContainer}>
                <Image
                  source={require('./assets/meloraImage.png')}
                  style={styles.logo}
                />
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      {isSearching && (
        <View style={styles.listeningTextContainer}>
          <Text style={styles.listeningText}>Listening</Text>
          <Text style={styles.listeningSubText}>Make sure your device can hear the</Text>
          <Text style={styles.listeningSubText}>song clearly</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132b47'
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
  },
  button: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  rippleBox: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  listeningTextContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    alignSelf: 'center',
    alignItems: 'center'
  },
  listeningText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  listeningSubText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
});
