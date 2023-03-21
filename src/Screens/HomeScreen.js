import React, { useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import HomeSlider from '../Components/Home/HomeSlider';
import { deviceWidth, deviceHeight } from '../api/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation, } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import reactotron from 'reactotron-react-native';



const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  // const route = useRoute();



  const topAnime = {
    type: 'ANIME',
    sortType: 'SCORE_DESC',
    format: 'TV',
    page: 1,
  };
  const allTimePopular = {
    type: 'ANIME',
    sortType: 'POPULARITY_DESC',
    format: 'TV',
    page: 1,
  };
  const upcomingNextSeason = {
    type: 'ANIME',
    sortType: 'POPULARITY_DESC',
    format: 'TV',
    page: 1,
    season: 'WINTER',
    seasonYear: 2022
  };
  const popularThisSeason = {
    type: 'ANIME',
    sortType: 'POPULARITY_DESC',
    format: '',
    page: 1,
    season: 'FALL',
    seasonYear: 2021
  };
  const trendingAnime = {
    type: 'ANIME',
    sortType: 'TRENDING_DESC',
    format: 'TV',
    page: 1,
  };
  const topMovie = {
    type: 'ANIME',
    sortType: 'SCORE_DESC',
    format: 'MOVIE',
    page: 1,
  };
  const topManga = {
    type: 'MANGA',
    sortType: 'FAVOURITES_DESC',
    format: 'MANGA',
    page: 1,
  };
  const trendingMovie = {
    type: 'ANIME',
    sortType: 'TRENDING_DESC',
    format: 'MOVIE',
    page: 1,
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.navbarConatiner}>
        <Text
          onPress={() => {
            Linking.openURL('https://anilist.co/api/v2/oauth/authorize?client_id=7141&response_type=token').then(res => {
              console.log(res, "DeepLinkinggggggggg")
            })
          }}
          style={styles.appName}>animenation</Text>
        <View style={styles.searchContainer}>
          <StatusBar
            backgroundColor={EStyleSheet.value('$baseColor')}
            barStyle="light-content"
          // backgroundColor="transparent"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <View>
              <Ionicons name={'search'} size={20} color={'grey'} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Entypo name={'dots-three-vertical'} size={20} color={'grey'} />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView>
        <HomeSlider name={'Upcoming Next Season'} compProp={upcomingNextSeason} />
        <HomeSlider name={'Popular This Season'} compProp={popularThisSeason} />
        <HomeSlider name={'Trending anime'} compProp={trendingAnime} />
        <HomeSlider name={'Trending Movie'} compProp={trendingMovie} />
        <HomeSlider name={'All Time Popular'} compProp={allTimePopular} />
        <HomeSlider name={'Top manga'} compProp={topManga} />
        <HomeSlider name={'Top movie'} compProp={topMovie} />
        <HomeSlider name={'Top anime'} compProp={topAnime} />
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '$baseColor',
    marginBottom: '30rem',
  },
  appName: {
    flex: 3,
    color: '$spcColor',
    fontSize: '30rem',
    marginLeft: '18rem',
    fontFamily: 'Poppins-Regular',
  },
  searchContainer: {
    flex: 1,
    marginRight: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navbarConatiner: {
    marginBottom: '10rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight * 0.1,
    backgroundColor: '$baseColor',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: 'black',
  },
});

export default HomeScreen;
