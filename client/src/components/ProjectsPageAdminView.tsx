import { useEffect, useState } from "react";
import { Project as ProjectModel } from "../models/project";
import Project from "./Project";
import { Container, Row, Button } from "react-bootstrap";
import stylesUtils from '../styles/utils.module.css'
import * as ProjectsApi from "../network/project_api";
import AddEditProjectDialog from "./AddEditProjectDialog";

const ProjectsPageAdminView = () => {
    const [projects, setProjects] = useState<ProjectModel[]>([]);

    const [showAddProjectDialog, setShowAddProjectDialog] = useState(false)
    const [projectToEdit, setProjectToEdit] = useState<ProjectModel|null>(null)


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

    async function deleteProject(project:ProjectModel){
        try{
            await ProjectsApi.deleteProject(project._id)
            setProjects(projects.filter(existingProject => existingProject._id !== project._id))
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    return (
    <>
        <Container className="Projects">
        <h1 style={{ color: "lightblue", marginTop: "10px"}}>Projects</h1>    
        <Button 
            className={`mb-3 ${stylesUtils.blockCenter}`}
            onClick={() => setShowAddProjectDialog(true)}
        >
            Add New Project
        </Button>
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
        {showAddProjectDialog && 
            <AddEditProjectDialog 
                onDismiss={() => setShowAddProjectDialog(false)}
                onProjectSubmitted={(newProject)=>{
                    setProjects([...projects, newProject])
                    setShowAddProjectDialog(false)}}
            />}
        {projectToEdit &&
            <AddEditProjectDialog
                projectToEdit={projectToEdit}
                onDismiss={() => setProjectToEdit(null)}
                onProjectSubmitted={(updatedProject) => {
                    setProjects(projects.map(existingProject => existingProject._id === updatedProject._id ? updatedProject : existingProject))
                    setProjectToEdit(null)
                }}
            />
        }
        </Container>
    </>
    );
}

export default ProjectsPageAdminView