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

export interface PokemonMove {
  move: {
    name: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
  }[];
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
  moves: PokemonMove[];
}
