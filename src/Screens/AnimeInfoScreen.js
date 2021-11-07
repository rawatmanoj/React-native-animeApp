/* eslint-disable react/self-closing-comp */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native-elements';
import {deviceHeight, deviceWidth} from '../api/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {shortAnimeName} from '../api/utils';
import AnimeTabView from '../Components/Home/Anime/TabView';
import {getAnime} from '../api/apicalls';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';

const AnimeInfoScreen = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('AnimeInfoSCreen');

  const anime = useSelector((state) => state.getAnime);

  useEffect(() => {
    const fetchData = async () => {
      const animeInfo = await getAnime(anime.currentAnime);

      console.log(animeInfo);

      dispatch({
        type: 'CURRENT_ANIME_INFO',
        payload: animeInfo.Media,
      });
    };

    const backAction = () => {
      // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => BackHandler.exitApp()},
      // ]);
      dispatch({
        type: 'CURRENT_ANIME_INFO',
        payload: null,
      });
      navigation.goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    fetchData();
    return () => backHandler.remove();
  }, [anime.currentAnime, dispatch, navigation]);

  return anime.currentAnimeInfo ? (
    <View style={styles.pageContainer}>
      <View style={styles.animeContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View>
          <Image
            placeholderStyle={{
              backgroundColor: EStyleSheet.value('$shadeColor'),
            }}
            PlaceholderContent={
              <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
            }
            source={{uri: anime.currentAnimeInfo.bannerImage}}
            style={styles.imageBackgroundStyle}
            resizeMode="cover">
            <LinearGradient
              colors={['transparent', '#2D2D2D']}
              start={{x: 0.5, y: 0.5}}
              style={styles.container1}></LinearGradient>
          </Image>
          <View style={styles.smallImage}>
            <Image
              source={{uri: anime.currentAnimeInfo.coverImage.large}}
              style={styles.imageStyle}
              resizeMode="contain"
              PlaceholderContent={
                <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
              }
              placeholderStyle={{
                backgroundColor: EStyleSheet.value('$shadeColor'),
              }}
            />
          </View>
        </View>

        <View style={styles.lowerPart}>
          <View style={styles.animeNameView}>
            <Text style={styles.animeNameStyle}>
              {shortAnimeName(anime.currentAnimeInfo.title.userPreferred, 30)}
            </Text>
            <Text style={styles.dateStyle}>
              {anime.currentAnimeInfo.seasonYear
                ? anime.currentAnimeInfo.seasonYear + ' | '
                : null}

              {anime.currentAnimeInfo.status}
            </Text>
          </View>
        </View>

        <View style={styles.popularityContainer}>
          <View style={styles.popularityIcon}>
            <Ionicons
              name={'heart'}
              size={22}
              color={EStyleSheet.value('$spcColor')}
            />
            <Text style={styles.scoreStyles}>
              {anime.currentAnimeInfo.averageScore
                ? anime.currentAnimeInfo.averageScore.toFixed(0) + '%'
                : '0%'}
            </Text>
          </View>
          <Text style={styles.rankStyles}>
            Rank {anime.currentAnimeInfo.rankings[0].rank}
          </Text>
        </View>
      </View>
      <AnimeTabView />
    </View>
  ) : (
    <View
      style={{
        backgroundColor: EStyleSheet.value('$shadeColor'),
        height: deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={EStyleSheet.value('$spcColor')} />
    </View>
  );
});

export default AnimeInfoScreen;

const styles = EStyleSheet.create({
  imageBackgroundStyle: {
    width: deviceWidth,
    height: '190rem',
  },
  rankStyles: {color: '#605D74', fontFamily: 'Lato-Bold', fontSize: '20rem'},
  popularityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '55rem',
    width: deviceWidth,
    justifyContent: 'space-evenly',
  },
  popularityIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: '148rem',
    aspectRatio: 0.8,
    borderRadius: 10,
  },
  pageContainer: {
    flex: 1,
  },
  smallImage: {
    // position: 'relative',
    position: 'absolute',
    left: '10rem',
    top: deviceHeight * 0.18,
  },
  container1: {
    flex: 1,
  },
  scoreStyles: {
    paddingLeft: '3rem',
    color: '#605D74',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: '20rem',
  },
  animeNameStyle: {
    color: 'white',
    fontSize: '20rem',
    fontFamily: 'Lato-Bold',
    marginBottom: '2rem',
    //fontWeight: '700',
  },
  lowerPart: {
    marginTop: '13rem',
    width: deviceWidth,
    height: '88rem',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  animeNameView: {
    width: deviceWidth / 2,
    marginRight: deviceWidth * 0.14,
    // marginRight: '50rem',
    alignSelf: 'flex-end',
  },
  dateStyle: {
    color: '#605D74',
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
  },
  navStyles: {
    // position: 'absolute',
  },
  animeContainer: {
    alignItems: 'center',
    backgroundColor: '$baseColor',
  },
});
