import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/loginPage";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
