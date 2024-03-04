import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput, 
  View, 
  TouchableOpacity
} from 'react-native';
import { theme } from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === '') {
      return 
    }
    const newTodos = Object.assign(
      {}, 
      toDos, 
      {[Date.now()]: {text, work: working}}
    );
    setToDos(newTodos);
    setText('');
  };
  
  return (
    <View style = {styles.container}>
      <StatusBar style = "auto" />
      <View style = {styles.header}>
        <TouchableOpacity onPress = {work}>
          <Text style = {{... styles.btnText, color: working ? 'white' : theme.gray}}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {travel}>
          <Text style = {{... styles.btnText, color: !working ? 'white' : theme.gray}}>
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
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  }
});
