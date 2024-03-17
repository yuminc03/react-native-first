import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const searchData = [
  {
    id: 0,
    images: [
      require('../../assets/images/post1.jpeg'),
      require('../../assets/images/post2.jpeg'),
      require('../../assets/images/post3.jpeg'),
      require('../../assets/images/post4.jpeg'),
      require('../../assets/images/post5.jpeg'),
      require('../../assets/images/post6.jpeg'),
    ],
  },
  {
    id: 1,
    images: [
      require('../../assets/images/post7.jpeg'),
      require('../../assets/images/post8.jpeg'),
      require('../../assets/images/post9.jpeg'),
      require('../../assets/images/post10.jpeg'),
      require('../../assets/images/post11.jpeg'),
      require('../../assets/images/post12.jpeg'),
    ],
  },
  {
    id: 2,
    images: [
      require('../../assets/images/post13.jpeg'),
      require('../../assets/images/post14.jpeg'),
      require('../../assets/images/post15.jpeg'),
    ],
  },
];
const SearchContent = () => {
  return (
    <View>
      {searchData.map((data, index) => {
        return (
          <View key={index}>
            { data.id === 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                {data.images.map((image, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{ paddingBottom: 2, width: '33%' }}
                    >
                      <Image
                        source={image}
                        style={{ width: '100%', height: 150 }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null }
            { data.id === 1 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '66.5%',
                      justifyContent: 'space-between',
                    }}
                  >
                    {data.images.slice(0, 4).map((image, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={{ paddingBottom: 2, width: '49.5%' }}
                        >
                          <Image
                            source={image}
                            style={{ width: '100%', height: 150 }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    style={{ marginLeft: 2, width: '33%' }}
                  >
                    <Image
                      source={data.images[4]}
                      style={{ width: '100%', height: 300 }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null }
            { data.id === 2 ?
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 2, width: '66.5%' }}
                >
                  <Image
                    source={data.images[2]}
                    style={{ width: '100%', height: 300 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '33%',
                    justifyContent: 'space-between',
                  }}
                >
                  {data.images.slice(0, 2).map((image, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{ paddingBottom: 2, width: '100%' }}
                      >
                        <Image
                          source={image}
                          style={{ width: '100%', height: 150 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              : null }
          </View>
        );
      })}
    </View>
  );
};

export default SearchContent;
