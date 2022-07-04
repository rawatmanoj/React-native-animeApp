import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCharacters } from '../../../api/Discoverapicalls/DiscoverApicall';
import CharMain from '../DiscoverCharacter/CharMain';
import { useInfiniteQuery } from 'react-query';
import reactotron from 'reactotron-react-native';

export default function CharTabView() {

  const transformData = (data) => {
    let res = [];

    data.pages.map(page => {
      res = [...res, ...page.Page.characters]
    })
    return res;
  }

  const fetchData = ({ pageParam = 1 }) => {

    return getCharacters(pageParam);
  }

  const { data: result, isLoading, fetchNextPage, isFetchingNextPage, } = useInfiniteQuery('get-char-list',
    fetchData,
    {
      select: transformData,
      getNextPageParam: (_lastPage, pages) => {
        reactotron.log(pages, "pagesssssssss")
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



  return <CharMain fetchNextPage={memoizedNextPage} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} result={result} />;
}

