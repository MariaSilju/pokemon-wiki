import { useState } from 'react';
import styles from './MovesStat.module.css';
import type { Pokemon } from "../types/pokemon";
import ChevronIcon from '../assets/svg/chevron.svg';
import SectionWrapper from './SectionWrapper';

interface MovesStatProps {
  pokemon: Pokemon;
}


const NR_OF_MOVES_TO_SHOW = 4;

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

  const displayedMoves = isExpanded ? allLevelUpMoves : allLevelUpMoves.slice(0, NR_OF_MOVES_TO_SHOW);
  const hasMoreMoves = allLevelUpMoves.length > NR_OF_MOVES_TO_SHOW;

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <SectionWrapper title="Moves (Level Up)">
      <div className={styles.moves}>
        {displayedMoves.map((move, index) => (
          <div key={index} className={styles.move}>
            <div className={styles.moveMarker}></div>
            <span className={styles.moveName}>{move.name}</span>
            <span className={styles.moveMethod}>
              {"Lv. " + move.level}
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
    </SectionWrapper>
  );
}

export default MovesStat;
