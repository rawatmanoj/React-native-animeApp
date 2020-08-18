export const getDiscover = async (
  type = 'ANIME',
  sortType = 'POPULARITY_DESC',
  format = 'TV',
  status = 'RELEASING',
) => {
  let query = `
  {
 
    Page(page: 1, perPage: 50) {
      
    media(type:${type},format:${format},status:${status},sort:${sortType}){
         id
        format
        type
        status
          startDate {
            year
            month
            day
          }
      
      endDate {
        year
        month
        day
      }
          idMal
          id
          title {
              userPreferred
          
          
        }
       coverImage {
        large
         medium
         
       
      
      }
    }
    }
  }
  
  `;

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        //variables: variables,
      }),
    };

  const response = await fetch(url, options);
  const res = await response.json();
  return res.data;
};

export const getCharacters = async () => {
  let query = `
  {
 
    Page(page: 1, perPage: 100) {
      
     characters(sort:FAVOURITES_DESC) {
       id
      name {
        first
        last
        full
        native
      }
      image {
        large
        medium
      }
     }
    }
  }
  
  `;

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        //variables: variables,
      }),
    };

  const response = await fetch(url, options);
  const res = await response.json();
  return res.data;
};
