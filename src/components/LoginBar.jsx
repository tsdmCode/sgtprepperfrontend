import { FaShoppingBasket } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export function LoginBar({ setPageState }) {
  const { isAuthed, login, logout, error } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleClick = async () => {
    await login(form.username, form.password);

    if (isAuthed) {
      logout();
    }
    const result = await login(form.username, form.password);
    if (!result.success) {
      console.error('Login failed:', result.error);
      return;
    }

    setForm((p) => ({ ...p, password: '' }));
  };

  const openCart = () => {
    setPageState('cart');
  };

  return (
    <div className="bg-[#334156] p-3 flex justify-between">
      <img src="src/assets/logo.png" alt="" />
      <div className="flex items-center text-[#ffffff] gap-2">
        {!isAuthed ? (
          <form className="" action="">
            <label htmlFor="username">Brugernavn:</label>
            <input
              onChange={handleChange}
              id="username"
              value={form.username}
              className="bg-white outline-none text-black mx-2 px-1"
              name="username"
              type="text"
            />
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleChange}
              id="password"
              value={form.password}
              className="bg-white outline-none text-black mx-2 px-1"
              name="password"
              type="password"
            />
          </form>
        ) : (
          ''
        )}
        <button className="bg-[#A3B4CC] py-2 px-3 rounded-2xl" onClick={handleClick}>
          {isAuthed ? 'Log ud' : 'Log Ind'}
        </button>
        <FaShoppingBasket onClick={openCart} className="text-4xl" />
      </div>
      {error && <div className="text-red-400 ml-4">{error}</div>}
    </div>
  );
}
