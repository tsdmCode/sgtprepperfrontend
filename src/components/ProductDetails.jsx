import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import parse from 'html-react-parser';

export function ProductDetails({ product, onBack }) {
  console.log(product);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!product) {
      setData(null);
      return;
    }

    fetch(`http://localhost:4000/api/products/byId/${product}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch failed: ', response.status);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [product]);

  if (!data) return <div>No product selected</div>;

  const handleClick = () => {
    console.log('YM');
  };
  const { name, imageUrl, description, price, stock, createdAt } = data;
  return (
    <div className="flex justify-center ">
      <button className="self-start m-5">
        <FaChevronLeft className="text-4xl shadow-md shadow-gray-500 m-2" onClick={onBack} />
      </button>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{createdAt.substring(0, createdAt.indexOf('T'))}</p>
        <img className="h-1/2 w-1/2 self-center object-cover" src={'http://localhost:4000' + imageUrl} alt={name} />
        <div className="text-left">{parse(description)}</div>
        <p className="text-4xl">
          <b>{parseInt(price).toFixed(2).replace('.', ',')}</b> DKK
        </p>
        {stock > 0 ? (
          <p className="text-green-600 text-2xl">På lager</p>
        ) : (
          <p className="text-red-600 text-2xl">Ikke på lager</p>
        )}{' '}
        <button className="rounded-4xl text-white bg-[#17A34A] py-3 px-10" onClick={handleClick}>
          Læg i kurv
        </button>
      </div>
    </div>
  );
}
