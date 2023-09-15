import {useForm} from 'react-hook-form'
import { User } from '../models/user'
import { SignUpCredentials } from '../network/user_api'
import * as UserApi from '../network/user_api'
import { Modal, Form, Button} from 'react-bootstrap'

interface CreateAccountModalProps{
    onDismiss: () => void,
    onSignUpSuccessful: (user:User) => void,
}

const CreateAccountModal = ({onDismiss, onSignUpSuccessful}:CreateAccountModalProps) =>{
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>()
    async function onSubmit(credentials: SignUpCredentials){
        try{
            const newUser = await UserApi.createAccount(credentials)
            onSignUpSuccessful(newUser)
        }catch(error){
            alert(error)
            console.error(error)
        }
    }
    return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Create Account
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="addEditProjectForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Username"
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

                <Button type='submit' disabled={isSubmitting}>Sign Up</Button>
            </Form>
        </Modal.Body>
        
    </Modal>
    )
}
export default CreateAccountModal