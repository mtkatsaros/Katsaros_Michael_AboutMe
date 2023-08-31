import { useNavigate } from "react-router-dom"


function AccountCreateSuccess(){
    const navigate = useNavigate()
    function handleNavigate(){
        navigate('/login')
    }

    return (
        <>
        <h1>Success!</h1>
        <label>Account creation successful. You can now login to your new account.</label>
        <br/><br/>
        <button onClick={handleNavigate}>Return to Login</button>
        </>
    )
}
export default AccountCreateSuccess