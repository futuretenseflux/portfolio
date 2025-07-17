import { useRef } from 'react';
import HomeSection from './sections/home/HomeSection';
import Section from '../components/Section';
import Divider from '../components/Divider';
import IntroLetter from './sections/about/About';
import ProjectsContent from './sections/projects/Projects';
import ResearchContent from './sections/research/Research';
import WritingContent from './sections/writing/Writing';
import LinksContent from './sections/links/Links';
import styles from './Home.module.css';

const Home = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);

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
        <img src="/assets/5.webp" alt="Footer image" className={styles.footerImage} />
      </div>
    </div>
  );
};

export default Home;
