import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: string | null;
  children: ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, title, children }, ref) => {
  return (
    <section id={id} ref={ref} className={styles.section}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
});

export default Section;
