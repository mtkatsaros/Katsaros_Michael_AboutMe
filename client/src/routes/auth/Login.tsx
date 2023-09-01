import { useState } from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom"
import { login } from '../../api/Authenticate'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    /**
     * @function handleCreateAccount
     * @description navigates the user to the create account page
     * using react router dom
     */
    function handleCreateAccount(){
        navigate('/create')
    }

    /**
     * @function handleLogin
     * @description Logs the user in if credentials are correct, 
     * otherwise sends back respective errors
     */
    async function handleLogin(e:React.FormEvent){
        e.preventDefault()
        const result = await login(email, password)
        if(result === 'email'){
            alert("Invalid username or password")
            setEmail('')
            setPassword('') 
        }
        else if (result === 'password'){
            alert("Invalid password")
            setPassword('')
        }
        else{
            //TODO: add the current user
            navigate('/')
        }
    }
    return (<>
        <h1>Log in</h1>
        <label className="create" onClick={handleCreateAccount}>Create Account</label>
       
        <form onSubmit={handleLogin}>
            <ul>
                <li>
                    <label>Email</label>
                   <input 
                    type="email"
                    id="account-email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setEmail(e.target.value)
                    }}>
                    </input> 
                </li>
                <li>
                    <label>Password</label>
                   <input 
                    type="password"
                    id="account-password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setPassword(e.target.value)
                    }}>
                    </input> 
                </li>
            </ul>
            <br/>
            <button onClick={handleLogin}>Sign in</button>
        </form>
        
    </>)
}

export default Login