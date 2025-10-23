import './App.css';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { ProductsContainer } from './components/products';
import { LoginBar } from './components/LoginBar';
import { Footer } from './components/Footer';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('http://localhost:4000/api/products/vand-og-vandrensning');

  return (
    <>
      <LoginBar />
      <Nav setQuery={setQuery} />
      <Header />
      <ProductsContainer query={query} />
      <Footer />
    </>
  );
}

export default App;
