import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getDiscover} from '../../../api/Discoverapicalls/DiscoverApicall';
import DiscoverMain from './DiscoverMain';
export default React.memo(function TabViewScreen({
  type,
  sortType,
  format,
  status,
}) {
  console.log('TabViewScreen');

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
      const searchresult = await getDiscover(type, sortType, format, status);
      setResult(searchresult.Page.media);
    };

    fetchAnime();
    return () => handler.remove();
  }, [handleValidateClose, type, sortType, format, status]);
  return <DiscoverMain result={result} />;
});

const styles = StyleSheet.create({});
