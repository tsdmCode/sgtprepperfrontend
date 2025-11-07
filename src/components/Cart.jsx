import { useEffect, useState } from 'react';

export function Cart() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = localStorage.getItem('prepperdata');

  useEffect(() => {
    const parsedData = data ? JSON.parse(data) : { items: [] };
    if (!parsedData.items || parsedData.items.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    let mounted = true;
    async function loadProducts() {
      try {
        const products = await Promise.all(
          parsedData.items.map(async (item) => {
            const res = await fetch(`http://localhost:4000/api/products/byId/${item.slug}`);

            if (!res.ok) {
              return { slug: item.slug, name: 'Unknown', imageUrl: '', quantity: item.quantity };
            }

            const prod = await res.json();
            console.log('prod:', prod);
            return { ...prod, quantity: item.quantity };
          })
        );

        if (mounted) {
          setItems(products);
        }
      } catch (err) {
        console.error('Failed to load cart products', err);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, [data]);

  if (loading) return <div>Loading cart…</div>;
  if (!items || items.length === 0) return <div>Cart is empty</div>;

  const handleClick = () => {
    localStorage.removeItem('prepperdata');
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        {items.map((product) => (
          <div className="flex justify-center items-start text-center gap-4 my-5" key={product.id}>
            <h2>
              {product.quantity}X {product.name}
            </h2>
            {product.imageUrl && (
              <img
                className="h-16 w-16 object-cover"
                src={'http://localhost:4000' + product.imageUrl}
                alt={product.name}
              />
            )}
            {product.price && <p>{product.quantity * product.price} DKK</p>}
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white px-8 py-2 rounded-2xl" onClick={handleClick}>
        Køb!
      </button>
    </div>
  );
}
