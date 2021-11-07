/* eslint-disable react/self-closing-comp */
import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, ImageBackground} from 'react-native';
import {Image} from 'react-native-elements';
import {deviceHeight, deviceWidth} from '../api/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {shortAnimeName} from '../api/utils';
import {getCharInfo} from '../api/apicalls';
import {useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import HTMLView from 'react-native-htmlview';
import {ScrollView} from 'react-native-gesture-handler';

const CharScreen = () => {
  const [currentChar, setCurrentChar] = useState();
  console.log('CharScreen');

  const anime = useSelector((state) => state.getAnime);

  useEffect(() => {
    const fetchData = async () => {
      const animeInfo = await getCharInfo(anime.char);

      setCurrentChar(animeInfo.Page.characters[0]);
    };

    fetchData();
  }, [anime.char]);

  return currentChar ? (
    <View style={styles.pageContainer}>
      <View style={styles.animeContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View>
          <ImageBackground
            source={{uri: currentChar.media.nodes[0].bannerImage}}
            style={styles.imageBackgroundStyle}
            resizeMode="cover">
            <LinearGradient
              colors={['transparent', '#2D2D2D']}
              start={{x: 0.5, y: 0.5}}
              style={styles.container1}></LinearGradient>
          </ImageBackground>
          <View style={styles.smallImage}>
            <Image
              source={{uri: currentChar.image.large}}
              style={styles.imageStyle}
              resizeMode="contain"></Image>
          </View>
        </View>

        <View style={styles.lowerPart}>
          <View style={styles.animeNameView}>
            <Text style={styles.animeNameStyle}>
              {shortAnimeName(currentChar.name.full, 30)}
            </Text>
            <Text style={styles.charAnime}>
              {currentChar.media.nodes[0].title.userPreferred}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.description}>
            <HTMLView value={currentChar.description} stylesheet={htmlstyles} />
          </View>
        </ScrollView>
      </View>
    </View>
  ) : null;
};

export default CharScreen;
const fontSize = '16rem';
const htmlstyles = EStyleSheet.create({
  p: {
    color: 'white',
    fontSize: fontSize,
    fontFamily: 'Lato-Bold',
    letterSpacing: '0.8rem',
    lineHeight: '30rem',
  },
  strong: {
    color: '#67687A',
    fontFamily: 'Lato-Bold',
    fontSize: '22rem',
  },
  li: {
    color: 'white',
    fontSize: fontSize,
  },
});
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
    borderRadius: '10rem',
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '$baseColor',
  },
  charAnime: {
    color: '$spcColor',
  },
  description: {
    flex: 1,
    marginLeft: '20rem',
    marginTop: '40rem',
  },
});
