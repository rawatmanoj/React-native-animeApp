/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
//import {u} from "@react-navigation/bottom-tabs"

import { useDispatch } from 'react-redux';

import { shortAnimeName } from '../../../api/utils';
import { deviceWidth, deviceHeight } from '../../../api/Constants';

export default React.memo(function DiscoverMain({ isLoading, result, fetchNextPage, isFetchingNextPage, navigation }) {
  const dispatch = useDispatch();

  const navigate = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: 'CURRENT_ANIME', payload: item.id });
          navigate.navigate('AnimeInfoScreen');
          // console.log(navigate);
        }}>
        <ImageBackground
          source={{ uri: item.coverImage.large }}
          style={styles.imageStyle}
          resizeMode="cover"
          PlaceholderContent={
            <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
          }
          placeholderStyle={{
            // backgroundColor: 'red'
            backgroundColor: EStyleSheet.value('$shadeColor'),
          }}
        >
          <View style={styles.ratingFloater}>
            <Text style={styles.floatingText}>{item?.averageScore || 0}%</Text>
          </View>
        </ImageBackground>

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

      {!isLoading ? result.length > 0 ?

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={20}
          data={result}
          renderItem={renderItem}
          ListFooterComponent={() =>
            !isFetchingNextPage ? null : (
              <ActivityIndicator
                animating
                size="large"
                color={EStyleSheet.value('$spcColor')}
                style={styles.activityIndicator}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlist}
          numColumns={3}
        />
        :

        <Text style={styles.emptyText}>No Data Found</Text>
        :

        <View
          style={{
            backgroundColor: EStyleSheet.value('$shadeColor'),
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <ActivityIndicator size="large" color={EStyleSheet.value('$spcColor')} />
        </View>
      }
    </View>

  );
});

const styles = EStyleSheet.create({
  pageContainer: {
    flex: 1,

  },
  floatingText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: deviceHeight * 0.4,
    fontWeight: 'bold'
  },
  ratingFloater: {

    backgroundColor: 'black',
    borderRadius: 10,
    opacity: 0.8,
    right: 4,
    top: 4,
    position: 'absolute',
    width: deviceWidth * 0.08,
    height: deviceWidth * 0.04
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
    backgroundColor: '$baseColor',
    width: deviceWidth,
    paddingLeft: '10rem',
  },
  activityIndicator: {
    height: '124rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
