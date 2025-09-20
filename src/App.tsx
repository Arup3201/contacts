import { BrowserRouter as Router, Routes, Route } from "react-router";

import { ProtectedRoute } from "./components/custom/protected-route";
import HomePage from "./pages/home";
import ContactsPage from "./pages/contacts";
import ContactDetailsPage from "./pages/contact-details";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="contacts/:id" element={<ContactDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
