import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {}
        <Route path="/" element={<Login />} />
        
        {}
        <Route path="/success" element={<Success />} />
        
        {}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;