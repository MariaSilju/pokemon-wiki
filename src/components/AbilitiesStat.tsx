import styles from './AbilitiesStat.module.css';
import type { Pokemon } from "../types/pokemon";
import SectionWrapper from './SectionWrapper';

interface AbilitiesStatProps {
  pokemon: Pokemon;
}

function AbilitiesStat({ pokemon }: AbilitiesStatProps) {
  const abilities = pokemon.abilities.filter(ability => !ability.is_hidden);
  
  return (
    <SectionWrapper title="Abilities">
      <div className={styles.abilities}>
        {abilities.map((ability, index) => (
          <div key={index} className={styles.ability}>
            {ability.ability.name.replace('-', ' ')}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default AbilitiesStat;