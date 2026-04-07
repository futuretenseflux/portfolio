import { useRef } from 'react';
import HomeSection from './sections/home/HomeSection';
import Section from '../components/Section';
import Divider from '../components/Divider';
import IntroLetter from './sections/about/About';
import ProjectsContent from './sections/projects/Projects';
import ResearchContent from './sections/research/Research';
import LinksContent from './sections/links/Links';
import styles from './Home.module.css';

const Home = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);

  const baseUrl = import.meta.env.BASE_URL;

  const footerWaveY = 40;
  const footerWaveAmplitude = 4;
  const footerWaveSegmentWidth = 16;

  const footerWavePath = (() => {
    const width = 1000;
    const segments = Math.ceil(width / footerWaveSegmentWidth);

    let d = `M 0 ${footerWaveY}`;
    for (let i = 0; i < segments; i++) {
      const x1 = i * footerWaveSegmentWidth + footerWaveSegmentWidth / 2;
      const y1 = i % 2 === 0 ? footerWaveY - footerWaveAmplitude : footerWaveY + footerWaveAmplitude;
      const x2 = Math.min(width, (i + 1) * footerWaveSegmentWidth);
      const y2 = footerWaveY;
      d += ` Q ${x1} ${y1} ${x2} ${y2}`;
    }

    return d;
  })();

  const scrollToSection = (section: string) => {
    switch(section) {
      case 'about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'research':
        researchRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'github':
        linksRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'journal':
        linksRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeSectionContainer}>
        <HomeSection scrollToSection={scrollToSection} />
      </div>
      
      <Section id="about" title={null} ref={aboutRef}>
        <IntroLetter />
      </Section>
      
      <Divider />
      
      <Section id="projects" title="projects" ref={projectsRef}>
        <ProjectsContent />
      </Section>
      
      <Divider />
      
      <Section id="research" title="research" ref={researchRef}>
        <ResearchContent />
      </Section>
      
      <Divider />
      
      <Section id="links" title={null} ref={linksRef}>
        <LinksContent />
      </Section>
      
      <div className={styles.footerImageContainer}>
        <svg
          className={styles.footerWaveSvg}
          viewBox="0 0 1000 420"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          focusable="false"
        >
          <defs>
            <clipPath id="footerWaveClip">
              <path d={`${footerWavePath} L 1000 420 L 0 420 Z`} />
            </clipPath>
          </defs>

          <path
            className={styles.footerWavePath}
            d={footerWavePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <image
            href={`${baseUrl}assets/m1.jpg`}
            clipPath="url(#footerWaveClip)"
            width="1000"
            height="420"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
