import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { getStaff } from '../../../../api/apicalls';
import { useQuery } from 'react-query';
import reactotron from 'reactotron-react-native';
import { useRoute } from '@react-navigation/core';
export default React.memo(function Staff() {

  const { params } = useRoute();


  const { data: staff, } = useQuery('get-staffs', () => {
    return getStaff(params.id)
  },
    {
      select: (data) => {
        return data.Media.staff.nodes
      }
    }
  )


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { }}>
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
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.propName}>{name}</Text> */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={staff}
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
    marginBottom: '35rem',
    marginLeft: '20rem',
    marginTop: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyles: {
    width: '68rem',
    height: '68rem',
    borderRadius: 69 / 2,
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
