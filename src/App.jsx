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
  const [pageState, setPageState] = useState('landing');

  return (
    <>
      <LoginBar />
      <Nav setQuery={setQuery} setPageState={setPageState} />
      <Hero />
      {pageState === 'landing' && <LandingPage />}
      {pageState === 'products' && <ProductsContainer query={query} />}
      <Footer />
    </>
  );
}

export default App;
