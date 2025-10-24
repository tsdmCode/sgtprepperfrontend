import { useEffect, useState } from 'react';
import { Header } from './Header';

export function LandingPage() {
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

  const renderedLatest = sortedLatest.map((product) => {
    const { name, imageUrl, teaser, price, stock } = product;

    return (
      <div className="flex shadow-lg min-h-60 shadow-gray-500 text-left p-2 rounded-xl" key={name}>
        <div className="flex min-h-40 py-2 gap-2">
          <img className="self-center w-1/5 h-xs" src={'http://localhost:4000' + imageUrl} alt="Produktet" />
          <div className="text-left items-center">
            <h2 className="font-bold text-xl">{name}</h2>
            <p>{teaser}</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap text-nowrap self-end">
          {stock > 0 ? (
            <p className="text-green-600 text-2xl">På lager</p>
          ) : (
            <p className="text-red-600 text-2xl">Ikke på lager</p>
          )}
          <p className="text-4xl">
            <b>{parseInt(price).toFixed(2).replace('.', ',')}</b> DKK
          </p>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <Header />
      <div>
        <h2 className="text-left">Seneste Nyt</h2>
        <div>{renderedLatest}</div>
      </div>
    </div>
  );
}
