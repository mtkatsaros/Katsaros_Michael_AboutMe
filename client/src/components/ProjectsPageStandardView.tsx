import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import Project from "./Project";
import { Container, Row } from "react-bootstrap";
import * as ProjectsApi from "../network/project_api";

const ProjectsPageStandardView = () => {
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
        <h1 style={{ color: "lightblue", marginTop: "10px" }}>Projects</h1>
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
        </Container>
    </>
    );
}

export default ProjectsPageStandardView