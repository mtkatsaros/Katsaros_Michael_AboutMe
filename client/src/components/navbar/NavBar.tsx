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

const root = "http://localhost:5173"

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar className="nav" variant="dark" data-bs-theme="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand style={{color: "lightblue"}}>About Michael Katsaros</Navbar.Brand>
        <Nav>
          <Nav.Link href={root}>Home</Nav.Link>
          <Nav.Link href={`${root}/projects`}>Projects</Nav.Link>
        </Nav>
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
