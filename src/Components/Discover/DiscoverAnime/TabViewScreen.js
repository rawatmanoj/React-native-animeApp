import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, BackHandler, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getDiscover } from '../../../api/Discoverapicalls/DiscoverApicall';
import DiscoverMain from './DiscoverMain';
import { useInfiniteQuery } from 'react-query';
import reactotron from 'reactotron-react-native';
export default React.memo(function TabViewScreen({
  type,
  sortType,
  format,
  status,
  name,
  navigation
}) {


  const transformData = (data) => {
    let res = [];

    data.pages.map(page => {
      res = [...res, ...page.Page.media]
    })
    return res;
  }

  const fetchData = ({ pageParam = 1 }) => {

    return getDiscover(type, sortType, format, status, pageParam);
  }

  const { data: result, isLoading, fetchNextPage, isFetchingNextPage, } = useInfiniteQuery([name, format],
    fetchData,
    {
      select: transformData,
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].Page.pageInfo.hasNextPage) {
          return pages.length + 1
        }
        else {
          return undefined
        }
      }
    }
  )

  const memoizedNextPage = useCallback(fetchNextPage, [])



  return <DiscoverMain navigation={navigation} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} fetchNextPage={memoizedNextPage} result={result} />;
});

const styles = StyleSheet.create({});
