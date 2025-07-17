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
    
    dividerRef.current.innerHTML = '';
    
    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement('span');
      dot.className = styles.dot;
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      const opacity = Math.random() * 0.5 + 0.2; // Random opacity between 0.2 and 0.7
      dot.style.opacity = opacity.toString();
      dividerRef.current.appendChild(dot);
    }
  }, []);

  return <div ref={dividerRef} className={styles.divider}></div>;
};

export default Divider;
