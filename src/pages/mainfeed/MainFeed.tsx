import React from "react";

//TS interfaces
import { ICharacter } from "../../models/model";

//Components
import { CharacterCard } from "../../components/charactercard/CharacterCard";
import Spinner from "../../components/spinner/Spinner";

interface Props {
  data: any;
  favorites: ICharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>;
  currentPage: Number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: Number | undefined;
  queryString: {
    [k: string]: string;
  };
  name: string;
  loading: boolean;
}

export const MainFeed = ({
  data,
  favorites,
  setFavorites,
  currentPage,
  setCurrentPage,
  totalPages,
  queryString,
  name,
  loading
 
}: Props) => {

  return (
    <div className="data-container">
      {loading && <Spinner />}
      {data && (
        <CharacterCard
          data={data}
          favorites={favorites}
          setFavorites={setFavorites}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          queryString={queryString}
          name={name}
        />
      )}
    </div>
  );
};
