import React, { useState, useCallback, useEffect } from 'react';
import { shortAnimeName } from '../../api/utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import { deviceHeight, deviceWidth } from '../../api/Constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { TopAnime, UpcomingNextSeason } from '../../api/apicalls';
import { useInfiniteQuery } from "react-query"
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import reactotron from 'reactotron-react-native';



const HomeSlider = React.memo(({ compProp, name }) => {

  const type = compProp.type;
  const sortType = compProp.sortType;
  const format = compProp.format;
  const season = compProp?.season;
  const seasonYear = compProp?.seasonYear;
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const fetchData = ({ pageParam = 1 }) => {
    if (season) {
      return UpcomingNextSeason(type, sortType, format, pageParam, season, seasonYear)
    }
    return TopAnime(type, sortType, format, pageParam);
  }

  const { data: queryData, isLoading, isFetching, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery([name],
    fetchData,
    {
      getNextPageParam: (_lastPage, pages) => {

        if (pages[pages.length - 1].pageInfo.hasNextPage) {
          return pages.length + 1
        }
        else {
          return undefined
        }

      }
    }
  )



  const renderItem = useCallback(
    ({ item }) => {


      {
        return item.media.map((innerItem) => {

          return (
            <TouchableOpacity
              key={innerItem.id}
              //style={{ backgroundColor: 'blue' }}
              onPress={() => {
                //  dispatch({ type: 'CURRENT_ANIME', payload: item.id });
                // navigation.navigate('AnimeInfoScreen');
                // navigation.navigate('AnimeInfoScreen', {
                //   id: innerItem.id,
                // });
                navigation.push('AnimeInfoScreen', {
                  id: innerItem.id,
                })
              }}>

              <ImageBackground
                source={{ uri: innerItem.coverImage.large }}
                style={styles.imageStyle}
                resizeMode="cover"
                PlaceholderContent={
                  <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
                }
                placeholderStyle={{
                  //backgroundColor: 'red'
                  backgroundColor: EStyleSheet.value('$shadeColor'),
                }}
              >
                <View style={styles.ratingFloater}>
                  <Text style={styles.floatingText}>{innerItem?.averageScore || 0}%</Text>
                </View>
              </ImageBackground>

              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>
                  {shortAnimeName(innerItem.title.userPreferred, 20)}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })
      }



    },
    [dispatch, navigation],
  );

  // reactotron.log(hasNextPage, "hasnextPage")

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoadMore', {
            type, sortType, format, name, season, seasonYear
          });
        }}
        style={styles.head}>
        <Text style={styles.propName}>{name}</Text>
        <Ionicons
          name="arrow-right"
          color={EStyleSheet.value('$arrowColor')}
          size={22}
        />
      </TouchableOpacity>

      {!isLoading ? <FlatList
        showsHorizontalScrollIndicator={true}
        horizontal={true}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        data={queryData?.pages}
        // initialNumToRender={2}
        maxToRenderPerBatch={2}
        renderItem={renderItem}
        ListFooterComponent={() =>
          !isFetchingNextPage && !hasNextPage ? null : (
            <ActivityIndicator
              animating
              color={EStyleSheet.value('$spcColor')}
              style={styles.activityIndicator}
            />
          )
        }
        keyExtractor={(item, index) => {

          return index.toString();
        }}
      /> :
        <ActivityIndicator
          size="large"
          animating
          color={EStyleSheet.value('$spcColor')}
          style={styles.bigActivityIndicator}
        />
      }

    </View>
  );
});

const styles = EStyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginRight: deviceHeight * 0.04
  },
  container: {
    // backgroundColor: 'red',
    minHeight: '124rem'
  },
  propName: {
    color: '$arrowColor',
    fontSize: '20rem',
    marginLeft: '15rem',
    fontFamily: 'Roboto-Bold',
    marginBottom: '15rem',
    marginTop: '15rem',
  },
  floatingText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
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
    height: deviceHeight * 0.175,
    aspectRatio: 0.8,
    marginLeft: '15rem',
    borderRadius: 10,
    // backgroundColor: "red"
  },
  imageViewContainer: {
    justifyContent: 'center',

  },
  activityIndicator: {
    height: '124rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigActivityIndicator: {
    height: '154rem',
    justifyContent: 'center',
    alignItems: 'center',
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
  titleContainer: {
    width: deviceWidth * 0.28,
  },
});

export default HomeSlider;
