import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Location from 'expo-location';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const API_KEY = 'a4a7614309bb0c73eeaa7b6ef3b457f4'

export default function App() {
  const [city, setCity] = useState('loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps: false}
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metirc`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style = {styles.container}>
      <View style = {styles.city}>
        <Text style = {styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled 
      horizontal
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle = {styles.weather}
      >
        {days.length === 0 ? (
          <View style = {styles.day}>
            <ActivityIndicator
              color = 'white'
              style = {{merginTop: 10}}
              size = {'large'}
            />
          </View>
        ) : (
          days.map((day, index) => (
          <View key = {index} style = {styles.day}>
            <Text style = {styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Text style = {styles.weather}>{day.weather[0].main}</Text>
          </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C6DEA'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: '500'
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  }
})