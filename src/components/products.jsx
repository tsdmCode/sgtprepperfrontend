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

  const handleClick = () => {
    console.log('Køb registreret!');
  };

  const renderedProducts = data.map((product) => {
    // console.log(product.imageUrl)
    const { name, imageUrl, teaser, price } = product;

    return (
      <div className="product-card" key={name}>
        <img src={'http://localhost:4000' + imageUrl} alt="" />
        <h2>{name}</h2>
        <p>{teaser}</p>
        <p>
          Price: <b>${price}</b>
        </p>
        <button onClick={handleClick}>Add to cart</button>
      </div>
    );
  });

  return <section className="product-container">{renderedProducts}</section>;
}
