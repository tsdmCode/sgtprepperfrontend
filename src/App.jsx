import './App.css';
import { Nav } from './components/Nav';
import { ProductsContainer } from './components/ProductsContainer';
import { LoginBar } from './components/LoginBar';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { Hero } from './components/Hero';
import { LandingPage } from './components/LandingPage';

function App() {
  const [query, setQuery] = useState('');

  return (
    <>
      <LoginBar />
      <Nav setQuery={setQuery} />
      <Hero />
      {query ? <ProductsContainer query={query} /> : <LandingPage />}
      <Footer />
    </>
  );
}

export default App;
