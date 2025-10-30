import { useEffect, useState } from 'react';
import { Header } from './Header';
import { ProductCard } from './ProductCard';

export function LandingPage({ setPageState, setSelectedProduct }) {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((response) => response.json())
      .then((json) => setLatest(json))
      .catch((error) => console.error(error));
  }, []);

  if (!latest) {
    return <div>Loading...</div>;
  }

  const sortedLatest = latest.sort(() => Math.random() - 0.5).slice(0, 5);

  const renderedLatest = sortedLatest.map((product) => (
    <ProductCard
      key={product.name}
      {...product}
      onClick={() => {
        setSelectedProduct(product.slug);
        setPageState('detailed');
      }}
    />
  ));

  return (
    <div>
      <Header />
      <div>
        <h2 className="text-left font-bold">Seneste Nyt</h2>
        <div>{renderedLatest}</div>
      </div>
    </div>
  );
}
