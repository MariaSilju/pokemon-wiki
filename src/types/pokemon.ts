export interface PokemonType {
  type: {
    name: string;
  }
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    official_artwork: string;
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
}
