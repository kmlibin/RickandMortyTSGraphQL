import { ISelect } from "./models/model";

export const speciesFilter: ISelect[] = [
    { value: "human", label: "Human" },
    { value: "alien", label: "Alien" },
    { value: "robot", label: "Robot" },
    { value: "humanoid", label: "Humanoid" },
    { value: "cronenberg", label: "Cronenberg" },
    { value: "animal", label: "Animal" },
    { value: "mythological creature", label: "Mythological Creature" },
    { value: "disease", label: "Disease" },
  ];
  export const genderFilter: ISelect[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "genderless", label: "Genderless" },
    { value: "unknown", label: "Unknown" },
  ];
  
  export const statusFilter: ISelect[] = [
    { value: "alive", label: "Alive" },
    { value: "dead", label: "Dead" },
    { value: "unknown", label: "Unknown" },
  ];