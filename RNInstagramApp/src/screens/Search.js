import { ScrollView, SafeAreaView, View, StatusBar, Image, Text } from 'react-native';
import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchContent from '../components/SearchContent';

const Search = () => {
  const [image, setImage] = useState("ddd");
  const getData = (img) => {
    setImage(img);
  };
  return (
    <SafeAreaView
      style={{
        width: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <ScrollView>
        {/* ScarchInput */}
        <SearchInput/>
        {/* SearchContent */}
        <SearchContent getData={getData}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
