import React from 'react'
import {CharacterCard} from '../components/CharacterCard'
import { ICharacter } from '../model';

interface Props {
    data: any;
    favorites: ICharacter[];
    setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>
   
  }

export const MainFeed = ({data, favorites, setFavorites}: Props) => {
    
    return (
      
      data && <CharacterCard data={data} favorites={favorites} setFavorites={setFavorites}/>
    )
  }
  


