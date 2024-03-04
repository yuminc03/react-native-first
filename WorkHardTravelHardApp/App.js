import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput, 
  View, 
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from './colors';

const STORAGE_KEY = '@toDos'

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  useEffect (() => {
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      // String into JavaScript Object
      setToDos(JSON.parse(s));
    }
  };
  const addToDo = async () => {
    if(text === '') {
      return;
    }
    // const newTodos = Object.assign(
    //   {}, 
    //   toDos, 
    //   {[Date.now()]: {text, work: working}}
    // );
    /// 이전 내용과 현재 내용 합치기
    const newToDos = {
      ... toDos, 
      [Date.now()]: {text, working}
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };
  const deleteToDo = async (key) => {
    /// Web에서는 Alert이 작동하지 않음
    if (Platform.OS === "web") {
      const ok = confirm("Do you want to delete this To Do?")
      if (ok) {
        const newToDos = {... toDos};
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    } else {
      Alert.alert(
        'Delete To Do?', 
        'Are you sure?', 
        [
          {text: "Cancel"},
          {
            text: "I'm Sure", 
            style: 'destructive',
            onPress: async () => {
              /// 기존 내용으로 새로운 ToDos만들기
              const newToDos = {... toDos};
              delete newToDos[key];
              setToDos(newToDos);
              saveToDos(newToDos);
            },
          },
        ]
      );
    }
  };

  return (
    <View style = {styles.container}>
      <StatusBar style = "light" />
      <View style = {styles.header}>
        <TouchableOpacity onPress = {work}>
          <Text style = {{
            fontSize: 38,
            fontWeight: '600', 
            color: working ? 'white' : theme.gray
          }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {travel}>
          <Text style = {{
            fontSize: 38,
            fontWeight: '600', 
            color:!working ? 'white' : theme.gray
          }}>
          Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing = {addToDo}
          onChangeText = {onChangeText}
          returnKeyType = 'done'
          value = {text}
          placeholder = {working ? 'Add a To Do' : 'Where do you want to go?'} 
          style = {styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map(key => (
            toDos[key].working === working ? (
              <View style = {styles.toDo} key = {key}>
                <Text style = {styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress = {() => deleteToDo(key)}>
                <FontAwesome name = "trash" size = {24} color = {theme.gray} />
                </TouchableOpacity>
              </View>
            ) : null
          ))}
        </ScrollView>
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
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  }
});
