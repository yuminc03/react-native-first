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
import { AntDesign } from '@expo/vector-icons';
import { theme } from './colors';
// 3. Todo에 수정 기능 추가하기

const STORAGE_KEY = '@toDos'
const SECTION_STORAGE_KEY = "@sectionType"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});

  const travel = async () => {
    setWorking(false);
    saveSectionType("travel");
  };
  const work = async () => {
    setWorking(true);
    saveSectionType("work");
  };
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const saveSectionType = async (sectionType) => {
    await AsyncStorage.setItem(SECTION_STORAGE_KEY, sectionType);
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    const section = await AsyncStorage.getItem(SECTION_STORAGE_KEY);

    if (s) {
      // String into JavaScript Object
      setToDos(JSON.parse(s));
    }

    if (section) {
      setWorking(section === "work" ? true : false);
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
    const isCompleted = false
    const newToDos = {
      ... toDos, 
      [Date.now()]: {text, working, isCompleted}
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
  const completeToDo = async (key) => {
    const newToDos = {... toDos};
    newToDos[key].isCompleted = newToDos[key].isCompleted ? false : true
    setToDos(newToDos);
    saveToDos(newToDos);
  }

  const editToDo = async (key, text) => {
    const newToDos = { ... toDos }
    newToDos[key].text = text
    setToDos(newToDos)
    saveToDos(newToDos)
  };

  useEffect (() => {
    loadToDos();
  }, []);

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
            color: !working ? 'white' : theme.gray
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
                {
                  toDos[key].isCompleted ? 
                  <Text style = {styles.completedToDoText}>{toDos[key].text}</Text> : 
                  <Text style = {styles.toDoText}>{toDos[key].text}</Text>
                }
                <View style = {styles.rowButtons}>
                  <TouchableOpacity style = {styles.rowItem} onPress = {() => completeToDo(key)}>
                    <AntDesign name = "checksquare" size = {24} color = {toDos[key].isCompleted ? "white" : theme.gray} />
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.rowItem} onPress = {() => deleteToDo(key)}>
                    <FontAwesome name = "trash" size = {24} color = {theme.gray} />
                  </TouchableOpacity>
                </View>
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
  rowItem: {
    marginHorizontal: 5
  },
  rowButtons: {
    flexDirection: "row",
    letterSpacing: 10
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 20
  },
  completedToDoText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 20,
    textDecorationLine: "line-through"
  },
  toDoTextInput: {
    color: "white",
    fontSize: 16,
    fontWeight: '500'
  }
});
