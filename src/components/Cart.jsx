import { useEffect, useState } from 'react';

export function Cart() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const loadCart = () => {
    const data = localStorage.getItem('prepperdata');
    const parsedData = data ? JSON.parse(data) : { items: [] };
    return parsedData;
  };

  const saveCart = (cartData) => {
    localStorage.setItem('prepperdata', JSON.stringify(cartData));
    setRefresh((prev) => prev + 1); // Trigger re-render
  };

  useEffect(() => {
    const parsedData = loadCart();
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
  }, [refresh]);

  if (loading) return <div className="text-center p-8">Loading cart…</div>;
  if (!items || items.length === 0) return <div className="text-center p-8">Cart is empty</div>;

  const updateQuantity = (slug, delta) => {
    const cartData = loadCart();
    const itemIndex = cartData.items.findIndex((item) => item.slug === slug);

    if (itemIndex === -1) return;

    const newQuantity = cartData.items[itemIndex].quantity + delta;

    if (newQuantity <= 0) {
      // Remove item if quantity reaches 0
      cartData.items.splice(itemIndex, 1);
    } else {
      cartData.items[itemIndex].quantity = newQuantity;
    }

    saveCart(cartData);
  };

  const removeItem = (slug) => {
    const cartData = loadCart();
    cartData.items = cartData.items.filter((item) => item.slug !== slug);
    saveCart(cartData);
  };

  const clearCart = () => {
    if (confirm('Er du sikker på, at du vil tømme kurven?')) {
      localStorage.removeItem('prepperdata');
      setRefresh((prev) => prev + 1);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, product) => {
      const price = Number(product.price) || 0;
      const quantity = Number(product.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    const total = calculateTotal();
    alert(`Total: ${total.toFixed(2).replace('.', ',')} DKK\n\nCheckout funktionalitet kommer snart!`);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Din indkøbskurv (FRI FRAGT!)</h1>

      <div className="bg-white rounded-lg shadow-md">
        {items.map((product) => (
          <article className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50" key={product.slug}>
            {product.imageUrl && (
              <img
                className="h-20 w-20 object-cover rounded"
                src={'http://localhost:4000' + product.imageUrl}
                alt={product.name}
              />
            )}

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{Number(product.price).toFixed(2).replace('.', ',')} DKK</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(product.slug, -1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded"
                aria-label="Fjern en"
              >
                −
              </button>
              <span className="font-semibold min-w-[2rem] text-center">{product.quantity}</span>
              <button
                onClick={() => updateQuantity(product.slug, 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded"
                aria-label="Tilføj en"
              >
                +
              </button>
            </div>

            <div className="min-w-[100px] text-right">
              <p className="font-bold text-lg">
                {(Number(product.quantity) * Number(product.price)).toFixed(2).replace('.', ',')} DKK
              </p>
            </div>

            <button
              onClick={() => removeItem(product.slug)}
              className="text-red-500 hover:text-red-700 font-bold ml-2"
              aria-label="Fjern produkt"
            >
              ✕
            </button>
          </article>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold">{calculateTotal().toFixed(2).replace('.', ',')} DKK</span>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-[#17A34A] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
            onClick={handleCheckout}
          >
            Gå til betaling
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
            onClick={clearCart}
          >
            Tøm kurv
          </button>
        </div>
      </div>
    </section>
  );
}
