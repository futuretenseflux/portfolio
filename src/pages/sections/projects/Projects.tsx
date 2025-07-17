import Project from './Project';

const Projects = () => {
  const projectsList = [
    {
      title: "AI-Powered Second Brain + Tutor",
      status: "Deployed",
      link: "https://uNe4F9.short.gy/369A9l",
      description: "An intelligent note-taking application with an inbuilt research/tutor agent that enhances knowledge management and learning experience.",
      features: [
        "Full stack development using ReactJS (front-end) and NestJS (back-end)",
        "Custom model trained to map high-dimensional embeddings to 2D/3D semantic space",
        "Graph view with virtualization and lazy loading for knowledge base visualization",
        "Intelligent agent built with LangGraph featuring tools and automatic model routing"
      ]
    },
    {
      title: "Simulation-Based AI Model Ranking Platform",
      status: "In Progress",
      link: "https://uNe4F9.short.gy/htrWBg",
      description: "Platform to benchmark AI models through competitive evaluation in game arenas and simulations, providing standardized metrics for model performance.",
      features: [
        "Competitive evaluation framework in game-theoretic environments",
        "Development of generative environments for RL training",
        "Simulation-based challenges for model assessment",
        "Standardized benchmarking metrics across scenarios"
      ]
    },
    {
      title: "High-Dimensional Embedding to 2D/3D Coordinate Mapping Model",
      status: "Deployed",
      description: "Trained a model for converting high-dimensional embeddings to 2D/3D spatial coordinates incrementally. Preserves local and global relationships while allowing for real-time updates.",
      features: [
        "Topology-preserving mapping functions",
        "Incremental update capability without full recomputation",
        "Adaptive neighborhood preservation",
        "Distortion minimization across scales",
        "Computational efficiency for large datasets"
      ]
    },
    {
      title: "Research Literature Processing Agent",
      status: "Alpha",
      link: "https://uNe4F9.short.gy/km7ZaI",
      description: "Autonomous system that processes all research papers published daily and generates personalized feeds based on researcher goals and interests.",
      features: [
        "Automated paper collection across multiple journals and repositories",
        "Semantic understanding of research content",
        "Personalized relevance scoring",
        "Cross-disciplinary connection identification",
        "Summarization and key insight extraction"
      ]
    }
  ];

  return (
    <div>
      {projectsList.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          status={project.status}
          link={project.link}
          description={project.description}
          features={project.features}
        />
      ))}
    </div>
  );
};

export default Projects;
