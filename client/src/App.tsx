import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/navbar/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as UserApi from './network/user_api'
import CreateAccountModal from "./components/CreateAccountModal";
import LoginModal from "./components/LoginModal";
import AboutPage from "./pages/AboutPage";
import ReviewsPage from "./pages/ReviewsPage"
import NotFoundPage from "./pages/NotFoundPage"



function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    const getUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem('loggedInUser')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setLoggedInUser(parsedUser)
      }
    }

    getUserFromLocalStorage()

    if(!loggedInUser){
      const fetchLoggedInUser = async () => {
        try {
          const user = await UserApi.getLoggedInUser();
          setLoggedInUser(user)
            localStorage.setItem('loggedInUser', JSON.stringify(user))
        } catch (error) {
          console.error(error)
        }
      }
      fetchLoggedInUser()
    }
    setIsLoading(false)

  }, [loggedInUser])

  return (
    <BrowserRouter basename="https://michaeltkatsaros.com">
    
      {!isLoading &&
        <>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
          onSignUpClicked={() => setShowCreateAccountModal(true)}
        />

        <Container>
          <Routes>
            <Route
              path="/"
              element={<AboutPage/>}
            />
            <Route
              path="/projects"
              element={<ProjectsPage loggedInUser={loggedInUser}/>}
            />
            <Route 
              path="/endorsements"
              element={<ReviewsPage loggedInUser={loggedInUser}/>}
            />
            <Route
              path="*"
              element={<NotFoundPage/>}
            />
          </Routes>
        </Container>
        {showCreateAccountModal && (
          <CreateAccountModal
            onDismiss={() => setShowCreateAccountModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user)
              setShowCreateAccountModal(false)
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal 
            onDismiss={() => setShowLoginModal(false)} 
            onLoginSuccessful={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }} 
          />
        )}
        <footer>
          <Container>
            <p style={{fontSize: "smaller", marginTop: "5px"}}>&copy; {new Date().getFullYear()} Michael Katsaros Software</p>
          </Container>
        </footer>
      </>
      }
    </BrowserRouter> 
  )
}

export default App;
