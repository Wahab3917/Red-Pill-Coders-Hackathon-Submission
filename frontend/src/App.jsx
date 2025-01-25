import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/pageLayout";

// PAGES
import Home from "./pages/home";
import About from "./pages/About";
import Event from "./pages/Event.jsx";
import Project from "./pages/Project.jsx";
import Login from "./pages/UserLogin";
import Signup from "./pages/UserSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PageLayout>
            <Home />
          </PageLayout>
        }/>
        <Route path="/about" element={
          <PageLayout>
            <About />
          </PageLayout>
        }/>
        <Route
          path="/events"
          element={
            <PageLayout>
              <Event />
            </PageLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PageLayout>
              <Project />
            </PageLayout>
          }
        />
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }/>
        <Route path="/signup" element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
