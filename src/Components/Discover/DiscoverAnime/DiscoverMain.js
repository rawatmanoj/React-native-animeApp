/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
//import {u} from "@react-navigation/bottom-tabs"

import {useDispatch} from 'react-redux';

import {shortAnimeName} from '../../../api/utils';
import {deviceWidth, deviceHeight} from '../../../api/Constants';

export default React.memo(function DiscoverMain({result}) {
  console.log('DiscoverMain');
  const dispatch = useDispatch();

  const navigate = useNavigation();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch({type: 'CURRENT_ANIME', payload: item.id});
          navigate.navigate('AnimeInfoScreen');
          // console.log(navigate);
        }}>
        <Image
          source={{uri: item.coverImage.large}}
          style={styles.imageStyle}
          resizeMode="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            {shortAnimeName(item.title.userPreferred, 20)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.pageContainer}>
      <FlatList
        style={styles.flatlist}
        scrollEventThrottle={1900}
        data={result}
        numColumns={3}
        horizontal={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
});

const styles = EStyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  imageStyle: {
    height: '124rem',
    aspectRatio: 0.8,
    marginLeft: '15rem',
    borderRadius: 10,
  },
  titleContainer: {
    width: deviceWidth * 0.28,
  },
  titleStyle: {
    fontSize: '12.5rem',
    opacity: 0.8,
    marginTop: deviceHeight * 0.008,
    marginLeft: deviceWidth * 0.04,
    marginBottom: '25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Roboto-Bold',
  },
  flatlist: {
    paddingTop: '55rem',
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#242634',
    width: deviceWidth,
    paddingLeft: '10rem',
  },
});
