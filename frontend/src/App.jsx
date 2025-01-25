import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AuthLayout from "./layouts/AuthLayout";
import PageLayout from "./layouts/pageLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PageLayout>
            <Home />
          </PageLayout>
        }/>
      </Routes>
    </Router>
  );
}

export default App
