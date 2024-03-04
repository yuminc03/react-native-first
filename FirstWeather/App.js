import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const API_KEY = 'a4a7614309bb0c73eeaa7b6ef3b457f4'
const icons = {
  'Clouds': 'cloudy',
  'Clear': 'day-sunny',
  'Atmosphere': 'cloudy-gusts',
  'Snow': 'snow',
  'Rain': 'rains',
  'Drizzle': 'rain',
  'Thunderstorm': 'lightning'
}

export default function App() {
  const [city, setCity] = useState('loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    // location 가져오기를 허용할 것을 요청함
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      // 허용하지 않으면 setOk(false) -> 허용하지 않았을 때 다른 UI 보여주기
      setOk(false);
    }
    // 현재 위치를 위도, 경도로 가져옴
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    // 위도와 경도를 주소로 변환
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    console.log('lat: ' + latitude + ' long: ' + longitude)
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts&appid=${API_KEY}`
    );
    const json = await response.json();
    // 매일 기상정보를 state에 넣기
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
          <View style = {{ ...styles.day, alignItems: 'center'}}>
            <ActivityIndicator
              color = 'white'
              style = {{merginTop: 10}}
              size = 'large'
            />
          </View>
        ) : (
          days.map((day, index) => (
          <View key = {index} style = {styles.day}>
            <View 
              style = {{
                flexDirection: 'row', 
                alignItems: 'flex-end', 
                width: '100%', 
                justifyContent: 'space-between'
              }}
            >
              <Text style = {styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Fontisto name = {icons[day.weather[0].main]} size = {68} color = "white" />
            </View>
            <Text style = {styles.weather}>{day.weather[0].main}</Text>
            <Text style = {styles.description}>{day.weather[0].description}</Text>
            <Text style = {styles.tinyText}>{day.weather[0].description}</Text>
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
  weather: { },
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
  },
  tinyText: {
    fontSize: 30,
  }
})