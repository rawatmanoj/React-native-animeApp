import reactotron from "reactotron-react-native";

let url = 'https://graphql.anilist.co';
let options = (query) => {
  return {
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
}

export const UpcomingNextSeason = async (type = 'ANIME', sortType, format, page = 1, season, seasonYear) => {
  let formatText = format ? `format: ${format}` : ``

  let query = `
  {
    Page(page: ${page}, perPage: 20) {
      
     media(type:${type},sort: ${sortType},${formatText},season:${season},seasonYear:${seasonYear}) {
         
          idMal
          id
          averageScore
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
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data.Page;
};


export const TopAnime = async (type = 'ANIME', sortType, format, page = 1) => {
  let formatText = format ? `format: ${format}` : ``
  let query = `
{
  
  Page(page: ${page}, perPage: 50) {
    
   media(type: ${type},sort: ${sortType},${formatText}) {

        idMal
        id
        averageScore
        
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
  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data.Page;
};

export const getAnime = async (id) => {
  let query = `
  {

      Media(id:${id}) {
        idMal
        format
        type
        tags {
          id
          name
        }
        studios {
          nodes {
            id
            name
          }
         
        }
        averageScore
        description
        popularity
        seasonYear
        season
        favourites
        countryOfOrigin
        episodes
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
        genres
        recommendations(page:1,perPage:60,sort:RATING_DESC) {
    
          edges {
            node {
              id
             rating
              mediaRecommendation{
                id
                title {
                  romaji
                  english
                  native
                  userPreferred
                }
                bannerImage
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
              }
            }
          
          }
        }
        
       
        rankings {
      
          rank
        }
        title {
        
        
          userPreferred
        }
        coverImage {
          large
          medium
      
        }
        bannerImage
      }
    }
  
  
  `;



  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};

export const getChar = async (id) => {
  let query = `
  {

      Media(id:${id}) {
      
        characters {
          nodes{
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
    }
  
  
  `;

  // Define our query variables and values that will be used in the query request
  //   var variables = {
  //     sort: sortType,
  //   };


  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};

export const getStaff = async (id) => {
  let query = `
  {

      Media(id:${id}) {
      
        staff {
          nodes{
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
    }
  
  
  `;




  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};


export const getReviews = async (id) => {
  let query = `
  {

      Media(id:${id}) {

        reviews {
      
          nodes{
            
            
            siteUrl
            createdAt
            user {
              id
              name
              avatar {
                large
                medium
              }
              bannerImage
            }
            id
            ratingAmount
            summary
            score
          }
          
        }
      
      }
    }
  
  
  `;



  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};


export const getRecommendations = async (id, page) => {
  let query = `
  {
    Media(id: ${id}) {
     
   recommendations(page:${page},perPage:20,sort:RATING_DESC) {
      
          edges {
            node {
              id
             rating
              mediaRecommendation{
                id
                averageScore
                title {
                  romaji
                  english
                  native
                  userPreferred
                }
                bannerImage
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
              }
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
  }
  
  
  `;



  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};





export const searchAnime = async (search, type = "ANIME", season, page = 1, sort = "POPULARITY_DESC", format, status) => {
  reactotron.log(format, "formattttt")
  let seasonText = "";
  let searchText = "";
  let formatText = "";
  let statusText = "";

  if (status) {
    statusText = `status:${status}`
  }

  if (season) {
    seasonText = `season:${season}`
  }

  if (search) {
    searchText = `search:"${search}"`
  }

  if (format?.length > 0) {
    formatText = `format:${format}`
  }

  let query = `
  {
    Page( page: ${page}, perPage: 50) {    
      media(${searchText},type:${type},${seasonText},sort:${sort},${formatText},${statusText}) {
           idMal
           id
           averageScore
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



  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};

export const getTagsAndGenres = async () => {
  let query = `
    {
      genres: GenreCollection
      tags: MediaTagCollection {
        name
        description
        category
        isAdult
      }
    }  
    `;


  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};



export const getCharInfo = async (id) => {
  let query = `
  {
 
    Page(page: 1, perPage: 50) {
      
     characters(id:${id}) {
       id
      favourites
      description(asHtml:true)
      media(page:1,perPage: 1,sort:POPULARITY_DESC){
        nodes{
          title {
            romaji
            english
            native
            userPreferred
          }
          bannerImage
        }
      }
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


  const response = await fetch(url, options(query));
  const res = await response.json();
  return res.data;
};
