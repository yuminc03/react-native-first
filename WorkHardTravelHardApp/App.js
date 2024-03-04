import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  TouchableWithoutFeedback, 
  Pressable 
} from 'react-native';
import { theme } from './colors';

export default function App() {
  return (
    <View style = {styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style = "auto" />
      <View style = {styles.header}>
        {/* <TouchableHighlight 
        underlayColor = 'red'
        activeOpacity = {0.5}
        onPress = {() => console.log('pressed')}
        >
          <Text style = {styles.btnText}>Travel</Text>
        </TouchableHighlight> */}
        <TouchableOpacity>
          <Text style = {styles.btnText}>Work</Text>
        </TouchableOpacity>
        {/* <Pressable>
          <Text style = {styles.btnText}>Work</Text>
        </Pressable> */}
        <TouchableWithoutFeedback onPress = {() => console.log('pressed')}>
          <Text style = {styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
    fontWeight: '600',
    color: 'white'
  },
});
