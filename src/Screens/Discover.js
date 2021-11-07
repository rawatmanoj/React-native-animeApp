/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import {View, Text, TouchableHighlight, ImageBackground} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import EStyleSheet from 'react-native-extended-stylesheet';
import {deviceWidth} from '../api/Constants';
import {useNavigation} from '@react-navigation/native';
export default function Discover() {
  console.log('discover');
  const navigation = useNavigation();
  return (
    <View style={styles.scene}>
      <View style={styles.pageContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.discover}>Discover</Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <View style={styles.inputContainer}>
              <Ionicons
                style={styles.iconStyles}
                name={'search'}
                size={20}
                color={EStyleSheet.value('$shadeColor')}
              />
              <Text style={styles.inputText}>Anime, Movie or Characters</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.imagesContainer}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('DiscoverAnime', {
                format: 'TV',
                type: 'ANIME',
                title: 'Anime',
              });
            }}>
            <ImageBackground
              source={require('../../images/mhaextralarge.jpg')}
              style={styles.imageBackgroundStyle}
              resizeMode="cover">
              <View style={styles.textContainer}>
                <Text style={styles.textStyles}>Anime</Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('DiscoverAnime', {
                format: 'MOVIE',
                type: 'ANIME',
                title: 'Movie',
              });
            }}>
            <ImageBackground
              source={require('../../images/kiminonawa.png')}
              style={[styles.imageBackgroundStyle]}
              resizeMode="cover">
              <View style={styles.textContainer}>
                <Text style={styles.textStyles}>Movies</Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('CharTabView');
            }}>
            <ImageBackground
              source={require('../../images/mhabannerimage.jpg')}
              style={styles.imageBackgroundStyle}
              resizeMode="cover">
              <View style={styles.textContainer}>
                <Text style={styles.textStyles}>Characters</Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('DiscoverAnime', {
                format: 'MANGA',
                type: 'MANGA',
                title: 'Manga',
              });
            }}>
            <ImageBackground
              source={require('../../images/onepunchextra.jpg')}
              style={styles.imageBackgroundStyle}
              resizeMode="cover">
              <View style={styles.textContainer}>
                <Text style={styles.textStyles}>Manga</Text>
              </View>
            </ImageBackground>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  scene: {
    borderTopWidth: 0,
    flex: 1,
    backgroundColor: '$baseColor',
  },
  pageContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topContainer: {
    width: deviceWidth,
    //backgroundColor: 'red',
    alignItems: 'center',
  },
  discover: {
    color: '#E8E3E3',
    fontSize: '40rem',
    fontFamily: 'Roboto-Bold',
    letterSpacing: '1.2rem',
    marginBottom: '20rem',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8E3E3',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 1.1,
    aspectRatio: 6,
    borderRadius: '60rem',
  },
  inputText: {
    fontSize: '18rem',
    fontFamily: 'Lato-Bold',
    color: '$shadeColor',
  },
  iconStyles: {
    marginRight: '12rem',
  },
  container1: {
    flex: 1,
  },
  imageBackgroundStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '165rem',
    aspectRatio: 1.2,
    borderRadius: '14rem',
    overflow: 'hidden',
    margin: '10rem',
    // opacity: 0.5,
    //backgroundColor: 'red',
  },
  imagesContainer: {
    width: deviceWidth,
    // backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: 'white',
    fontSize: '18rem',
    fontFamily: 'Lato-Bold',
    letterSpacing: '0.8rem',
    //fontWeight: '900',
  },
  linearGradient: {
    flex: 1,
    // position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
