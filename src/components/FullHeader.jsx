import { LoginBar } from './LoginBar';
import { Nav } from './Nav';
import { Hero } from './Hero';

export function FullHeader({ setQuery, setPageState, setSelectedProduct }) {
  return (
    <div>
      <LoginBar setPageState={setPageState} />
      <Nav setQuery={setQuery} setPageState={setPageState} setSelectedProduct={setSelectedProduct} />
      <Hero />
    </div>
  );
}
