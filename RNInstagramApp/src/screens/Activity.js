import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import ActivityThisWeek from '../components/ActivityThisWeek';
import ActivityPrevious from '../components/ActivityPrevious';
import ActivityRecommend from '../components/ActivityRecommend';

const Activity = () => {
  return (
    <SafeAreaView style={{ width: '100%', backgroundColor: 'white' }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderBottomWidth: 0.5,
          borderBottomColor: '#DEDEDE',
          padding: 10,
        }}
      >
        활동
      </Text>
      <ScrollView style={{ margin: 10 }}>
        <ActivityThisWeek/>
        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>이전 활동</Text>
        <ActivityPrevious/>
        <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>회원님을 위한 추천</Text>
        <ActivityRecommend/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
