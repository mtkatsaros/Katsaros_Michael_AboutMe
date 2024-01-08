import { useState } from 'react'
import {useForm} from 'react-hook-form'
import { User } from '../models/user'
import { SignUpCredentials } from '../network/user_api'
import * as UserApi from '../network/user_api'
import { Modal, Form, Button, Alert} from 'react-bootstrap'

interface CreateAccountModalProps{
    onDismiss: () => void,
    onSignUpSuccessful: (user:User) => void,
}

const CreateAccountModal = ({onDismiss, onSignUpSuccessful}:CreateAccountModalProps) =>{
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>()
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    async function onSubmit(credentials: SignUpCredentials){
        try{
            const newUser = await UserApi.createAccount(credentials)
            const userString = JSON.stringify(newUser)
            localStorage.setItem('loggedInUser', userString);
            onSignUpSuccessful(newUser)
        }catch(error){
            setShowErrorAlert(true)
            console.error(error)
        }
    }
    return (
    <Modal show onHide={onDismiss} dialogClassName="dark-modal">
        {showErrorAlert && <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>Error creating account. Please try again.</Alert>}
        <Modal.Header closeButton closeVariant='white'>
            <Modal.Title>
                Create Account
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="addEditProjectForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="ex: John Doe"
                        isInvalid={!!errors.username}
                        {...register('username', {required: "Required"})}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email" 
                        placeholder="Email"
                        isInvalid={!!errors.email}
                        {...register('email', {required: "Required"})}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Password"
                        isInvalid={!!errors.password}
                        {...register('password', {required: "Required"})}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button 
                    variant="light"
                    className="button" 
                    type='submit' 
                    disabled={isSubmitting}>
                        Sign Up
                </Button>
            </Form>
        </Modal.Body>
        
    </Modal>
    )
}
export default CreateAccountModal