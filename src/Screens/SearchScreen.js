/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {SearchBar, Image} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
//import {u} from "@react-navigation/bottom-tabs"
import {searchAnime} from '../api/apicalls';
import {useDispatch} from 'react-redux';

import {shortAnimeName} from '../api/utils';
import {deviceWidth, deviceHeight} from '../api/Constants';

export default React.memo(function SearchScreen() {
  console.log('searchScreen');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const handleValidateClose = useCallback(() => {
    navigate.goBack();

    return true;
  }, [navigate]);

  BackHandler.addEventListener('hardwareBackPress', handleValidateClose);

  const fetchAnime = async (search) => {
    const searchresult = await searchAnime(search, 'ANIME');
    setResult(searchresult.Page.media);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch({type: 'CURRENT_ANIME', payload: item.id});
          navigate.navigate('AnimeInfoScreen');
          // console.log(navigate);
        }}>
        <Image
          source={{uri: item.coverImage.large}}
          style={styles.imageStyle}
          resizeMode="cover"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            {shortAnimeName(item.title.userPreferred, 20)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.pageContainer}>
      <View>
        <SearchBar
          autoFocus={true}
          placeholder="Search..."
          onChangeText={(search) => {
            setValue(search);
          }}
          onSubmitEditing={(event) => {
            console.log(event.nativeEvent.text);

            fetchAnime(event.nativeEvent.text);
          }}
          value={value}
          underlineColorAndroid={EStyleSheet.value('$baseColor')}
          selectionColor={EStyleSheet.value('$spcColor')}
          searchIcon={
            <AntDesign
              name={'arrowleft'}
              size={20}
              color={'grey'}
              onPress={() => {
                navigate.goBack();
              }}
            />
          }
          cancelIcon={true}
          containerStyle={{
            backgroundColor: EStyleSheet.value('$baseColor'),
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: EStyleSheet.value('$baseColor'),
          }}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        scrollEventThrottle={1900}
        data={result}
        numColumns={3}
        horizontal={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
});

const styles = EStyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  imageStyle: {
    height: '124rem',
    aspectRatio: 0.8,
    marginLeft: '15rem',
    borderRadius: 10,
  },
  titleContainer: {
    width: deviceWidth * 0.28,
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
  flatlist: {
    paddingTop: '55rem',
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '$shadeColor',
    width: deviceWidth,
    paddingLeft: '10rem',
  },
});
