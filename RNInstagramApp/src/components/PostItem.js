import { View, Feature, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostItem = ({ data }) => {
  const [like, setLike] = useState(data.isLike);

  return (
    <View
      style={{
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={data.postPersonImage}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <View style={{ paddingLeft: 5 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {data.postTitle}
            </Text>
          </View>
        </View>
        <Feature name="more-vertical" style={{ fontSize: 20 }}/>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={data.postImage}
          style={{ width: '100%', height: 400 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 15,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => setLike(prev => !prev)}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={{
                paddingRight: 10,
                fontSize: 20,
                color: like ? 'red' : 'black',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLike(prev => !prev)}>
            
          </TouchableOpacity>
        </View>
        <Feature name="bookmark" style={{ fontSize: 20 }}/>
      </View>
    </View>
  );
};

export default PostItem;
