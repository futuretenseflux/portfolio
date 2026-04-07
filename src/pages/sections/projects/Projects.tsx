import Project from './Project';

const Projects = () => {
  const projectsList = [
    {
      title: "LLM From Scratch (0.5B + 1B)",
      status: "Completed",
      link: "https://github.com/futuretenseflux/llm-v0",
      description: "Built and trained two large language models from scratch (0.5B and 1B parameters), including pretraining, supervised fine-tuning (SFT), and RL-based post-training. Optimized for math, science, and reasoning.",
      features: [
        "Implemented the full training pipeline end-to-end (pretraining, SFT, RL post-training)",
        "Trained two model sizes: 0.5B and 1B parameters",
        "Used RoPE and continued context-length extension training",
        "Implemented Flash Attention for faster and more memory-efficient training",
        "Trained with the Muon optimizer",
        "Applied curriculum training and other modern training techniques",
        "Post-training focused on improved reasoning and STEM performance",
        "Emphasis on math/science problem-solving and multi-step reasoning"
      ]
    },
    {
      title: "AI-Powered Second Brain + Tutor",
      status: "Deployed",
      description: "An intelligent note-taking application with an inbuilt research/tutor agent that enhances knowledge management and learning experience.",
      images: [
        "/assets/projects/notes/1.jpg",
        "/assets/projects/notes/2.jpg",
        "/assets/projects/notes/3.jpg",
        "/assets/projects/notes/4.jpg"
      ],
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
      description: "Platform to benchmark AI models through competitive evaluation in game arenas and simulations, providing standardized metrics for model performance.",
      images: [
        "/assets/projects/arena/5.jpg"
      ],
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
      description: "Autonomous system that processes all research papers published daily and generates personalized feeds based on researcher goals and interests.",
      images: [
        "/assets/projects/rr/rr.jpg"
      ],
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
          images={project.images}
          features={project.features}
        />
      ))}
    </div>
  );
};

export default Projects;
