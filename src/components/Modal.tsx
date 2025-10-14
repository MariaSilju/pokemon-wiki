import styles from './Modal.module.css';
import type { Pokemon } from '../types/pokemon';
import PokemonStat from './PokemonStat';
import AbilitiesStat from './AbilitiesStat';

interface ModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

function Modal({ pokemon, onClose }: ModalProps) {
  if (!pokemon) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
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
        </div>
      </div>
    </div>
  );
}

export default Modal;
