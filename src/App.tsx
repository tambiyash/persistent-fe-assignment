import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import NotFound from './pages/NotFound';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
