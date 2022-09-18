import { gql } from "graphql-request";

export const TRENDING_COLLECTION = gql`

query TrendingCollections {
    trendingCollections {
      edges {
        node {
          address
          ... on ERC721Contract {
            name
            stats {
              volume
            }
            symbol
          }
        }
      }
    }
  }
  
`;