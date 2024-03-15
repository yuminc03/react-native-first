import { ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import SearchInput from './SearchInput';

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
