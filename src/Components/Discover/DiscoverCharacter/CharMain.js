import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { deviceHeight } from '../../../api/Constants';
export default function Characters({ result, isLoading, isFetchingNextPage, fetchNextPage }) {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CharScreen', {
            id: item.id,
          });
        }}>
        <View style={styles.imageContainer}>
          <View>
            <ImageBackground
              source={{ uri: item.image.medium }}
              style={styles.imageStyles}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.fullNameStyles}>{item.name.full}</Text>
            <Text style={styles.nativeNameStyles}>{item.name.native}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    !isLoading ?

      <View style={styles.pageContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={20}
          data={result}
          renderItem={renderItem}
          ListFooterComponent={() =>
            !isFetchingNextPage ? null : (
              <ActivityIndicator
                animating
                size="large"
                color={EStyleSheet.value('$spcColor')}
                style={styles.activityIndicator}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlist}
          numColumns={1}
        />
      </View>
      :

      <View style={styles.pageContainer}>
        <View
          style={{
            backgroundColor: EStyleSheet.value('$shadeColor'),
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <ActivityIndicator size="large" color={EStyleSheet.value('$spcColor')} />
        </View>
      </View>
  );
}

const styles = EStyleSheet.create({
  scene: {},
  pageContainer: {
    flex: 1,
    backgroundColor: '$shadeColor'
  },
  container: {
    flex: 1,
    //backgroundColor: '$baseColor',
  },
  imageContainer: {
    marginBottom: '35rem',
    marginLeft: '20rem',
    marginTop: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyles: {
    width: '68rem',
    height: '68rem',
    borderRadius: '35rem',
    overflow: 'hidden',
  },
  fullNameStyles: {
    marginLeft: '15rem',
    fontSize: '20rem',
    fontFamily: 'AlegreyaSans-Bold',
    color: 'white',
  },
  nativeNameStyles: {
    marginLeft: '15rem',
    fontSize: '14rem',
    fontFamily: 'Lato-Bold',
    color: 'grey',
  },
});
