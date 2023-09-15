import { Navbar, Container, Nav } from "react-bootstrap";
import { User } from "../../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="secondary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>About Michael Katsaros</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
                {loggedInUser
                ? <NavBarLoggedInView user = {loggedInUser} onLogOutSuccessful={onLogoutSuccessful}/>
                : <NavBarLoggedOutView onLogInClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                }
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
