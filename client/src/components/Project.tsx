import styles from '../styles/Project.module.css'
import { Card } from "react-bootstrap"
import { Project as ProjectModel } from "../models/project"

interface ProjectProps {
    project: ProjectModel,
}

const Project = ({project} : ProjectProps) => {
    const {
        title,
        month,
        year,
        description,
        github,
    } = project

    return (<>
    <Card className={styles.projectCard}>
        <Card.Body>
            <Card.Title>
                <div style={{float: 'left'}}>{title}</div>
                <div style={{textAlign: 'right'}}>Created {month} {year}</div>
                </Card.Title>
            <Card.Text className={styles.cardText}>Description: <br/>{description}</Card.Text>
            {github === ''
            ? (<></>)
            : <Card.Link href={"http://" + github}>{github}</Card.Link>}
            
        </Card.Body>
    </Card>
        
   
    </>)
}

export default Project