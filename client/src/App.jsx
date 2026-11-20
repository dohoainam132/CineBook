import { Routes, Route } from 'react-router';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Login from './pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;