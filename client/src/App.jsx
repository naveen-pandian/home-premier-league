import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Router basename="/home-premier-league">
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    );
}

export default App;
