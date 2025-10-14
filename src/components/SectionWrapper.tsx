import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span>{title}</span>
      </h3>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default SectionWrapper;
