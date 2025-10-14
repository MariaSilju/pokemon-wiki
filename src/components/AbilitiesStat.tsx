import styles from './AbilitiesStat.module.css';
import type { Pokemon } from "../types/pokemon";

interface AbilitiesStatProps {
  pokemon: Pokemon;
}

function AbilitiesStat({ pokemon }: AbilitiesStatProps) {
  const abilities = pokemon.abilities.filter(ability => !ability.is_hidden);
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Abilities</h3>
      <div className={styles.abilities}>
        {abilities.map((ability, index) => (
          <div key={index} className={styles.ability}>
            {ability.ability.name.replace('-', ' ')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AbilitiesStat;