import styles from './PokemonCard.module.css';
import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </div>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <div className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</div>
      <div className={styles.types}>
        {pokemon.types.map((type, index) => (
          <span key={index} className={`${styles.type} ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard