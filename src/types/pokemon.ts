export interface PokemonType {
  type: {
    name: string;
  }
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
}
