/**
 * @format
 */
//import './wdyr';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';
import { deviceWidth } from './src/api/Constants';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: 'white',
  $rem: deviceWidth / 380,
  // $baseColor: '#1f1f1f',
  $baseColor: '#2D2D2D',
  // $spcColor: '#F27F24',
  // $spcColor: '#c0392b',
  // $spcColor: '#ecf0f1',
  $spcColor: '#df73ff',
  $shadeColor: '#393939', //black sahde on loader
  $veryLightShade: '#26282F', //very light shade black
  $arrowColor: 'rgb(158, 164, 182)', // light shade black
  $loaderBackground: '#343434',
  $purpleShade: '#df73ff'
});

AppRegistry.registerComponent(appName, () => App);
