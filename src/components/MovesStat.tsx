import { useState } from 'react';
import styles from './MovesStat.module.css';
import type { Pokemon } from "../types/pokemon";
import ChevronIcon from '../assets/svg/chevron.svg';

interface MovesStatProps {
  pokemon: Pokemon;
}


function MovesStat({ pokemon }: MovesStatProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get all level-up moves first
  const allLevelUpMoves = pokemon.moves
    .filter(move => 
      move.version_group_details.some(detail => 
        detail.move_learn_method.name === 'level-up'
      )
    )
    .map(move => {
      const levelDetail = move.version_group_details.find(detail => 
        detail.move_learn_method.name === 'level-up'
      );
      return {
        name: move.move.name.replace('-', ' '),
        level: levelDetail?.level_learned_at || 1
      };
    });

  // Show either 6 moves or all moves based on expanded state
  const displayedMoves = isExpanded ? allLevelUpMoves : allLevelUpMoves.slice(0, 6);
  const hasMoreMoves = allLevelUpMoves.length > 6;

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Moves (Level Up)</h3>
      <div className={styles.moves}>
        {displayedMoves.map((move, index) => (
          <div key={index} className={styles.move}>
            <span className={styles.moveName}>{move.name}</span>
            <span className={styles.moveMethod}>
              Lv. {move.level}
            </span>
          </div>
        ))}
      </div>
      {hasMoreMoves && (
        <button className={styles.toggleButton} onClick={toggleExpanded}>
          <span className={styles.buttonText}>
            {isExpanded ? 'Collapse' : 'Load more'}
          </span>
          <img 
            src={ChevronIcon} 
            alt="chevron" 
            className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ''}`}
          />
        </button>
      )}
    </div>
  );
}

export default MovesStat;
