import {useEffect, useState, useCallback} from 'react';

import {TopAnime} from '../apicalls';

export default function useAnimeHome(type, sort, format, page) {
  console.log('hook called');
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('customhook useeffect');
    const fetchData = async () => {
      setLoading(true);
      const anime = await TopAnime(type, sort, format, page);

      setState((prevstate) => [...prevstate, ...anime]);
      setLoading(false);
    };
    fetchData();
  }, [page, type, sort, format]);
  console.log(state);
  return {data: state, loading};
}
