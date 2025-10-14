import styles from './PokemonStat.module.css';

interface StatItem {
  title: string;
  subtitle: string;
}

interface PokemonStatProps {
  stats: StatItem[];
}

function PokemonStat({ stats }: PokemonStatProps) {
  return (
    <div className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statItem}>
          <span className={styles.title}>{stat.title}</span>
          <span className={styles.subtitle}>{stat.subtitle}</span>
        </div>
      ))}
    </div>
  );
}

export default PokemonStat;
