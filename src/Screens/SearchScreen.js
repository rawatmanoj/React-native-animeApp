/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Searchbar } from "react-native-paper"
import EStyleSheet from 'react-native-extended-stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import { getTagsAndGenres, searchAnime } from '../api/apicalls';
import { useDispatch } from 'react-redux';

import { shortAnimeName } from '../api/utils';
import { deviceWidth, deviceHeight } from '../api/Constants';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import SearchFilter from '../Components/Seach/SearchFilter';
import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCharacters, getStaffs } from '../api/Discoverapicalls/DiscoverApicall';

export default function SearchScreen(props) {
  const [value, setValue] = useState({
    data: null,
    isHistoryToggle: false
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const blurRef = useRef();
  const queryClient = useQueryClient();



  const [filtersData, setFiltersData] = useState({
    season: {
      data: null,
      isSelected: false
    },
    type: {
      data: 'ANIME',
      isSelected: false
    },
    format: {
      data: [],
      isSelected: false
    },
    status: {
      data: null,
      isSelected: false
    },
    country: {
      data: null,
      isSelected: false
    },
    sort: {
      data: 'POPULARITY_DESC',
      isSelected: false
    },
  });




  reactotron.log(filtersData, "screenSearch")

  const transFormData = useCallback((data) => {
    let res = [];
    reactotron.log(filtersData, "condition")


    if (filtersData?.type.data === "ANIME" || filtersData?.type.data === "MANGA") {

      data.pages.map(page => {
        if (page.Page.media) {
          res = [...res, ...page.Page.media]
        }
      })

      return res;
    }
    else if (filtersData?.type.data === "CHARACTER") {


      data.pages.map(page => {
        if (page?.Page?.characters) {
          res = [...res, ...page.Page.characters]
        }
      })

      return res;
    }
    else if (filtersData?.type.data === "STAFF") {


      data.pages.map(page => {
        if (page?.Page?.staff) {
          res = [...res, ...page.Page.staff]
        }
      })

      return res;
    }

    return res;
  }, [isFiltered])

  const { data: result, refetch, isLoading, fetchNextPage, isFetchingNextPage, isFetching, isRefetching, } = useInfiniteQuery('get-search', ({ pageParam = 1 }) => {

    if (filtersData?.type.data === "CHARACTER") {
      return getCharacters(pageParam, value.data)
    }

    if (filtersData?.type.data === "STAFF") {
      return getStaffs(pageParam, value.data)
    }
    // return searchAnime(value, 'ANIME',)
    if (filtersData?.type.data === "ANIME" || filtersData?.type.data === "MANGA") {
      return searchAnime(value.data, filtersData?.type.data, filtersData?.season.data, pageParam, filtersData?.sort?.data, filtersData?.format?.data, filtersData?.status?.data)
    }

    //reactotron.log(filtersData?.type.data === "CHARACTER")

  },
    {
      select: transFormData,
      getNextPageParam: (_lastPage, pages) => {

        if (pages && pages.length) {
          if (pages[pages?.length - 1].Page?.pageInfo.hasNextPage) {
            return pages.length + 1
          }
          else {
            return undefined
          }
        } else {
          return undefined
        }

      },
      // enabled: false
    }
  )





  const { data: tagsAndGenres, refetch: refetchTagsAndGenres } = useQuery('get-tags-genres', () => {
    return getTagsAndGenres()
  },
    {
      enabled: false
    }
  )

  // reactotron.log(result, "result");

  const handleSubmit = (event) => {
    AsyncStorage.getItem('savedSearchHistory', (err, result) => {
      const search = value.data;

      if (result !== null && value.data) {

        let newSearches = JSON.parse(result);
        newSearches = newSearches.filter(item => item !== search)
        newSearches.unshift(search);

        setRecentSearches(newSearches);
        AsyncStorage.setItem('savedSearchHistory', JSON.stringify(newSearches));
      } else {
        if (value.data) {
          setRecentSearches([value.data]);

          AsyncStorage.setItem('savedSearchHistory', JSON.stringify([value.data]));
        }
      }
    });
    refetch();
  }


  useEffect(() => {
    refetch();
  }, [isFiltered])

  useEffect(() => {
    blurRef.current.blur();
    handleSubmit();
    // setIsFocused(false);
  }, [value.isHistoryToggle])


  useEffect(() => {

    AsyncStorage.getItem('savedSearchHistory', (err, result) => {
      setRecentSearches(JSON.parse(result));
    });

    return () => {
      queryClient.resetQueries('get-search', { exact: true })
    }

  }, []);



  const renderItem = ({ item }) => {
    // reactotron.log(item)
    if (item.name) {
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: 'CURRENT_ANIME', payload: item.id });

            navigation.navigate('CharScreen', {
              id: item.id,
            });
            // console.log(navigate);
          }}>
          <Image
            source={{ uri: item.image.large }}
            style={styles.imageStyle}
            resizeMode="cover"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>
              {shortAnimeName(item.name.full, 20)}
            </Text>
          </View>
        </TouchableOpacity>

      )
    }
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: 'CURRENT_ANIME', payload: item.id });

          navigation.navigate('AnimeInfoScreen', {
            id: item.id,
          });
          // console.log(navigate);
        }}>
        <Image
          source={{ uri: item.coverImage.large }}
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


  const renderFlatList = () => {

    if (isLoading) {
      return (
        <View
          style={{
            backgroundColor: EStyleSheet.value('$shadeColor'),
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={EStyleSheet.value('$spcColor')} />
        </View>
      )
    }

    if (isFetching && !isFetchingNextPage) {
      return (
        <View
          style={{
            backgroundColor: EStyleSheet.value('$shadeColor'),
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <ActivityIndicator size="large" color={EStyleSheet.value('$spcColor')} />
        </View>
      )
    }

    if (result?.length < 1) {
      return (
        <View
          style={{
            backgroundColor: EStyleSheet.value('$shadeColor'),
            height: deviceHeight,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          <Text
            style={{
              color: EStyleSheet.value('$spcColor')
            }}
          >No Records Found</Text>

        </View>
      )
    }

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isFetching}
          />
        }
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
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
        numColumns={3}
      />
    )

  }


  return (
    <View style={styles.pageContainer}>
      <View style={styles.searchBarContainer}>

        <Searchbar
          ref={blurRef}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          // autoFocus={true}
          placeholder="Search..."
          onChangeText={(search) => {
            setValue({ data: search, isHistoryToggle: value.isHistoryToggle });
          }}
          onSubmitEditing={handleSubmit}
          value={value.data}
          underlineColorAndroid={EStyleSheet.value('$baseColor')}
          selectionColor={EStyleSheet.value('$spcColor')}
          inputStyle={styles.searchBarInputStyle}
          style={styles.searchBarStyle}
          placeholderTextColor={'white'}
          iconColor={EStyleSheet.value('$spcColor')}
        >
        </Searchbar>

        <TouchableOpacity style={styles.filterIconStyles}
        >
          <AntDesign
            name={'filter'}
            size={25}
            color={EStyleSheet.value('$spcColor')}
            onPress={() => {
              refRBSheet.current.open();
              // refetchTagsAndGenres();
            }}
          />
        </TouchableOpacity>
      </View>
      {
        isFocused && recentSearches?.map((searchText, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setValue({ data: searchText, isHistoryToggle: !value.isHistoryToggle });
                // handleSubmit();
              }}>
              <View
                key={index}
                style={styles.searchBarHistory}

              >
                <View style={styles.searchBarIconWrapper}>
                  <Entypo
                    style={styles.pastTimeIcon}
                    name={'back-in-time'}
                    size={20}
                    color={'white'}

                  />
                  <Text style={styles.searchBarHistoryTitle}>{searchText}</Text>
                </View>
                <Entypo
                  style={styles.crossIcon}
                  name={'cross'}
                  size={25}
                  color={'white'}
                  onPress={() => {
                    AsyncStorage.getItem('savedSearchHistory', (err, result) => {
                      if (result !== null) {
                        let data = JSON.parse(result);
                        data = data.filter(item => item !== searchText)
                        AsyncStorage.setItem('savedSearchHistory', JSON.stringify(data), () => {
                          AsyncStorage.getItem('savedSearchHistory', (err, result) => {
                            setRecentSearches(JSON.parse(result));
                          });
                        });
                      } else {
                        return
                      }
                    });
                    // refRBSheet.current.open();
                    // refetchTagsAndGenres();
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomColor: EStyleSheet.value('$baseColor'),
                  borderBottomWidth: 1,

                }}
              />
            </TouchableOpacity>
          );
        })
      }
      {renderFlatList()}
      <View>
        <SearchFilter refetch={refetch} isFiltered={isFiltered} filtersData={filtersData} setFiltersData={setFiltersData} refRBSheet={refRBSheet} setIsFiltered={setIsFiltered} />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  pageContainer: {
    flex: 1,
    //marginBottom: deviceHeight * 0.06
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
    paddingTop: deviceHeight * 0.05,
    flex: 1,
    backgroundColor: '$shadeColor',
    width: deviceWidth,
    paddingLeft: deviceWidth * 0.02,
    // paddingBottom: '95rem',
    //backgroundColor: 'red',
    // paddingBottom: deviceHeight * 0.5

  },
  searchBarStyle: {
    backgroundColor: '$baseColor',
    borderRadius: 0,
    flex: 8

  },
  searchBarInputStyle: {
    color: 'white',
    backgroundColor: '$baseColor',
  },
  filterIconStyles: {
    flex: 1
    //color: 'pink'
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: '$baseColor',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxStyle: {
    flexDirection: 'row',
    overflow: 'visible',
    flexWrap: 'wrap',
  },
  subHeading: {
    color: 'grey',
    fontSize: '16rem',
    // marginTop: '18rem',
    //marginBottom: '8rem',
    fontFamily: 'Lato-Bold',
  },
  scene: {
    width: deviceWidth,
    padding: '10rem',
    flex: 1,
    backgroundColor: '$baseColor',
    marginBottom: '15rem'
  },
  dropdownIconStyle: {
    color: "white"
  },
  bottomSheetHeaderStyle: {
    //  backgroundColor: "red",
    height: '40rem',
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: '10rem'

  },
  clearButton: {
    color: "$shadeColor",
    borderRadius: '10rem',
    backgroundColor: 'red',
    color: 'red',
    width: 100
  },
  closeButton: {
    color: 'red'
  },
  activityIndicator: {
    height: deviceHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarHistory: {
    width: deviceWidth,
    height: deviceHeight * 0.05,
    backgroundColor: '$baseColor',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pastTimeIcon: {
    marginLeft: deviceWidth * 0.05,
    //backgroundColor: 'red'
  },
  searchBarHistoryTitle: {
    color: 'white',
    marginLeft: deviceWidth * 0.05,
    fontFamily: 'Roboto'
  },
  searchBarIconWrapper: {
    // backgroundColor: 'red',
    flexDirection: 'row'
    // width: 1
    // width: '10rem'
  },
  crossIcon: {
    marginRight: deviceWidth * 0.05
  }
});
