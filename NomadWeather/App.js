// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Hello! I made a RN App!</Text>
    //   <Text>Hello World!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <View style = {{ flex: 1 }}>
      <View style = {{flex: 1, backgroundColor: "tomato"}}></View>
      <View style = {{flex: 3, backgroundColor: "teal"}}></View>
      <View style = {{flex: 1, backgroundColor: "orange"}}></View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#72C5FC',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   text: {
//     fontSize: 28,
//     color: '#0000ff'
//   }
// });
