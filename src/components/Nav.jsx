import { useState, useEffect } from 'react';

export function Nav({ setQuery }) {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const items = json;
        setCategories(items);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Failed to load categories');
      });
    return () => {};
  }, []);

  if (error) return <div>Nav error: {error}</div>;
  if (!categories) return <div>Loading nav</div>;

  const updateSearch = (slug) => {
    const url = `http://localhost:4000/api/products/${slug}`;
    setQuery(url);
  };

  const renderedCategories = categories.map((category) => (
    <li className="p-1" onClick={() => updateSearch(category.slug)} key={category.slug}>
      {category.title}
    </li>
  ));

  return (
    <nav className="bg-[#64758B] p-2 text-white">
      <ul className="flex gap-5 justify-center items-center">{renderedCategories}</ul>
    </nav>
  );
}
