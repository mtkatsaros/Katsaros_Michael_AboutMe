import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import Project from "./Project";
import { Container, Row, Button } from "react-bootstrap";
import * as ProjectsApi from "../network/project_api";
import AddProjectDialog from "./AddProjectDialog";

const ProjectsPageAdminView = () => {
    const [projects, setProjects] = useState<ProjectModel[]>([]);

    const [showAddProjectDialog, setShowAddProjectDialog] = useState(false)

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
        <Button 
            className="mb-4"
            onClick={() => setShowAddProjectDialog(true)}
        >
            Add New Project
        </Button>
        <h1 style={{ color: "lightblue" }}>Projects</h1>
        <Row className="g-2">
            {projects.map((project) => (
            <Project project={project} key={project._id} />
            ))}
        </Row>
        {showAddProjectDialog && 
        <AddProjectDialog 
            onDismiss={() => setShowAddProjectDialog(false)}
            onProjectSubmitted={(newProject)=>{
                setProjects([...projects, newProject])
                setShowAddProjectDialog(false)}}
        />}
        </Container>
    </>
    );
}

export default ProjectsPageAdminView