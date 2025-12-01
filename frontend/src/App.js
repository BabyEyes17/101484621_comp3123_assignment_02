import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";


function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/employees"
          element={
            <RequireAuth>
              <EmployeeList />
            </RequireAuth>
          }
        />

        <Route
          path="/employees/add"
          element={
            <RequireAuth>
              <AddEmployee />
            </RequireAuth>
          }
        />

        <Route
          path="/employees/:id/edit"
          element={
            <RequireAuth>
              <EditEmployee />
            </RequireAuth>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <RequireAuth>
              <EmployeeDetails />
            </RequireAuth>
          }
        />

      </Routes>

    </Router>
  );
}


export default App;
