import {useEffect, useState} from 'react';

import {TopAnime} from '../apicalls';

export default function useAnimeHome(type, sort, format, page) {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('customhook');
    const fetchData = async () => {
      console.log('fetchData');
      setLoading(true);
      const anime = await TopAnime(type, sort, format, page);

      console.log(anime);

      setState((prevstate) => [...prevstate, ...anime]);
      setLoading(false);
    };
    fetchData();
  }, [page, type, sort, format]);

  return {data: state, loading};
}
