import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query FilterCharacter($name: String, $gender: String, $species: String) {
    characters(filter: { name: $name, gender: $gender, species: $species }) {
      characters {
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
  }
`;

export const useGetCharacters = () => {
  const { error, data, loading } = useQuery(GET_CHARACTERS);

  return { error, data, loading };
};
