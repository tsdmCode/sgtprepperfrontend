export function ProductCard({ name, imageUrl, teaser, price, stock, onClick, ...props }) {
  return (
    <div
      className="flex w-200 flex-row justify-between flex-shrink-0 shadow-lg shadow-gray-500 text-left p-2 rounded-xl cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.(e);
      }}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1">
        <img
          className="self-center w-20 h-20 object-cover rounded"
          src={'http://localhost:4000' + imageUrl}
          alt="Produktet"
        />
        <div className="text-left">
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="text-sm">{teaser}</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between w-28">
        {stock > 0 ? (
          <p className="text-green-600 text-2xl">På lager</p>
        ) : (
          <p className="text-red-600 text-2xl">Ikke på lager</p>
        )}
        <p className="flex items-baseline text-4xl">
          <b>{Number(price).toFixed(2).replace('.', ',')}</b> DKK
        </p>
      </div>
    </div>
  );
}
