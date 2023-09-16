import { Container } from "react-bootstrap"
import ProjectsPageAdminView from "../components/ProjectsPageAdminView"
import { User } from "../models/user"
import ProjectsPageStandardView from "../components/ProjectsPageStandardView"

interface ProjectsPageProps{
    loggedInUser: User | null,
}

const ProjectsPage = ({loggedInUser}: ProjectsPageProps) => {
    return (
        <Container>
            {loggedInUser
             ?  <>
                    {loggedInUser?.admin === 'true'
                    ? <ProjectsPageAdminView/> 
                    : <ProjectsPageStandardView/>}
                </>
            
             : <ProjectsPageStandardView/>
            }
            
        </Container>
    )
}

export default ProjectsPage