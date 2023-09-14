import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProjectsPage from "./pages/ProjectsPage";

function App() {

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route
            path="/"
            element={<ProjectsPage/>}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
