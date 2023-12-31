import { useState } from "react"
import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { LogInCredentials } from "../network/user_api"
import * as UserApi from '../network/user_api'
import { Modal, Form, Button, Alert } from "react-bootstrap"


interface LoginModalProps{
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LogInCredentials>()
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    async function onSubmit(credentials: LogInCredentials){
        try{
            const user = await UserApi.login(credentials)
            const userString = JSON.stringify(user)
            localStorage.setItem('loggedInUser', userString);
            onLoginSuccessful(user)
        }catch(error){
            setShowErrorAlert(true)
            console.error(error)
        }
    }

    return (
    <Modal show onHide={onDismiss} dialogClassName="dark-modal">
        {showErrorAlert && <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>Error logging in. Please try again.</Alert>}
        <Modal.Header closeButton closeVariant="white">
            <Modal.Title>
                Log in
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="addEditProjectForm" onSubmit={handleSubmit(onSubmit)}>
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
                        Log in
                </Button>
            </Form>
        </Modal.Body>
        
    </Modal>
    )
}

export default LoginModal