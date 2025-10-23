import { useState, useEffect } from 'react';

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

  const renderedProducts = data.map((product) => {
    // console.log(product.imageUrl)
    const { name, imageUrl, teaser, price, stock } = product;

    return (
      <div className="flex shadow-gray-500 text-left p-2 rounded-xl" key={name}>
        <div className="flex">
          <img className="self-center w-1/5 h-xs" src={'http://localhost:4000' + imageUrl} alt="Produktet" />
          <div className="text-left items-center">
            <h2 className="font-bold">{name}</h2>
            <p>{teaser}</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap text-nowrap self-end">
          {stock > 0 ? <p className="text-green-600">På lager</p> : <p className="text-red-600">Ikke på lager</p>}
          <p>
            <b>{parseInt(price).toFixed(2).replace('.', ',')}</b> DKK
          </p>
        </div>
      </div>
    );
  });

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl m-2 self-start font-bold">Produkterne</h2>
      <div className="w-1/2 flex flex-col items-center justify-center gap-4">{renderedProducts}</div>
    </section>
  );
}
