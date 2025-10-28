import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDetails } from './ProductDetails';

export function ProductsContainer({ query, setPageState, setSelectedProduct, selectedProduct }) {
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

  if (selectedProduct !== null) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => {
          setSelectedProduct(null);
          setPageState('landing');
        }}
      />
    );
  }

  const renderedProducts = data.map((product) => (
    <ProductCard
      key={product.name}
      {...product}
      onClick={() => {
        // console.log('clicked product', product);

        setSelectedProduct(product.slug);
        setPageState('detailed');
      }}
    />
  ));

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl m-2 self-start font-bold">Produkterne</h2>
      <div className="w-1/2 flex flex-col items-center justify-center gap-4">{renderedProducts}</div>
    </section>
  );
}
