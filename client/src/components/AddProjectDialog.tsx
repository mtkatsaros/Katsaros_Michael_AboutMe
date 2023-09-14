import { Modal, Form, Button } from "react-bootstrap"
import { Project } from "../models/project"
import { useForm } from "react-hook-form"
import { ProjectInput } from "../network/project_api"
import * as ProjectApi from '../network/project_api'


interface AddProjectDialogProps{
    onDismiss: () => void,
    onProjectSubmitted: (project: Project) => void,
}

const AddProjectDialog = ({onDismiss, onProjectSubmitted}: AddProjectDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ProjectInput>()

    async function onSubmit(input: ProjectInput){
        try{
            const projectResponse = await ProjectApi.createProject(input)
            onProjectSubmitted(projectResponse)
        }catch(error){
            console.log(error)
            alert(error)
        }
    }
       
    return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Project
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addProjectForm" onSubmit={handleSubmit(onSubmit)}>
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
            type="submit"
            form="addProjectForm"
            disabled={isSubmitting}
            >
                Add Project
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default AddProjectDialog