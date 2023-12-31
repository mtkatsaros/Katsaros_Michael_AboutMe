import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps{
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
}

const NavBarLoggedOutView = ({onSignUpClicked, onLogInClicked}: NavBarLoggedOutViewProps) => {
    return (
        <div className="d-grid gap-2 d-md-block">
        <Button variant="light" style={{marginRight: "4px"}} className="button" onClick={onSignUpClicked}>Sign up</Button>
        <Button variant="light" style={{marginRight: "4px"}} className="button" onClick={onLogInClicked}>Log in</Button>
        </div>
    )
}

export default NavBarLoggedOutView