import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query FilterCharacter($name: String, $gender: String, $species: String, $status: String) {
    characters(filter: { name: $name, gender: $gender, species: $species, status: $status }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        gender
        species
        origin {
          name
          dimension
        }
        image
      }
    }
  }
`;


// const GET_FILTERED_CHARACTER = gql`
//   query filterByCharacter($name: String!) {
//     characters(filter: { name: $name }) {
//       results {
//         id
//         name
//         status
//         gender
//         species
//         origin {
//           name
//           dimension
//         }
//         image
//       }
//     }
//   }
// `;