import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();

  const [switchStates, setSwitchStates] = useState({
    meloraInNotification: false,
    meloraInPopup: false,
    autoMelora: false,
    meloraOnStartup: false,
    vibrate: false,
  });

  const toggleSwitch = (key) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer1}>
        <View style={styles.cloudSection}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <FontAwesome name="arrow-left" size={24} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <Image source={require('./assets/cloudImage.png')} style={styles.cloudImage} />
          <Text style={styles.meloraText}>Save your Meloras</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up or log in</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.meloraInOtherApps}>MELORA IN OTHER APPS</Text>
        <View style={styles.line} />

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraInNotification')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora from notification bar</Text>
              <Text style={styles.meloraDescriptionText1}>Show a persistent notification</Text>
              <Text style={styles.meloraDescriptionText2}>to Melora music in other apps</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraInNotification ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraInNotification')}
              value={switchStates.meloraInNotification}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraInPopup')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora from Pop-up</Text>
              <Text style={styles.meloraDescriptionText1}>Show a floating button to see lyrics</Text>
              <Text style={styles.meloraDescriptionText2}>and Melora music in other apps</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraInPopup ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraInPopup')}
              value={switchStates.meloraInPopup}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.line2} />

        <Text style={styles.streamingText}>STREAMING</Text>
        <View style={styles.line3} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Apple Music</Text>
              <Text style={styles.meloraDescriptionText1}>Play full songs in Melora with</Text>
              <Text style={styles.meloraDescriptionText2}>Apple Music subscription</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.buttonText2}>Connect</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


        <View style={styles.line3} />

        <Text style={styles.generalSettingsText}>GENERAL SETTINGS</Text>
        <View style={styles.line5} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Themes</Text>
              <Text style={styles.meloraDescriptionText1}>Change the appearance of Melora</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Autoplay videos</Text>
              <Text style={styles.meloraDescriptionText1}>Allow videos to autoplay across the app</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('autoMelora')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Auto Melora</Text>
              <Text style={styles.meloraDescriptionText1}>Tip: Press and hold the Melora button</Text>
              <Text style={styles.meloraDescriptionText2}>on home to start auto Melora</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.autoMelora ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('autoMelora')}
              value={switchStates.autoMelora}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('meloraOnStartup')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Melora on startup</Text>
              <Text style={styles.meloraDescriptionText1}>Set Shazam to identify music</Text>
              <Text style={styles.meloraDescriptionText2}>in app launch</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.meloraOnStartup ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('meloraOnStartup')}
              value={switchStates.meloraOnStartup}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => toggleSwitch('vibrate')}>
          <View style={styles.tabContent}>
            <View>
              <Text style={styles.meloraNotification}>Vibrate</Text>
              <Text style={styles.meloraDescriptionText1}>Set Shazam to vibrate once</Text>
              <Text style={styles.meloraDescriptionTextLast2}>Meloring finishes</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchStates.vibrate ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('vibrate')}
              value={switchStates.vibrate}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.line5} />

        <Text style={styles.supportText}>SUPPORT</Text>
        <View style={styles.line3} />

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>About</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <View style={styles.tabContentNoSwitch}>
            <View>
              <Text style={styles.meloraNotification}>Get help with Melora</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.line3} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContentNoSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'white',
    width: '100%',
    height: 1,
  },
  line2: {
    backgroundColor: '#828282',
    width: '100%',
    height: 1,
    marginTop: 10,
  },
  line3: {
    marginTop: 3,
    backgroundColor: '#828282',
    width: '100%',
    height: 1,
  },
  arrowIcon: {
    color: 'white',
  },
  meloraNotification: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  meloraDescriptionText1: {
    color: '#828282',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  meloraDescriptionText2: {
    color: '#828282',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  meloraDescriptionTextLast2: {
    color: '#828282',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  meloraInOtherApps: {
    marginLeft: 20,
    marginTop: 20,
    color: '#0D41F9',
    fontSize: 20,
  },
  streamingText: {
    marginLeft: 20,
    marginTop: 30,
    color: '#0D41F9',
    fontSize: 20,
  },
  meloraText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  cloudSection: {
    backgroundColor: '#5D17E7',
    minHeight: 400, // Adjust the minimum height as needed
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 50,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  innerContainer1: {
    flex: 1,
    backgroundColor: '#23152c',
    marginHorizontal: 10,
    marginTop: 5,
  },
  cloudImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#0C3EF1',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#E41212',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 90,
  },
  buttonText2: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  generalSettingsText: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#0D41F9',
    fontSize: 20,
  },
  line5: {
    backgroundColor: '#828282',
    height: 1,
  },
  supportText: {
    marginLeft: 20,
    marginTop: 20,
    color: '#0D41F9',
    fontSize: 20,
    marginBottom: 10,
  },
});
