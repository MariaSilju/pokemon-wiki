import { useEffect } from 'react';
import styles from './Modal.module.css';
import type { Pokemon } from '../types/pokemon';
import PokemonStat from './PokemonStat';
import AbilitiesStat from './AbilitiesStat';
import MovesStat from './MovesStat';
import { getTypeGradient, getTypeStyles } from '../utils/typeColors';

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
              <span 
                key={index} 
                className={styles.type}
                style={getTypeStyles(type.type.name)}
              >
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
