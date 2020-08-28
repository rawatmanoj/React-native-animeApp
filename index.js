/**
 * @format
 */
//import './wdyr';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';
import {deviceWidth} from './src/api/Constants';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: 'white',
  $rem: deviceWidth / 380,
  $baseColor: '#2D2D2D',
  $spcColor: '#F27F24',
  $shadeColor: '#393939',
});

AppRegistry.registerComponent(appName, () => App);
