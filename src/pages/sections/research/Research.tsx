import ResearchProject from './ResearchProject';

const Research = () => {
  const researchProjects = [
    {
      title: "Formal Verification in Generated Reinforcement Learning Environments",
      status: "Ongoing",
      link: undefined,
      description: "Investigating methodologies for applying formal verification techniques to procedurally generated environments in reinforcement learning to ensure safety properties and behavioral guarantees across environment variations.",
      keyPoints: [
        "Developing mathematical frameworks for specifying invariant properties in dynamic RL environments",
        "Exploring compositional verification approaches for environment generation rules",
        "Implementing runtime monitoring systems for detecting safety violations during training",
        "Creating benchmark suites for evaluating verification robustness across environment distributions",
        "Analyzing theoretical bounds on verification completeness in non-deterministic settings"
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
