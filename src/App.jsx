import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <p>Course Selling Application</p>
      <Router>
        <div style={styles.navbar}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <hr />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    background: '#eee',
  },
};

export default App