import { useState } from 'react';
import styles from './MovesStat.module.css';
import type { Pokemon } from "../types/pokemon";

interface MovesStatProps {
  pokemon: Pokemon;
}


function MovesStat({ pokemon }: MovesStatProps) {
  const [movesToShow, setMovesToShow] = useState(6);
  
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

  // Slice to show only the requested amount
  const displayedMoves = allLevelUpMoves.slice(0, movesToShow);
  const hasMoreMoves = allLevelUpMoves.length > movesToShow;

  const loadMoreMoves = () => {
    setMovesToShow(prev => prev + 6);
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
        <button className={styles.loadMoreButton} onClick={loadMoreMoves}>
          Show more moves
        </button>
      )}
    </div>
  );
}

export default MovesStat;
