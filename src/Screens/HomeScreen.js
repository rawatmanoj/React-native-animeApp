import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
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
  console.log('HomeScreen');

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
  useEffect(() => {
    const fetchData = async () => {
      const topAnime = await TopAnime('ANIME', 'SCORE_DESC', 'TV');
      const topMovie = await TopAnime('ANIME', 'SCORE_DESC', 'MOVIE');
      const topManga = await TopAnime('MANGA', 'FAVOURITES_DESC', 'MANGA');
      const trendingAnime = await TopAnime('ANIME', 'TRENDING_DESC', 'TV');
      const trendingMovie = await TopAnime('ANIME', 'TRENDING_DESC', 'MOVIE');
      console.log(topAnime);
      setState({
        top: {
          topAnime: topAnime,
          topManga: topManga,
          topMovie: topMovie,
          trendingAnime: trendingAnime,
          trendingMovie: trendingMovie,
        },
      });
    };

    fetchData();
  }, []);
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

      {state.top.topMovie && (
        <ScrollView style={styles.ScrollView}>
          <HomeSlider
            name={'Trending anime'}
            compProp={state.top.trendingAnime}
          />
          {/* <HomeSlider
            name={'Trending Movie'}
            compProp={state.top.trendingMovie}
          />
          <HomeSlider name={'Top anime'} compProp={state.top.topAnime} />
          <HomeSlider name={'Top manga'} compProp={state.top.topManga} />
          <HomeSlider name={'Top movie'} compProp={state.top.topMovie} /> */}
        </ScrollView>
      )}
    </View>
  );
});

const styles = EStyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '$baseColor',
    marginBottom: '5rem',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navbarConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight * 0.1,
    backgroundColor: '$baseColor',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: 'black',
    marginBottom: '15rem',
  },
  ScrollView: {
    //marginBottom: '10rem',
  },
});

export default HomeScreen;
