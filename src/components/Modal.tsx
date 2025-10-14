import styles from './Modal.module.css';
import type { Pokemon } from '../types/pokemon';

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
          <h2>{pokemon.name}</h2>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
