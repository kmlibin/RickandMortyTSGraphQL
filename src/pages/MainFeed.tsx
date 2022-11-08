import React from 'react'
import {CharacterCard} from '../components/CharacterCard'

interface Props {
    data: any;
   
  }

export const MainFeed = (data: Props) => {
    console.log(data)
  
    return (
      
      data && <CharacterCard data={data}/>
    )
  }
  


