import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {deviceWidth} from './Constants';
export const Description = (props) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View
      style={{
        width: deviceWidth,
        // backgroundColor: 'red',
        // justifyContent: 'center',
      }}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 4}
        style={{
          letterSpacing: 0.8,
          width: deviceWidth - 18,
          color: 'white',
          flex: 1,
          fontSize: 14.5,
          flexWrap: 'wrap',
          fontFamily: 'Lato-Bold',
          lineHeight: 21,
        }}>
        {props.text}
      </Text>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{
            fontSize: 14,
            lineHeight: 21,
            marginTop: 10,
            color: 'tomato',
            fontFamily: 'Lato-Bold',
          }}>
          {textShown ? 'Read less...' : 'Read more...'}
        </Text>
      ) : null}
    </View>
  );
};
