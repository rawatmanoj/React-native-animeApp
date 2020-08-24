import React, {useEffect, useState, useCallback} from 'react';

import {TopAnime} from '../apicalls';

const useAnimeHome = (page) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    console.log('useeffect');
    const fetchData = async () => {
      console.log('fetchData');

      const topAnime = await TopAnime('ANIME', 'SCORE_DESC', 'TV', `${page}`);
      console.log(topAnime);
      const topMovie = await TopAnime(
        'ANIME',
        'SCORE_DESC',
        'MOVIE',
        `${page}`,
      );
      const topManga = await TopAnime(
        'MANGA',
        'FAVOURITES_DESC',
        'MANGA',
        `${page}`,
      );
      const trendingAnime = await TopAnime(
        'ANIME',
        'TRENDING_DESC',
        'TV',
        `${page}`,
      );
      const trendingMovie = await TopAnime(
        'ANIME',
        'TRENDING_DESC',
        'MOVIE',
        `${page}`,
      );
      console.log(topAnime.Page.media);

      setState((prevstate) => {
        return {
          top: {
            topAnime: [...prevstate.top.topAnime, ...topAnime],
            topManga: [...prevstate.top.topManga, ...topManga],
            topMovie: [...prevstate.top.topMovie, ...topMovie],
            trendingAnime: [...prevstate.top.trendingAnime, ...trendingAnime],
            trendingMovie: [...prevstate.top.trendingMovie, ...trendingMovie],
          },
        };
      });
    };
    fetchData();
  }, [page]);
};

export default useAnimeHome;
