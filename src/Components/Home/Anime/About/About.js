/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { deviceWidth } from '../../../../api/Constants';
import { filterString } from '../../../../api/utils';
import { Description } from '../../../../api/Description';
import { useSelector } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useQuery } from 'react-query';
import { getAnime } from '../../../../api/apicalls';
import { useRoute } from '@react-navigation/core';
import reactotron from 'reactotron-react-native';
export default React.memo(function About(props) {

  let anime = props.anime;

  return (
    <ScrollView style={styles.scene}>
      {anime.Media ? (
        <View>
          <View>
            {anime.Media.description ? (
              <Description
                text={filterString(anime.Media.description)}
              />
            ) : null}
          </View>
          <View>
            <Text style={styles.subHeading}>Genres</Text>
            <View style={styles.boxStyle}>
              {anime.Media.genres.map((genre, i) => {
                // if (i < 7) {
                return (
                  <View key={i} style={{ margin: 4 }}>
                    <Button
                      key={i}
                      color={EStyleSheet.value('$shadeColor')}
                      title={genre}
                    />
                  </View>
                );
                // }
              })}
            </View>
            <Text style={styles.subHeading}>Producers</Text>
            <View style={styles.boxStyle}>
              {anime.Media.studios.nodes.map((studio, i) => {
                return (
                  <View style={{ margin: 4 }}>

                    <Button
                      key={i}
                      color={EStyleSheet.value('$shadeColor')}
                      title={studio.name}
                    />
                  </View>

                );
              })}
            </View>
            <Text style={styles.subHeading}>Tags</Text>
            <View style={styles.boxStyle}>
              {anime.Media.tags.map((tag, i) => {
                return (
                  <View style={{ margin: 4 }}>
                    <Button
                      color={EStyleSheet.value('$shadeColor')}
                      key={i}
                      title={tag.name}
                    />
                  </View>

                );
              })}
            </View>
          </View>
          <View style={styles.animeInfoContainer}>
            <Text style={styles.animeInfoHeader}>Anime Info</Text>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>Original Title</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.title.userPreferred}
                </Text>
              </View>
            </View>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>First Air Date</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.startDate.day +
                    ' - ' +
                    anime.Media.startDate.month +
                    ' - ' +
                    anime.Media.startDate.year}
                </Text>
              </View>
            </View>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>Last Air Date</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.endDate.day
                    ? anime.Media.endDate.day +
                    ' - ' +
                    anime.Media.endDate.month +
                    ' - ' +
                    anime.Media.endDate.year
                    : 'Ongoing'}
                </Text>
              </View>
            </View>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>Aired Episodes</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.episodes
                    ? anime.Media.episodes
                    : 'Ongoing'}
                </Text>
              </View>
            </View>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>Country of origin</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.countryOfOrigin === 'JP'
                    ? 'JAPAN'
                    : anime.Media.countryOfOrigin}
                </Text>
              </View>
            </View>
            <View style={styles.subAnimeInfoContainer}>
              <Text style={styles.subAnimeInfoHeading}>Average Score</Text>
              <View style={{ width: deviceWidth / 2.1 }}>
                <Text style={styles.titleStyles}>
                  {anime.Media.averageScore}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
});

const styles = EStyleSheet.create({
  scene: {
    width: deviceWidth,
    padding: '10rem',
    flex: 1,
    backgroundColor: '$baseColor',
  },
  subHeading: {
    color: 'grey',
    fontSize: '16rem',
    marginTop: '18rem',
    marginBottom: '8rem',
    fontFamily: 'Lato-Bold',
  },
  boxStyle: {
    flexDirection: 'row',
    overflow: 'visible',
    flexWrap: 'wrap',
  },
  animeInfoContainer: { marginTop: '12rem', marginBottom: '10rem' },
  animeInfoHeader: {
    color: 'white',
    fontSize: '22rem',
    marginTop: '20rem',
    marginBottom: '20rem',
    fontFamily: 'Lato-Bold',
  },
  subAnimeInfoContainer: {
    width: deviceWidth / 1.06,
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: '20rem',
  },
  subAnimeInfoHeading: {
    color: '#67687A',
    fontSize: '16rem',
    fontFamily: 'Lato-Bold',
  },
  titleStyles: { color: '#EAE4E4', fontFamily: 'Lato-Bold', fontSize: '14rem' },
});
