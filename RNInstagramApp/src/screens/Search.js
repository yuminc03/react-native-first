import { ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import SearchInput from '../components/SearchInput';
import SearchContent from '../components/SearchContent';

const Search = () => {
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
        <SearchContent/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
