/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, Dimensions, SafeAreaView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import EStyleSheet from 'react-native-extended-stylesheet';
//import SafeAreaView from 'react-native-safe-area-view';
import TabViewScreen from './TabViewScreen';
import reactotron from 'reactotron-react-native';

const renderTabBar = (props) => (
  <TabBar
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          color,
          fontSize: 16,
          fontFamily: 'Roboto-Bold',
          borderTopWidth: 0,
          shadowRadius: 0,
          borderRadius: 0,
        }}>
        {route.title}
      </Text>
    )}
    tabStyle={styles.tabStyles}
    scrollEnabled={true}
    onTabPress={({ route, preventDefault }) => {
      if (route.key === 'first') {
        // preventDefault();
        // Do something else
      }
    }}
    {...props}
    indicatorStyle={{ backgroundColor: EStyleSheet.value('$baseColor') }}
    style={styles.tabBar}
  />
);

const initialLayout = { width: Dimensions.get('window').width };

export default React.memo(function DiscoverAnime(props) {
  const format = props.route.params.format;
  const type = props.route.params.type;
  // reactotron.log(props.navigation, "props.navigationnn")
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'NowPlaying', title: 'Now Playing' },
    { key: 'UpComing', title: 'Upcoming' },
    { key: 'Trending', title: 'Trending' },
    { key: 'Popular', title: 'Popular' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'NowPlaying':
        return (
          <TabViewScreen
            type={type}
            sortType={'POPULARITY_DESC'}
            format={format}
            status={'RELEASING'}
            name={route.key}
            navigation={props.navigation}
          />
        );
      case 'UpComing':
        return (
          <TabViewScreen
            type={type}
            sortType={'POPULARITY_DESC'}
            format={format}
            status={'NOT_YET_RELEASED'}
            name={route.key}
            navigation={props.navigation}
          />
        );
      case 'Trending':
        return (
          <TabViewScreen
            type={type}
            sortType={'TRENDING_DESC'}
            format={format}
            status={'FINISHED'}
            name={route.key}
            navigation={props.navigation}
          />
        );
      case 'Popular':
        return (
          <TabViewScreen
            type={type}
            sortType={'POPULARITY_DESC'}
            format={format}
            status={'FINISHED'}
            name={route.key}
            navigation={props.navigation}
          />
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.scene}>
      <TabView
        lazy={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
});

const styles = EStyleSheet.create({
  scene: {
    flex: 1,

    backgroundColor: '$baseColor',
  },
  tabBar: {
    backgroundColor: '$baseColor',
  },
  tabStyles: {
    width: 130,
  },
});
