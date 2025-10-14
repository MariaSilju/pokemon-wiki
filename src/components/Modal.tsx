import { useEffect } from 'react';
import styles from './Modal.module.css';
import type { Pokemon } from '../types/pokemon';
import PokemonStat from './PokemonStat';
import AbilitiesStat from './AbilitiesStat';
import MovesStat from './MovesStat';

const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

function getTypeGradient(types: string[]): string {
  if (types.length === 1) {
    const color = typeColors[types[0]] || '#A8A878';
    return `radial-gradient(circle, ${color}, ${color}88)`;
  } else {
    const color1 = typeColors[types[0]] || '#A8A878';
    const color2 = typeColors[types[1]] || '#A8A878';
    return `radial-gradient(circle, ${color1}, ${color2})`;
  }
}

interface ModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

function Modal({ pokemon, onClose }: ModalProps) {

  useEffect(() => {
    if (pokemon) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Cleanup function to restore styles when modal closes
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <div 
              className={styles.gradientBackground}
              style={{ background: getTypeGradient(pokemon.types.map(t => t.type.name)) }}
            ></div>
            <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
          </div>
          <h2>{pokemon.name}</h2>
          <div className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</div>
          <div className={styles.types}>
            {pokemon.types.map((type, index) => (
              <span key={index} className={`${styles.type} ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>

          <PokemonStat 
            stats={[
              { title: 'Height', subtitle: `${(pokemon.height / 10).toFixed(1)} m` },
              { title: 'Weight', subtitle: `${(pokemon.weight / 10).toFixed(1)} kg` }
            ]}
          />
          <AbilitiesStat pokemon={pokemon}/>
          <MovesStat pokemon={pokemon}/>
        </div>
      </div>
    </div>
  );
}

export default Modal;
