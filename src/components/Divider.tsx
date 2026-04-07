import { useEffect, useRef } from 'react';
import styles from './Divider.module.css';

const Divider = () => {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dividerRef.current) return;
    
    const dividerWidth = dividerRef.current.offsetWidth;
    const dotSize = 3; // Dot size in pixels
    const spacing = 12; // Space between dots in pixels
    const numberOfDots = Math.floor(dividerWidth / spacing);
    
    const height = 10;
    const midY = height / 2;
    const amplitude = 3;
    const segmentWidth = Math.max(8, spacing);
    const segments = Math.max(1, numberOfDots);

    let d = `M 0 ${midY}`;
    for (let i = 0; i < segments; i++) {
      const x1 = i * segmentWidth + segmentWidth / 2;
      const y1 = i % 2 === 0 ? midY - amplitude : midY + amplitude;
      const x2 = (i + 1) * segmentWidth;
      const y2 = midY;
      d += ` Q ${x1} ${y1} ${x2} ${y2}`;
    }

    dividerRef.current.innerHTML = `
      <svg
        viewBox="0 0 ${dividerWidth} ${height}"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        focusable="false"
      >
        <path
          d="${d}"
          fill="none"
          stroke="currentColor"
          stroke-width="${dotSize}"
          stroke-linecap="round"
        />
      </svg>
    `;
  }, []);

  return <div ref={dividerRef} className={styles.divider}></div>;
};

export default Divider;
