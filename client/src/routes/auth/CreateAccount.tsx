import { useState } from "react"
import { createAccount } from "../../api/Authenticate"
import { useNavigate } from "react-router-dom"

function CreateAccount(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigate = useNavigate()

    async function handleCreate(e:React.FormEvent){
        e.preventDefault()
        if(password === passwordConfirm){
            await createAccount(username, email, password)
            navigate('/create/success')
        } 
        setPassword('')
        setPasswordConfirm('')
    }

    return (<>
    <h1>Create Account</h1>
    <div className="create">
        <form onSubmit={handleCreate}>
            <ul>
                <li>
                    <label>Username</label>
                   <input 
                    id="account-user"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setUsername(e.target.value)
                    }}>
                    </input> 
                </li>
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
                <li>
                    <label>Confirm Password</label>
                   <input 
                    type="password"
                    id="account-password_confirm"
                    value={passwordConfirm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setPasswordConfirm(e.target.value)
                    }}>
                    </input> 
                </li>
            </ul>
            <button>Create</button>
            
        </form>
    </div>
    </>)
}

export default CreateAccount