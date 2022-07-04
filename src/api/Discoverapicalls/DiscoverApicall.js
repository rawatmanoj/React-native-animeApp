
export const getDiscover = async (
  type = 'ANIME',
  sortType = 'POPULARITY_DESC',
  format = 'TV',
  status,
  page = 1
) => {
  let statusText = status ? `status: ${status}` : ``

  let query = `
  {
 
    Page(page: ${page}, perPage: 50) {
      
    media(type:${type},format:${format},${statusText},sort:${sortType}){
         id
        format
        type
        averageScore
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
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
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

export const getCharacters = async (page = 1, search = "") => {
  let searchText = "";
  if (search) {
    searchText = `search:"${search}"`
  }


  let query = `
  {

    Page(page:${page}, perPage: 100) {

     characters(sort:FAVOURITES_DESC,${searchText}) {
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
     pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
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

export const getStaffs = async (page = 1, search = "") => {
  let searchText = "";
  if (search) {
    searchText = `search:"${search}"`
  }


  let query = `
  {

    Page(page:${page}, perPage: 100) {

     staff(sort:FAVOURITES_DESC,${searchText}) {
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
     pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
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

