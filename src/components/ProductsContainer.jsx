import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

export function ProductsContainer({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(query)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [query]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const renderedProducts = data.map((product) => <ProductCard key={product.name} {...product} />);

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl m-2 self-start font-bold">Produkterne</h2>
      <div className="w-1/2 flex flex-col items-center justify-center gap-4">{renderedProducts}</div>
    </section>
  );
}
