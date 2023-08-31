import './Login.css'
import { useNavigate } from "react-router-dom"

function Login(){
    const navigate = useNavigate()
    function handleCreateAccount(){
        navigate('/create')
    }
    return (<>
        <h1>Login page</h1>
        <label className="create" onClick={handleCreateAccount}>Create Account</label>
    </>)
}

export default Login