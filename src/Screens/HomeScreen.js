import React, {useEffect, useState, useCallback} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import HomeSlider from '../Components/Home/HomeSlider';
import {deviceWidth, deviceHeight} from '../api/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {TopAnime} from '../api/apicalls';
//import SafeAreaView from 'react-native-safe-area-view';
// import {SafeAreaView} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = React.memo(() => {
  const navigation = useNavigation();
  console.log('HomeScreen1');
  const [page, setPage] = useState(1);

  const [state, setState] = useState({
    top: {
      topAnime: null,
      topManga: null,
      upcoming: null,
      topMovie: null,
      airing: null,
      trendingAnime: null,
      trendingMovie: null,
    },
  });
  const fetchData = useCallback(() => {
    async () => {
      console.log('fetchdataCalled');
      const topAnime = await TopAnime('ANIME', 'SCORE_DESC', 'TV', `${page}`);
      console.log('topAnime' + topAnime);
      const topMovie = await TopAnime(
        'ANIME',
        'SCORE_DESC',
        'MOVIE',
        `${page}`,
      );
      const topManga = await TopAnime(
        'MANGA',
        'FAVOURITES_DESC',
        'MANGA',
        `${page}`,
      );
      const trendingAnime = await TopAnime(
        'ANIME',
        'TRENDING_DESC',
        'TV',
        `${page}`,
      );
      const trendingMovie = await TopAnime(
        'ANIME',
        'TRENDING_DESC',
        'MOVIE',
        `${page}`,
      );
      console.log(topAnime.Page.media);
      setState({
        top: {
          // topAnime: [...state.top.topAnime, topAnime],
          topAnime: [...state.top.topAnime, topAnime.Page.media],
          topManga: topManga,
          topMovie: topMovie,
          trendingAnime: trendingAnime,
          trendingMovie: trendingMovie,
        },
      });
    };
  }, [page, state.top.topAnime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEnd = () => {
    setPage((pages) => {
      console.log(pages);
      pages + 1;
    });
    console.log('handleEndCalled');
  };
  return (
    <View style={styles.homeContainer}>
      <View style={styles.navbarConatiner}>
        <Text style={styles.appName}>animenation</Text>
        <View style={styles.searchContainer}>
          <StatusBar
            backgroundColor={EStyleSheet.value('$baseColor')}
            barStyle="light-content"
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

      {state.top.topMovie ? (
        <ScrollView>
          <HomeSlider
            name={'Trending anime'}
            compProp={state.top.trendingAnime}
            handleEnd={handleEnd}
          />
          {/* <HomeSlider
            name={'Trending Movie'}
            compProp={state.top.trendingMovie}
          />
          <HomeSlider name={'Top anime'} compProp={state.top.topAnime} />
          <HomeSlider name={'Top manga'} compProp={state.top.topManga} />
          <HomeSlider name={'Top movie'} compProp={state.top.topMovie} /> */}
        </ScrollView>
      ) : null}
    </View>
  );
});

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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: 'black',
  },
});

export default HomeScreen;
