import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getCharacters} from '../../../api/Discoverapicalls/DiscoverApicall';
import CharMain from '../DiscoverCharacter/CharMain';

export default function CharTabView() {
  console.log('charTabView');
  const navigate = useNavigation();
  const [result, setResult] = useState(null);
  const handleValidateClose = useCallback(() => {
    // navigate.reset();
    navigate.goBack();
    return true;
  }, [navigate]);
  useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleValidateClose,
    );
    const fetchAnime = async () => {
      const searchresult = await getCharacters();
      // console.log(searchresult);
      setResult(searchresult.Page.characters);
    };

    fetchAnime();
    return () => handler.remove();
  }, [handleValidateClose]);
  return <CharMain result={result} />;
}

const styles = StyleSheet.create({});
