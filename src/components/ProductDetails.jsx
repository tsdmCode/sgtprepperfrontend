import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import parse from 'html-react-parser';
import { useAuth } from '../context/AuthContext';

export function ProductDetails({ product, onBack }) {
  //console.log(product);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(1);
  const { isAuthed } = useAuth();

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

  const { name, imageUrl, slug, description, price, stock, createdAt } = data;

  const handleClick = () => {
    if (!isAuthed) {
      alert('Du skal logge ind for at tilføje varer til kurven');
      return;
    }
    const localData = localStorage.getItem('prepperdata');
    const parsedData = localData ? JSON.parse(localData) : { items: [] };

    const qty = Number(value) || 0;

    const index = parsedData.items.findIndex((item) => item.slug === slug);

    if (index > -1) {
      parsedData.items[index].quantity += qty;
    } else {
      parsedData.items.push({ slug, quantity: qty });
    }
    setValue(1);
    console.log(parsedData.items);
    localStorage.setItem('prepperdata', JSON.stringify(parsedData));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex justify-center text-wrap">
      <title>{name}</title>
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
        )}
        <div>
          <input
            onChange={handleChange}
            className="border border-black text-right py-3 rounded-lg"
            type="number"
            value={value}
          />
          <button className="rounded-4xl text-white bg-[#17A34A] py-3 px-10" onClick={handleClick}>
            Læg i kurv
          </button>
        </div>
      </div>
    </div>
  );
}
