import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Customer from './containers/web';
import Admin from './containers/admin';

import "bootstrap/dist/css/bootstrap.min.css";
import './css/index.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Customer />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
