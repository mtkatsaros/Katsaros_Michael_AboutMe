import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import Project from "./Project";
import { Row, Button, Spinner } from "react-bootstrap";
import * as ProjectsApi from "../network/project_api";
import AddEditProjectDialog from "./AddEditProjectDialog";

const ProjectsPageAdminView = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [showProjectsLoadingError, setShowProjectsLoadingError] =
    useState(false);

  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectModel | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setShowProjectsLoadingError(false);
        setProjectsLoading(true);
        const fetchedProjects = await ProjectsApi.fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error(error);
        setShowProjectsLoadingError(true);
      } finally {
        setProjectsLoading(false);
      }
    }      
    loadProjects();
  }, []);

  const projectsGrid = (
    <Row className="g-2">
      {projects.map((project) => (
        <Project
          project={project}
          key={project._id}
          onProjectClicked={setProjectToEdit}
          onDeleteProjectClicked={deleteProject}
          isAdmin={true}
        />
      ))}
    </Row>
  );

  async function deleteProject(project: ProjectModel) {
    try {
      setShowProjectsLoadingError(false);
      setProjectsLoading(true);
      await ProjectsApi.deleteProject(project._id);
      setProjects(
        projects.filter(
          (existingProject) => existingProject._id !== project._id
        )
      );
    } catch (error) {
      console.error(error);
      setShowProjectsLoadingError(true);
    } finally {
      setProjectsLoading(false);
    }
  }

  return (
    <>
        <Button
          style={{float: "right", marginTop: "10px"}}
          variant="light"
          className="button"
          onClick={() => setShowAddProjectDialog(true)}
        >
          Add New Project
        </Button>
        <h1 style={{ color: "lightblue", marginTop: "10px"}}>Projects</h1>
        {projectsLoading && <Spinner animation="border" variant="primary" />}
        {showProjectsLoadingError && (
          <p>Something went wrong. Please refresh the page</p>
        )}
        {!projectsLoading && !showProjectsLoadingError && (
          <>{projects.length > 0 ? projectsGrid : <p>No projects found.</p>}</>
        )}

        {showAddProjectDialog && (
          <AddEditProjectDialog
            onDismiss={() => setShowAddProjectDialog(false)}
            onProjectSubmitted={(newProject) => {
              setProjects([...projects, newProject]);
              setShowAddProjectDialog(false);
            }}
          />
        )}
        {projectToEdit && (
          <AddEditProjectDialog
            projectToEdit={projectToEdit}
            onDismiss={() => setProjectToEdit(null)}
            onProjectSubmitted={(updatedProject) => {
              setProjects(
                projects.map((existingProject) =>
                  existingProject._id === updatedProject._id
                    ? updatedProject
                    : existingProject
                )
              );
              setProjectToEdit(null);
            }}
          />
        )}
      
    </>
  );
};

export default ProjectsPageAdminView;
