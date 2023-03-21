import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { getChar } from '../../../../api/apicalls';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
export default function Characters() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();

  // const [state] = useContext(Context);
  // const [char, setChar] = useState(null);

  const { data: char, } = useQuery('get-chars', () => {
    return getChar(params.id)
  },
    {
      select: (data) => {
        return data.Media.characters.nodes
      }
    }
  )



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
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={char}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
      />
    </SafeAreaView>
  );
};

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
