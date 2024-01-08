import { useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { Project } from "../models/project"
import { useForm } from "react-hook-form"
import { ProjectInput } from "../network/project_api"
import * as ProjectApi from '../network/project_api'


interface AddEditProjectDialogProps{
    projectToEdit?: Project,
    onDismiss: () => void,
    onProjectSubmitted: (project: Project) => void,
}

const AddEditProjectDialog = ({projectToEdit, onDismiss, onProjectSubmitted}: AddEditProjectDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ProjectInput>({
        defaultValues: {
            title: projectToEdit?.title || "",
            date: projectToEdit?.date || "",
            description: projectToEdit?.description || "",
            github: projectToEdit?.github || "",
        }
    })
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    async function onSubmit(input: ProjectInput){
        try{
            let projectResponse: Project
            if(projectToEdit){
                projectResponse = await ProjectApi.updateProject(projectToEdit._id, input)
            }
            else{
                projectResponse = await ProjectApi.createProject(input)
            }
            
            onProjectSubmitted(projectResponse)
        }catch(error){
            console.log(error)
            setShowErrorAlert(true)
        }
    }
       
    return (
    <Modal show onHide={onDismiss} dialogClassName="dark-modal">
        {showErrorAlert && <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>An error ocurred. Please try again.</Alert>}
        <Modal.Header closeButton closeVariant="white">
            <Modal.Title>
                {projectToEdit ? "Edit project" : "Add project"}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addEditProjectForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register('title', {required: "Required"})}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Month/Year Created</Form.Label>
                    <Form.Control 
                        type="month"
                        isInvalid={!!errors.date}
                        {...register('date', {required: "Required"})}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                        isInvalid={!!errors.description}
                        {...register('description', {required: "Required"})}
                    />
                    <Form.Control.Feedback>
                        {errors.description?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Github URL</Form.Label>
                    <Form.Control
                        placeholder="github.com/myproject"
                        {...register('github')}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
            variant="light"
            className="button"
            type="submit"
            form="addEditProjectForm"
            disabled={isSubmitting}
            >
                Submit
            </Button>
        </Modal.Footer>
        
    </Modal>)
}

export default AddEditProjectDialog