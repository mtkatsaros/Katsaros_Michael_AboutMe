import { useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { Review } from "../models/review"
import { useForm } from "react-hook-form"
import { ReviewInput } from "../network/review_api"
import * as ReviewApi from '../network/review_api'
import { User } from "../models/user"


interface AddEditReviewDialogProps{
    loggedInUser: User,
    reviewToEdit?: Review,
    onDismiss: () => void,
    onReviewSubmitted: (review: Review) => void,
}

const AddEditReviewDialog = ({loggedInUser, reviewToEdit, onDismiss, onReviewSubmitted}: AddEditReviewDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ReviewInput>({
        defaultValues: {
            user: loggedInUser.username,
            title: reviewToEdit?.title || "",
            description: reviewToEdit?.description || "",
            uid: loggedInUser.uid,
        }
    })
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    async function onSubmit(input: ReviewInput){
        try{
            let reviewResponse: Review
            if(reviewToEdit){
                reviewResponse = await ReviewApi.updateReview(reviewToEdit._id, input)
            }
            else{
                reviewResponse = await ReviewApi.writeReview(input)
            }
            
            onReviewSubmitted(reviewResponse)
        }catch(error){
            setShowErrorAlert(true)
            console.log(error)
        }
    }
       
    return (
    <Modal show onHide={onDismiss} dialogClassName="dark-modal">
        {showErrorAlert && <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>An error ocurred. Please try again.</Alert>}
        <Modal.Header closeButton closeVariant="white">
            <Modal.Title>
                {reviewToEdit ? "Edit endorsement" : "Write an endorsement"}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addEditReviewForm" onSubmit={handleSubmit(onSubmit)}>
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

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
            variant="light"
            className="button"
            type="submit"
            form="addEditReviewForm"
            disabled={isSubmitting}
            >
                Submit
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default AddEditReviewDialog