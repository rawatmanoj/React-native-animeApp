/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Button,
    ScrollView,
} from 'react-native';
import { Chip, List, Searchbar } from "react-native-paper"
import EStyleSheet from 'react-native-extended-stylesheet';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from "react-native-raw-bottom-sheet";
import { deviceWidth } from '../../api/Constants'
import reactotron from 'reactotron-react-native';
import { useQueryClient } from "react-query"

export default function SearchFilter({ refetch, filtersData: propsFilter, setFiltersData: propsSetFilter, refRBSheet, setIsFiltered, isFiltered }) {

    // reactotron.log(filtersData, "filtersDataa")

    const [filtersData, setFiltersData] = useState(propsFilter);


    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={true}
            closeOnPressBack={true}
            height={600}
            customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: EStyleSheet.value('$spcColor')
                },
                container: {
                    backgroundColor: EStyleSheet.value('$baseColor')
                }
            }}
        >
            <View style={styles.bottomSheetHeaderStyle}>
                <Chip
                    textStyle={{ color: 'white' }}
                    //selected
                    selectedColor={EStyleSheet.value('$spcColor')}
                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                    //  icon="information"
                    onPress={() => setFiltersData({
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
                    })}>
                    Clear Filters
                </Chip>
                <Chip
                    textStyle={{ color: 'white' }}
                    //selected
                    selectedColor={EStyleSheet.value('$spcColor')}
                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                    //  icon="information"
                    onPress={() => {
                        propsSetFilter(filtersData);
                        setIsFiltered(!isFiltered)
                        //  queryClient.resetQueries('get-search', { exact: true })
                        //refetch();
                        refRBSheet.current.close()
                    }
                    }>
                    Apply
                </Chip>
            </View>
            <View
                style={{
                    borderBottomColor: EStyleSheet.value('$shadeColor'),
                    borderBottomWidth: 1,

                }}
            />
            <ScrollView style={styles.scene}>

                <View>
                    <List.Section >

                        <List.Accordion
                            expanded={true}
                            right={props => <Entypo
                                name={'chevron-small-down'}
                                size={25}
                                color={EStyleSheet.value('$spcColor')}
                                style={styles.dropdownIconStyle}
                            />}
                            style={{ color: 'white', backgroundColor: EStyleSheet.value('$baseColor') }}
                            title="Type"
                            titleStyle={styles.subHeading}
                        >
                            <View style={styles.boxStyle}>
                                {["Anime", "Manga", "Character", "Staff"].map((type, i) => {
                                    return (
                                        <View key={i} style={{ margin: 4 }}>
                                            <Chip
                                                selected={filtersData.type.data === type?.toUpperCase()}
                                                textStyle={{ color: 'white' }}
                                                style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                                                selectedColor="white"
                                                onPress={() => {
                                                    if (type === "Anime" || type === "Manga") {
                                                        setFiltersData(state => ({ ...state, type: { ...state.type, data: type.toUpperCase() } }))

                                                    } else {
                                                        setFiltersData({
                                                            season: {
                                                                data: null,
                                                                isSelected: false
                                                            },
                                                            type: {
                                                                data: type.toUpperCase(),
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
                                                        })
                                                    }
                                                }}>
                                                {type}
                                            </Chip>
                                        </View>

                                    );
                                })}
                            </View>
                        </List.Accordion>
                        {filtersData.type.data == "ANIME" || filtersData.type.data === "MANGA" ?

                            <List.Accordion
                                expanded={true}
                                right={props => <Entypo
                                    name={'chevron-small-down'}
                                    size={25}
                                    color={EStyleSheet.value('$spcColor')}
                                    style={styles.dropdownIconStyle}
                                />}

                                style={{ opacity: 1, color: 'white', backgroundColor: EStyleSheet.value('$baseColor') }}
                                title="Season"
                                titleStyle={styles.subHeading}
                            >
                                <View style={styles.boxStyle}>
                                    {["Winter", "Spring", "Summer", "Fall"].map((season, i) => {
                                        return (
                                            <View key={i} style={{ margin: 4 }}>
                                                <Chip
                                                    selected={filtersData.season.data === season?.toUpperCase()}
                                                    textStyle={{ color: 'white' }}
                                                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                                                    selectedColor="white"
                                                    onPress={() => {
                                                        setFiltersData(state => ({ ...state, season: { ...state.season, data: season.toUpperCase() } }))
                                                    }}>
                                                    {season}
                                                </Chip>
                                            </View>

                                        );
                                    })}
                                </View>
                            </List.Accordion> : null}

                        {filtersData.type.data == "ANIME" || filtersData.type.data === "MANGA" ?
                            <List.Accordion
                                expanded={true}
                                right={props => <Entypo
                                    name={'chevron-small-down'}
                                    size={25}
                                    color={EStyleSheet.value('$spcColor')}
                                    style={styles.dropdownIconStyle}
                                />}
                                style={{ color: 'white', backgroundColor: EStyleSheet.value('$baseColor') }}
                                title="Format"
                                titleStyle={styles.subHeading}
                            >
                                <View style={styles.boxStyle}>
                                    {["TV", "Tv_Short", "Movie", "Special", "Ova", "Ona", "Music", "Manga"].map((format, i) => {
                                        return (
                                            <View key={i} style={{ margin: 4 }}>
                                                <Chip
                                                    textStyle={{ color: 'white' }}
                                                    selected={filtersData.format.data.includes(format?.toUpperCase())}
                                                    selectedColor="white"
                                                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                                                    //  icon="information"
                                                    onPress={() => {
                                                        if (filtersData.format.data.includes(format?.toUpperCase())) {
                                                            setFiltersData(state => ({ ...state, format: { ...state.format, data: state.format.data.filter(data => data !== format?.toUpperCase()) } }));
                                                            return;
                                                        }
                                                        setFiltersData(state => ({ ...state, format: { ...state.format, data: [...state.format.data, format.toUpperCase()] } }))
                                                    }}>
                                                    {format}
                                                </Chip>
                                            </View>

                                        );
                                    })}
                                </View>
                            </List.Accordion>
                            : null}
                        {filtersData.type.data == "ANIME" || filtersData.type.data === "MANGA" ?
                            <List.Accordion
                                expanded={true}
                                right={props => <Entypo
                                    name={'chevron-small-down'}
                                    size={25}
                                    color={EStyleSheet.value('$spcColor')}
                                    style={styles.dropdownIconStyle}
                                />}
                                style={{ color: 'white', backgroundColor: EStyleSheet.value('$baseColor') }}
                                title="Status"
                                titleStyle={styles.subHeading}
                            >
                                <View style={styles.boxStyle}>
                                    {["Finished", "Releasing", "Not_yet_released", "Cancelled"].map((status, i) => {
                                        return (
                                            <View key={i} style={{ margin: 4 }}>
                                                <Chip
                                                    textStyle={{ color: 'white' }}
                                                    selected={filtersData.status.data === status?.toUpperCase()}
                                                    selectedColor={EStyleSheet.value('$spcColor')}
                                                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                                                    //  icon="information"
                                                    onPress={() => {
                                                        setFiltersData(state => ({ ...state, status: { ...state.status, data: status.toUpperCase() } }))
                                                    }}>

                                                    {status}
                                                </Chip>
                                            </View>

                                        );
                                    })}
                                </View>
                            </List.Accordion>
                            : null}
                        {filtersData.type.data == "ANIME" || filtersData.type.data === "MANGA" ?
                            <List.Accordion
                                expanded={true}
                                right={props => <Entypo
                                    name={'chevron-small-down'}
                                    size={25}
                                    color={EStyleSheet.value('$spcColor')}
                                    style={styles.dropdownIconStyle}
                                />}
                                style={{ color: 'white', backgroundColor: EStyleSheet.value('$baseColor') }}
                                title="Country"
                                titleStyle={styles.subHeading}
                            >
                                <View style={styles.boxStyle}>
                                    {["Japan", "South Korea", "China",].map((country, i) => {
                                        return (
                                            <View key={i} style={{ margin: 4 }}>
                                                <Chip
                                                    textStyle={{ color: 'white' }}
                                                    selected={filtersData.country.data === country?.toUpperCase()}
                                                    selectedColor="white"
                                                    style={{ backgroundColor: EStyleSheet.value('$shadeColor') }}
                                                    //  icon="information"

                                                    onPress={() => {
                                                        setFiltersData(state => ({ ...state, country: { ...state.country, data: country.toUpperCase() } }))
                                                    }}>
                                                    {country}
                                                </Chip>
                                            </View>

                                        );
                                    })}
                                </View>
                            </List.Accordion>
                            : null}
                    </List.Section>
                </View>
            </ScrollView>
        </RBSheet>

    )
}
const styles = EStyleSheet.create({





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

});

