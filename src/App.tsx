import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/editor';
import About from './pages/chemical';
import NotFound from './pages/unity';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

