import {useEffect, useState} from 'react';

import {TopAnime} from '../apicalls';

export default function useAnimeHome(type, sort, format, page) {
  const [state, setState] = useState([]);
  useEffect(() => {
    console.log('customhook');
    const fetchData = async () => {
      console.log('fetchData');

      const anime = await TopAnime(type, sort, format, page);
      console.log(anime);

      setState((prevstate) => [...prevstate, ...anime]);
    };
    fetchData();
  }, [page, type, sort, format]);

  return state;
}
