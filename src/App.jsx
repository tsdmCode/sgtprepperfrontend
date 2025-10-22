import './App.css';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { ProductsContainer } from './components/products';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('http://localhost:4000/api/products/vand-og-vandrensning');

  return (
    <>
      <Nav setQuery={setQuery} />
      <Header />
      <ProductsContainer query={query} />
    </>
  );
}

export default App;
