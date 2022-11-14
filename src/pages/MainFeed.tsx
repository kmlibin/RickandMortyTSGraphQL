import React from 'react'
import {CharacterCard} from '../components/CharacterCard'
import { ICharacter } from '../model';

interface Props {
    data: any;
    favorites: ICharacter[];
    setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>
    currentPage: Number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: Number | undefined;
   
  }

export const MainFeed = ({data, favorites, setFavorites, currentPage, setCurrentPage, totalPages}: Props) => {
    
    return (
      data && <CharacterCard data={data} favorites={favorites} setFavorites={setFavorites} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    )
  }
  


