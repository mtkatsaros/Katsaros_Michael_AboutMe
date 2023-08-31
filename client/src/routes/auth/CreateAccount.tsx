import { useState } from "react"
import { createAccount } from "../../api/Authenticate"

function CreateAccount(){
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    async function handleCreate(e:React.FormEvent){
        e.preventDefault()
        if(password === passwordConfirm){
            await createAccount(user, email, password)
            setUser('')
            setEmail('')
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
                    value={user}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    setUser(e.target.value)
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