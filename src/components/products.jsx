import { useState, useEffect } from 'react';

export function ProductsContainer({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(query)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [query]);

  //console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const renderedProducts = data.map((product) => {
    // console.log(product.imageUrl)
    const { name, imageUrl, teaser, price, stock } = product;

    return (
      <div className="product-card" key={name}>
        <img src={'http://localhost:4000' + imageUrl} alt="Produktet" />
        <h2>{name}</h2>
        <p>{teaser}</p>
        <p>
          <b>{parseInt(price).toFixed(2).replace('.', ',')}</b> DKK
        </p>
        {stock > 0 ? <p className="text-green-600">På lager</p> : <p className="text-red-600">Ikke på lager</p>}
      </div>
    );
  });

  // .product-card {
  //   background-color: #88898850;
  //   padding: 1rem;
  //   display: flex;
  //   flex-direction: column;
  //   border-radius: 25px;
  // }

  // .product-card img {
  //   align-self: center;
  //   width: 30%;
  //   height: 30%;
  // }

  return (
    <section id="mainview">
      <h2 className="text-4xl font-bold">Produkterne</h2>
      <div className="flex-col gap-4">{renderedProducts}</div>
    </section>
  );
}
// .product-container {
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// }
