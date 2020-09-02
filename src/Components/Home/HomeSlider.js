import React, {useState, useCallback, useEffect} from 'react';
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
//import useAnimeHome from '../../api/CustomHook/useAnimeHome';
import {TopAnime} from '../../api/apicalls';

const HomeSlider = React.memo(({compProp, name}) => {
  function useAnimeHome(type, sortType, format, page) {
    console.log('hook called');
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      console.log('customhook useeffects');
      const fetchData = async () => {
        console.log('fetchdata');
        setLoading(true);
        const anime = await TopAnime(type, sortType, format, page);
        setState((prevstate) => [...prevstate, ...anime]);
        setLoading(false);
      };

      fetchData();
    }, [type, sortType, format, page]);
    console.log(state);
    return {data: state, loading};
  }

  console.log('homeSlider');
  const type = compProp.type;
  const sortType = compProp.sortType;
  const format = compProp.format;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  const {data, loading} = useAnimeHome(type, sortType, format, page);

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
});

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
