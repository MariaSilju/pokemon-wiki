import styles from './PokemonCard.module.css';

interface Pokemon {
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

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </div>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <div className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</div>
      <div className={styles.types}>
        {pokemon.types.map((type, index) => (
          <span key={index} className={`${styles.type} ${styles[type.type.name]}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard