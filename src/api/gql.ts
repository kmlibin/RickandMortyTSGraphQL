import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query FilterCharacter($page: Int, $name: String, $gender: String, $species: String, $status: String) {
    characters(page: $page, filter: { name: $name, gender: $gender, species: $species, status: $status}) {
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
