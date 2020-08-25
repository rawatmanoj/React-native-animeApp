import React, {useEffect, useState, useCallback} from 'react';
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
import useAnimeHome from '../api/CustomHook/useAnimeHome';

import {useNavigation} from '@react-navigation/native';

const HomeScreen = React.memo(() => {
  const navigation = useNavigation();
  console.log('HomeScreen1');
  const [page, setPage] = useState(1);
  const topAnime = useAnimeHome('ANIME', 'SCORE_DESC', 'TV', page);
  const trendingAnime = useAnimeHome('ANIME', 'TRENDING_DESC', 'TV', page);
  const topMovie = useAnimeHome('ANIME', 'SCORE_DESC', 'MOVIE', page);
  const topManga = useAnimeHome('MANGA', 'FAVOURITES_DESC', 'MANGA', page);
  const trendingMovie = useAnimeHome('ANIME', 'TRENDING_DESC', 'MOVIE', page);

  const handleEnd = () => {
    setPage((pages) => {
      return pages + 1;
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

      {topAnime ? (
        <ScrollView>
          <HomeSlider
            name={'Trending anime'}
            compProp={trendingAnime}
            handleEnd={handleEnd}
          />
          <HomeSlider
            name={'Trending Movie'}
            handleEnd={handleEnd}
            compProp={trendingMovie}
          />
          <HomeSlider
            name={'Top manga'}
            handleEnd={handleEnd}
            compProp={topManga}
          />
          <HomeSlider
            name={'Top movie'}
            handleEnd={handleEnd}
            compProp={topMovie}
          />
          <HomeSlider
            name={'Top anime'}
            handleEnd={handleEnd}
            compProp={topAnime}
          />
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
