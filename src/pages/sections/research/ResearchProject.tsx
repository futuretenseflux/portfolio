import type { FC } from 'react';
import styles from './Research.module.css';

export type ResearchProjectProps = {
  title: string;
  status: string;
  link?: string;
  description: string;
  keyPoints: string[];
};

const ResearchProject: FC<ResearchProjectProps> = ({ 
  title, 
  status, 
  link, 
  description, 
  keyPoints 
}) => {
  return (
    <div className={styles.researchItem}>
      <div className={styles.researchHeader}>
        <h3 className={styles.researchTitle}>{title}</h3>
        <span className={styles.researchStatus}>[{status}]</span>
        {link && (
          <a href={link} className={styles.researchLink} target="_blank" rel="noopener noreferrer">
            [link]
          </a>
        )}
      </div>
      <p className={styles.researchDescription}>{description}</p>
      <ul className={styles.keyPointsList}>
        {keyPoints.map((point, index) => (
          <li key={index} className={styles.keyPointItem}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchProject;
