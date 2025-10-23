import { FaShoppingBasket } from 'react-icons/fa';

export function LoginBar() {
  return (
    <div className="bg-[#334156] p-3 flex justify-between">
      <img src="src/assets/logo.png" alt="" />
      <div className="flex items-center text-[#ffffff] gap-2">
        <button className="bg-[#A3B4CC] py-2 px-3 rounded-2xl">Log Ind</button>
        <FaShoppingBasket className="text-4xl " />
      </div>
    </div>
  );
}
