import styles from '../styles/Project.module.css'
import { Card } from "react-bootstrap"
import { Project as ProjectModel } from "../models/project"
import {MdDelete} from 'react-icons/md'

interface ProjectProps {
    project: ProjectModel,
    onProjectClicked: (project: ProjectModel) => void,
    onDeleteProjectClicked: (project: ProjectModel)=> void,
    className?: string,
    isAdmin: boolean,
}

const Project = ({project, onProjectClicked, onDeleteProjectClicked, className, isAdmin} : ProjectProps) => {
    const {
        title,
        date,
        description,
        github,
    } = project

    return (<>
    <Card 
        className={`${styles.projectCard} ${className}`}
        onClick={() => onProjectClicked(project)}>
        <Card.Body>
            {isAdmin && (
                <div style={{textAlign: 'right'}}>
                    <MdDelete 
                    className={'ms-auto'}
                    onClick={() => {
                        onDeleteProjectClicked(project)
                    }}
                    />  
                </div>
               

            )}
            
            <Card.Title>
                <div style={{float: 'left'}}>{title}</div>
                <div style={{textAlign: 'right'}}>Created {date}</div>
                
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