import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/pageLayout";

// PAGES
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Event from "./pages/Event.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
            </PageLayout>
          }
        />
        <Route
          path="/event"
          element={
            <PageLayout>
              <Event />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
