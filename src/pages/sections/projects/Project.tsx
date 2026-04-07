import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties, FC, MouseEvent } from 'react';
import styles from './Projects.module.css';

const rotationFromSrc = (src: string) => {
  let hash = 0;
  for (let i = 0; i < src.length; i++) {
    hash = (hash * 31 + src.charCodeAt(i)) | 0;
  }
  const t = Math.abs(hash) % 1000;
  return (t / 1000) * 8 - 4;
};

export type ProjectProps = {
  title: string;
  status: string;
  link?: string;
  description: string;
  features: string[];
  images?: string[];
};

const Project: FC<ProjectProps> = ({ title, status, link, description, features, images }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageOffsets, setImageOffsets] = useState<Record<string, { x: number; y: number }>>({});

  const closeLightbox = useCallback(() => {
    setActiveImage(null);
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeImage, closeLightbox]);

  const onThumbMove = useCallback((src: string, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
    const max = 10;

    setImageOffsets((prev) => ({
      ...prev,
      [src]: { x: nx * max, y: ny * max }
    }));
  }, []);

  const onThumbLeave = useCallback((src: string) => {
    setImageOffsets((prev) => ({
      ...prev,
      [src]: { x: 0, y: 0 }
    }));
  }, []);

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
      {images && images.length > 0 && (
        <div className={styles.projectImages}>
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className={styles.projectThumb}
              onMouseMove={(e) => onThumbMove(src, e)}
              onMouseLeave={() => onThumbLeave(src)}
              onClick={() => setActiveImage(src)}
              aria-label={`Open image ${index + 1} for ${title}`}
              style={
                {
                  ['--tx' as never]: `${imageOffsets[src]?.x ?? 0}px`,
                  ['--ty' as never]: `${imageOffsets[src]?.y ?? 0}px`,
                  ['--r' as never]: `${rotationFromSrc(src)}deg`
                } as CSSProperties
              }
            >
              <img
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                className={styles.projectImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>{feature}</li>
        ))}
      </ul>

      {activeImage && (
        <div className={styles.lightboxOverlay} role="dialog" aria-modal="true" onMouseDown={closeLightbox}>
          <div className={styles.lightboxContent} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              ×
            </button>
            <img src={activeImage} alt={`${title} enlarged`} className={styles.lightboxImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
