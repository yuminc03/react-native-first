import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello! I made a RN App!</Text>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72C5FC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    color: '#0000ff'
  }
});
