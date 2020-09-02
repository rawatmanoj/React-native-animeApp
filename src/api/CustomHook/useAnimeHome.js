import {useEffect, useState, useCallback} from 'react';

import {TopAnime} from '../apicalls';

// export default function useAnimeHome() {
//   console.log('hook called');
//   const [state, setState] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     console.log('customhook useeffects');
//     const fetchData = async () => {
//       console.log('fetchdata');
//       setLoading(true);
//       const anime = await TopAnime('ANIME', 'TRENDING_DESC', 'TV', 1);
//       setState((prevstate) => [...prevstate, ...anime]);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);
//   console.log(state);
//   return {data: state, loading};
// }
