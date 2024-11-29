import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './pages/editor';
import About from './pages/chemical';
import Home from './pages/home';
import NotFound from './pages/unity';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

