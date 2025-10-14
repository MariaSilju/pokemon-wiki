export interface Pokemon {
  name: string;
  id: number;
  sprites: {
    official_artwork: string;
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}
