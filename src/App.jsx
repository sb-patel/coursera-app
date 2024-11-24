import Login from './Admin/Login';
import Signup from './Admin/Signup';
import HomePage from './Admin/HomePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Navbar from './Admin/Navbar';

// Create an Auth Context to share login status
export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div>
        <p>Course Selling Application</p>
        <Router>
          <Navbar></Navbar>

          <hr />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App