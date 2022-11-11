export interface Select {
    value: string;
    label: string;
}

export interface ICharacter {
    id?: string,
    image?: string,
    name: string,
    gender: string,
    species: string,
    origin?: {name?: string, dimension?: string},
    status?: string,
    isFavorite?: boolean
 
}