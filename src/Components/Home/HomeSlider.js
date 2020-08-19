import React, {useCallback} from 'react';
import {Image} from 'react-native-elements';
import {shortAnimeName} from '../../api/utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../../api/Constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// const HomeSlider = React.memo(
//   ({compProp, name}) => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation();

//     console.log('Homeslider');

//     const renderItem = useCallback(
//       ({item}) => {
//         return (
//           <TouchableOpacity
//             onPress={() => {
//               dispatch({type: 'CURRENT_ANIME', payload: item.id});
//               // navigation.navigate('AnimeInfoScreen');
//               navigation.navigate('Home', {
//                 screen: 'AnimeInfoScreen',
//               });
//             }}>
//             <Image
//               source={{uri: item.coverImage.large}}
//               style={styles.imageStyle}
//               resizeMode="cover"
//               PlaceholderContent={
//                 <ActivityIndicator color={EStyleSheet.value('$spcColor')} />
//               }
//               placeholderStyle={{
//                 backgroundColor: EStyleSheet.value('$shadeColor'),
//               }}
//             />

//             <View style={styles.titleContainer}>
//               <Text style={styles.titleStyle}>
//                 {shortAnimeName(item.title.userPreferred, 18)}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         );
//       },
//       [dispatch, navigation],
//     );

//     return (
//       <View style={styles.container}>
//         <Text style={styles.propName}>{name}</Text>
//         {/* <FlatList
//           initialNumToRender={5}
//           maxToRenderPerBatch={10}
//           windowSize={10}
//           removeClippedSubviews={true}
//           showsHorizontalScrollIndicator={false}
//           horizontal={true}
//           data={compProp.Page.media}
//           renderItem={renderItem}
//           keyExtractor={(item) => {
//             return item.id.toString();
//           }}
//         /> */}
//         <RecyclerListView
//           layoutProvider={this._layoutProvider}
//           dataProvider={this.state.dataProvider}
//           rowRenderer={this._rowRenderer}
//         />
//       </View>
//     );
//   },
//   (prevProps, nextProps) => {
//     if (prevProps.compProp !== nextProps.compProp) {
//       return false;
//     }
//     return true;
//   },
// );

// const styles = EStyleSheet.create({
//   propName: {
//     color: 'white',
//     fontSize: '20rem',
//     // marginLeft: deviceWidth * 0.04,
//     marginLeft: '15rem',
//     fontFamily: 'Lato-Bold',
//     marginBottom: '15rem',
//     // marginTop: '15rem',
//   },
//   imageStyle: {
//     // width: '88rem',
//     height: '124rem',
//     aspectRatio: 0.8,
//     marginLeft: '15rem',
//     borderRadius: 10,
//   },
//   imageViewContainer: {
//     justifyContent: 'center',
//   },
//   titleStyle: {
//     fontSize: '12.5rem',
//     opacity: 0.8,
//     marginTop: deviceHeight * 0.008,
//     marginLeft: deviceWidth * 0.04,
//     marginBottom: '45rem',
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontFamily: 'Roboto-Bold',
//   },
//   titleContainer: {
//     width: deviceWidth * 0.28,
//   },
// });

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
  }
  render() {
    console.log(this.props);
    return (
      <View {...this.props}>
        <Text>{this.props.data}</Text>
        <Image source={{uri: this.props.data[1]}} />
      </View>
    );
  }
}

/***
 * To test out just copy this component and render in you root component
 */
class HomeSlider extends React.Component {
  constructor(args) {
    super(args);

    let {width} = Dimensions.get('window');

    console.log(this.props);
    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    let dataProvider = new DataProvider((r1, r2) => {
      return r1.idMal !== r2.idMal;
    });

    //Create the layout provider
    //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    //Second: Given a type and object set the height and width for that type on given object
    //If you need data based check you can access your data provider here
    //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      (index) => {
        if (index % 2 === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width / 2 - 0.0001;
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width / 2;
            dim.height = 160;
            break;
          case ViewTypes.FULL:
            dim.width = 300;
            dim.height = 140;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray()),
    };
    console.log(this.state.dataProvider);
  }

  // _generateArray(n) {
  //   let arr = new Array(n);
  //   for (let i = 0; i < n; i++) {
  //     arr[i] = i;
  //   }
  //   console.log(arr);
  //   return arr;
  // }

  _generateArray() {
    return this.props.compProp.Page.media.map((item) => {
      return [item.title.userPreferred, item.coverImage.medium];
    });
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      // case ViewTypes.HALF_LEFT:
      //   return (
      //     <CellContainer style={styles.containerGridLeft}>
      //       <Text>Data: {data}</Text>
      //     </CellContainer>
      //   );
      // case ViewTypes.HALF_RIGHT:
      //   return (
      //     <CellContainer style={styles.containerGridRight}>
      //       <Text>Data: {data}</Text>
      //     </CellContainer>
      //   );
      case ViewTypes.FULL:
        return (
          <CellContainer data={(data[1], data[0])} style={styles.container} />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={{minHeight: 124}}>
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
          isHorizontal={true}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1',
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbb00',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb00',
  },
};

export default HomeSlider;
