import { BrowserRouter as Router, Routes, Route } from "react-router";

import { ProtectedRoute } from "./components/custom/protected-route";
import HomePage from "./pages/home";
import ContactsPage from "./pages/contacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
