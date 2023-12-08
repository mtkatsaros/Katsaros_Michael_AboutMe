import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps{
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
}

const NavBarLoggedOutView = ({onSignUpClicked, onLogInClicked}: NavBarLoggedOutViewProps) => {
    return (
        <>
        <Button variant="light" style={{marginRight: "2px"}} className="button" onClick={onSignUpClicked}>Sign up</Button>
        <Button variant="light" className="button" onClick={onLogInClicked}>Log in</Button>
        </>
    )
}

export default NavBarLoggedOutView