import './App.css';
import Login from './login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import User from './user/User'
import Chart from './charts/Chart'

export default (props) => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/users" element={<User />} />
        <Route exact path="/charts" element={<Chart />} />
      </Routes>
    </Router>
  )
}
