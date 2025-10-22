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
    <li onClick={() => updateSearch(category.slug)} key={category.slug}>
      {category.title}
    </li>
  ));

  return (
    <nav>
      <ul>{renderedCategories}</ul>
    </nav>
  );
}
