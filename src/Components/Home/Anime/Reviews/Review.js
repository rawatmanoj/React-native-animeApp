import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {getReviews} from '../../../../api/apicalls';
import {useSelector} from 'react-redux';
export default React.memo(function Review() {
  console.log('review');
  const [review, setReview] = useState(null);
  const anime = useSelector((state) => state.getAnime);
  useEffect(() => {
    const fetchChar = async () => {
      console.log(anime.currentAnime);
      const reviews = await getReviews(anime.currentAnime);
      setReview(reviews.Media.reviews.nodes);
      console.log(reviews);
    };

    fetchChar();
  }, [anime.currentAnime]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.reviewContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.imageContainer}>
            <View>
              <ImageBackground
                source={{uri: item.user.avatar.medium}}
                style={styles.imageStyles}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={styles.fullNameStyles}>{item.user.name}</Text>
              <Text style={styles.dateStyles}>
                {new Date(item.createdAt * 1000).toLocaleDateString('en-US')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.reviewStyles}>{item.summary}</Text>
          <View style={styles.line}></View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={review}
        renderItem={renderItem}
        keyExtractor={(item, i) => {
          return i.toString();
        }}
      />
    </SafeAreaView>
  );
});

const styles = EStyleSheet.create({
  scene: {},
  container: {
    flex: 1,
    backgroundColor: '$baseColor',
  },
  imageContainer: {
    marginTop: '20rem',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: '58rem',
    height: '58rem',
    borderRadius: 59 / 2,
    overflow: 'hidden',
  },
  fullNameStyles: {
    marginLeft: '15rem',
    fontSize: '20rem',
    fontFamily: 'AlegreyaSans-Bold',
    color: 'white',
  },
  dateStyles: {
    marginLeft: '15rem',
    fontSize: '13rem',
    fontFamily: 'Lato-Bold',
    color: 'grey',
  },
  reviewContainer: {
    marginLeft: '20rem',
    marginRight: '20rem',
  },
  reviewStyles: {
    marginTop: '24rem',
    color: 'white',
    fontSize: '14rem',
    fontFamily: 'Lato-Regular',
    lineHeight: '19rem',
    letterSpacing: 0.8,
  },
  line: {
    borderWidth: '0.5rem',
    borderColor: '#605D74',
    marginTop: '24rem',
    marginBottom: '10rem',
  },
});
