import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import Project from "./Project";
import { Row, Spinner } from "react-bootstrap";
import * as ProjectsApi from "../network/project_api";

const ProjectsPageStandardView = () => {
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [showProjectsLoadingError, setShowProjectsLoadingError] = useState(false)


    useEffect(() => {
    async function loadProjects() {
        try {
            setProjectsLoading(true)
            setShowProjectsLoadingError(false)
            const fetchedProjects = await ProjectsApi.fetchProjects()
            setProjects(fetchedProjects);
        } catch (error) {
            console.error(error);
            setShowProjectsLoadingError(true)
        }finally{
            setProjectsLoading(false)
        }
    }
    loadProjects();
    }, []);

    const projectsGrid = 
    <Row className="g-2">
        {projects.map((project) => (
        <Project 
            project={project} 
            key={project._id} 
            onProjectClicked={()=>{}}
            onDeleteProjectClicked={()=>{}}
            isAdmin={false}
            />
        ))}
    </Row>

    return (
    <>
        {projectsLoading && <Spinner animation="border" variant="primary"/>}
        {showProjectsLoadingError && <p>Something went wrong. Please refresh the page</p>}
        {!projectsLoading && !showProjectsLoadingError && 
        <>
        {
            projects.length > 0
            ? projectsGrid
            : <p>No projects found.</p>
        }
        </>
        }
    </>
    );
}

export default ProjectsPageStandardView