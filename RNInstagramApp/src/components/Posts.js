import { View } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

const postInfo = [
  {
    postTitle: 'Lona',
    postPersonImage: require('../../assets/images/userProfile.jpeg'),
    postImage: require('../../assets/images/post1.jpeg'),
    likes: 5,
    isLiked: false,
  },
  {
    postTitle: 'RM',
    postPersonImage: require('../../assets/images/profile5.jpeg'),
    postImage: require('../../assets/images/post2.jpeg'),
    likes: 700,
    isLiked: true,
  },
  {
    postTitle: 'Jin',
    postPersonImage: require('../../assets/images/profile4.jpeg'),
    postImage: require('../../assets/images/post3.jpeg'),
    likes: 700,
    isLiked: true,
  },
  {
    postTitle: 'Suga',
    postPersonImage: require('../../assets/images/profile3.jpeg'),
    postImage: require('../../assets/images/post4.jpeg'),
    likes: 700,
    isLiked: true,
  },
  {
    postTitle: 'J-Hope',
    postPersonImage: require('../../assets/images/profile2.jpeg'),
    postImage: require('../../assets/images/post5.jpeg'),
    likes: 700,
    isLiked: true,
  },
];
const Posts = () => {
  return (
    <View>
      {postInfo.map((data, index) => {
        return (
          <PostItem key={index} data={data}/>
        );
      })}
    </View>
  );
};

export default Posts;
