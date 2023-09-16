import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/navbar/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as UserApi from './network/user_api'
import CreateAccountModal from "./components/CreateAccountModal";
import LoginModal from "./components/LoginModal";


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser(){
      try{
        const user = await UserApi.getLoggedInUser()
        setLoggedInUser(user)
      }catch(error){
        console.error(error)
      }
    }
    fetchLoggedInUser()
  })

  return (
    <BrowserRouter>
    

      <div>
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
              element={<ProjectsPage loggedInUser={loggedInUser}/>}
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
      
      </div>
    </BrowserRouter> 
  );
}

export default App;
