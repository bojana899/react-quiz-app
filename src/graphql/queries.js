import { gql } from '@apollo/client';

export const FETCH_COUNTRY_DATA = gql`
  query {
    countries {
      name
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
