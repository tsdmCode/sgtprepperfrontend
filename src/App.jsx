import './App.css';
import { ProductsContainer } from './components/ProductsContainer';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { FullHeader } from './components/FullHeader';

function App() {
  const [query, setQuery] = useState('');
  const [pageState, setPageState] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <FullHeader setQuery={setQuery} setPageState={setPageState} setSelectedProduct={setSelectedProduct} />
      {pageState === 'cart' && <Cart />}
      {pageState === 'landing' && <LandingPage setSelectedProduct={setSelectedProduct} setPageState={setPageState} />}
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
