import ResearchProject from './ResearchProject';

const Research = () => {
  const researchProjects = [
    {
      title: "Neural Network Latent-Space Reconstruction + Model Search",
      status: "Ongoing",
      link: undefined,
      description: "I am developing a model that can encode and reconstruct complex, arbitrary neural networks in a latent space, enabling principled latent-space transformations that reliably decode to valid networks. I’m exploring how these structured mutations can be leveraged for efficient model search.",
      keyPoints: [
        "Learning representations that encode arbitrary neural network architectures and parameters",
        "Reconstructing valid networks from latent embeddings with minimal loss in function",
        "Designing latent-space mutations that preserve validity while enabling exploration",
        "Using latent edits for efficient model search and architecture/weight optimization",
        "Evaluating mutation operators for stability, diversity, and downstream performance"
      ]
    }
  ];

  return (
    <div>
      {researchProjects.map((project, index) => (
        <ResearchProject
          key={index}
          title={project.title}
          status={project.status}
          link={project.link}
          description={project.description}
          keyPoints={project.keyPoints}
        />
      ))}
    </div>
  );
};

export default Research;
