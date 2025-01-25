import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/pageLayout";

// PAGES
import Home from "./pages/home";
import About from "./pages/About";

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
      </Routes>
    </Router>
  );
}

export default App;
