import './App.css';
import { Nav } from './components/Nav';
import { ProductsContainer } from './components/ProductsContainer';
import { LoginBar } from './components/LoginBar';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { Hero } from './components/Hero';
import { LandingPage } from './components/LandingPage';
import { ProductDetails } from './components/ProductDetails';

function App() {
  const [query, setQuery] = useState('');
  const [pageState, setPageState] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <LoginBar />
      <Nav setQuery={setQuery} setPageState={setPageState} />
      <Hero />
      {pageState === 'landing' && <LandingPage setPageState={setPageState} />}
      {pageState === 'products' && (
        <ProductsContainer
          setSelectedProduct={setSelectedProduct}
          query={query}
          selectedProduct={selectedProduct}
          setPageState={setPageState}
        />
      )}
      {pageState === 'detailed' && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onBack={() => {
            setSelectedProduct(null);
            setPageState('products');
          }}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
