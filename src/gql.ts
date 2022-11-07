import { gql } from "@apollo/client";

export const CHECK = gql`
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
