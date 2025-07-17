import type { FC } from 'react';
import styles from './Projects.module.css';

export type ProjectProps = {
  title: string;
  status: string;
  link?: string;
  description: string;
  features: string[];
};

const Project: FC<ProjectProps> = ({ title, status, link, description, features }) => {
  return (
    <div className={styles.projectItem}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <span className={styles.projectStatus}>[{status}]</span>
        {link && (
          <a href={link} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
            [link]
          </a>
        )}
      </div>
      <p className={styles.projectDescription}>{description}</p>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
