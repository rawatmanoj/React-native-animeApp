/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation, useRoute, use } from '@react-navigation/native';
import { shortAnimeName } from '../../../../api/utils';
import { deviceWidth, deviceHeight } from '../../../../api/Constants';
import { useInfiniteQuery } from 'react-query';
import reactotron from 'reactotron-react-native';
import { getRecommendations } from '../../../../api/apicalls';
import { StackActions, NavigationAction } from '@react-navigation/routers';



export default React.memo(function Recommendations(props) {

    const navigation = useNavigation();
    const { params } = useRoute();

    const fetchData = ({ pageParam = 1 }) => {
        return getRecommendations(params.id, pageParam);
    }

    const transformData = (data) => {

        let res = [];

        data.pages.map(page => {
            res = [...res, ...page.Media.recommendations.edges]
        })

        return res;
    }




    const { data: result, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery('recommendations',
        fetchData,
        {
            select: transformData,
            getNextPageParam: (_lastPage, pages) => {
                // reactotron.log(pages)
                // return undefined;

                if (pages[pages.length - 1].Media.recommendations.pageInfo.hasNextPage) {
                    return pages.length + 1
                }
                else {
                    return undefined
                }
            }
        }
    )


    const renderItem = ({ item: innerItem }) => {

        return (
            <TouchableOpacity
                style={{}}
                onPress={() => {
                    //AnimeInfoScreen
                    reactotron.log("clicked", innerItem.node.id)
                    // props.navigation.navigate({
                    //     routeName: 'AnimeInfoScreen',
                    //     params: {
                    //         id: innerItem.node.id,
                    //     },
                    //     key: innerItem.node.id,  // value is ScreenA-test
                    // });
                    // useNavigation().navigate('AnimeInfoScreen', {
                    //     id: innerItem.node.id,
                    // });


                    // navigation.navigate('Home', {
                    //     screen: 'AnimeInfoScreen',
                    //     params: {
                    //         id: innerItem.node.id,
                    //     },
                    //     key: innerItem.node.id,
                    // })


                }}

            >
                <ImageBackground
                    source={{ uri: innerItem.node.mediaRecommendation.coverImage.large }}
                    style={styles.imageStyle}
                    resizeMode="cover"
                    PlaceholderContent={
                        <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
                    }
                    placeholderStyle={{
                        backgroundColor: EStyleSheet.value('$shadeColor'),
                    }}
                >
                    <View style={styles.ratingFloater}>
                        <Text style={styles.floatingText}>{innerItem?.node.mediaRecommendation.averageScore || 0}%</Text>
                    </View>
                </ImageBackground>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>
                        {shortAnimeName(innerItem.node.mediaRecommendation.title.userPreferred, 20)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        // }

        // );
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
                    numColumns={3}
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
});

const styles = EStyleSheet.create({
    pageContainer: {
        flex: 1,
    },

    floatingText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
    },
    ratingFloater: {

        backgroundColor: 'black',
        borderRadius: 10,
        opacity: 0.8,
        right: 4,
        top: 4,
        position: 'absolute',
        width: deviceWidth * 0.08,
        height: deviceWidth * 0.04
    },
    navbarConatiner: {
        // marginBottom: '10rem',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight * 0.1,
        backgroundColor: '$baseColor',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: 'black',
    },
    searchContainer: {
        flex: 1,
        marginRight: '1rem',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    appName: {
        flex: 3,
        color: '$spcColor',
        fontSize: '30rem',
        marginLeft: '18rem',
        fontFamily: 'Poppins-Regular',
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
        backgroundColor: '$baseColor',
        width: deviceWidth,
        paddingLeft: '10rem',
    },
    activityIndicator: {
        height: '124rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
