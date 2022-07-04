export const TopAnime = (type = 'ANIME', sortType, format, page) => {
    return `{
        Page(page: ${page}, perPage: 20) {  
        media(type: ${type},sort: ${sortType},format: ${format}) {
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
}


export const getAnime = (id) => {
    return `
    {
  
        Media(id:${id}) {
          idMal
          format
          type
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
    `
};

export const getChar = (id) => {
    return `
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
    
    
    `
};


export const getStaff = (id) => {
    return `
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
    `
};


export const getReviews = (id) => {
    return `
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
    
    
    `
};



export const searchAnime = (search, type) => {
    return `
    {
      Page( page: 1, perPage: 50) {
  
      
        media(search: "${search}",sort:POPULARITY_DESC,type:${type}) {
     
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
    
    `
};


export const getCharInfo = (id) => {
    return `
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

    `
};



