import { Navbar, Button } from "react-bootstrap";
import { User } from "../../models/user";
import * as UserApi from '../../network/user_api'

interface NavBarLoggedInViewProps{
    user: User,
    onLogOutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogOutSuccessful}: NavBarLoggedInViewProps) => {
    
    async function logout(){
        try{
            await UserApi.logout()
            localStorage.removeItem('loggedInUser')
            onLogOutSuccessful()
        }catch(error){
            alert(error)
            console.error(error)
        }
    }

    return (
    <>
    <Navbar.Text className="me-2">
        Signed in as {user.username}
    </Navbar.Text>
    <Button variant="light" className="button" onClick={logout}>Log out</Button>
    </>
    )
}

export default NavBarLoggedInView