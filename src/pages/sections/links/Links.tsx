import styles from './Links.module.css';

const Links = () => {
  return (
    <div className={styles.linksContainer}>
      <ul className={styles.linksList}>
        <li className={styles.linkItem}>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.link}>journal (x)</a>
        </li>
        <li className={styles.linkItem}>
          <a href="https://uNe4F9.short.gy/bLkIr3" target="_blank" rel="noopener noreferrer" className={styles.link}>github</a>
        </li>
      </ul>
    </div>
  );
};

export default Links;
