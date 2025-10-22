import { useState, useEffect } from 'react';

export function ProductsContainer({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(query)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [query]);

  //   console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const renderedProducts = data.map((product) => {
    // console.log(product.imageUrl)
    const { name, imageUrl, teaser, price, stock } = product;

    return (
      <div className="product-card" key={name}>
        <img src={'http://localhost:4000' + imageUrl} alt="" />
        <h2>{name}</h2>
        <p>{teaser}</p>
        <p>
          Price: <b>{parseInt(price).toFixed(2).replace('.', ',')}</b>
        </p>
        {stock > 0 ? <p className="text-green-600">På lager</p> : <p className="text-red-600">Ikke på lager</p>}
      </div>
    );
  });

  return (
    <section id="mainview">
      <h2>Produkterne</h2>
      <div className="product-container">{renderedProducts}</div>
    </section>
  );
}
