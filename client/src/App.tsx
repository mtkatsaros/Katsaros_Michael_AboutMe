import { useEffect, useState } from "react";
import { Project as ProjectModel } from "./models/project";
import Project from "./components/Project";
import { Container, Row } from "react-bootstrap";
import * as ProjectsApi from "./network/project_api";

function App() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await ProjectsApi.fetchProjects()
        setProjects(fetchedProjects);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadProjects();
  }, []);

  return (
    <>
      <Container className="Projects">
        <h1 style={{ color: "lightblue" }}>Projects</h1>
        <Row className="g-2">
          {projects.map((project) => (
            <Project project={project} key={project._id} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
