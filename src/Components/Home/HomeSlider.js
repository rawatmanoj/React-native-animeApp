import React, {useState, useCallback} from 'react';
import {Image} from 'react-native-elements';
import {shortAnimeName} from '../../api/utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../../api/Constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import useAnimeHome from '../../api/CustomHook/useAnimeHome';

const HomeSlider = React.memo(
  ({compProp, name}) => {
    console.log('homeSlider');
    //console.log(compProp);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [page, setPage] = useState(1);

    const {data, loading} = useAnimeHome(
      compProp.type,
      compProp.sortType,
      compProp.format,
      page,
    );

    function handleEnd() {
      setPage((pages) => {
        return pages + 1;
      });
      console.log('handleback called');
    }

    const renderItem = useCallback(
      ({item}) => {
        // console.log('yes');
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'CURRENT_ANIME', payload: item.id});
              // navigation.navigate('AnimeInfoScreen');
              navigation.navigate('Home', {
                screen: 'AnimeInfoScreen',
              });
            }}>
            <Image
              source={{uri: item.coverImage.large}}
              style={styles.imageStyle}
              resizeMode="cover"
              PlaceholderContent={
                <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
              }
              placeholderStyle={{
                backgroundColor: EStyleSheet.value('$shadeColor'),
              }}
            />

            <View style={styles.titleContainer}>
              <Text style={styles.titleStyle}>
                {shortAnimeName(item.title.userPreferred, 20)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      },
      [dispatch, navigation],
    );

    // const renderItem =

    return (
      <View style={styles.container}>
        <Text style={styles.propName}>{name}</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onEndReached={() => handleEnd()}
          onEndReachedThreshold={0.1}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={() =>
            loading ? null : (
              <ActivityIndicator
                animating
                color={EStyleSheet.value('$spcColor')}
                style={styles.activityIndicator}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.compProp !== nextProps.compProp) {
      return false;
    }
    return true;
  },
);

const styles = EStyleSheet.create({
  propName: {
    color: 'white',
    fontSize: '20rem',
    // marginLeft: deviceWidth * 0.04,
    marginLeft: '15rem',
    fontFamily: 'Roboto-Bold',
    marginBottom: '15rem',
    marginTop: '15rem',
  },
  imageStyle: {
    // width: '88rem',
    height: '124rem',
    aspectRatio: 0.8,
    marginLeft: '15rem',
    borderRadius: 10,
  },
  imageViewContainer: {
    justifyContent: 'center',
  },
  activityIndicator: {
    height: '124rem',
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
