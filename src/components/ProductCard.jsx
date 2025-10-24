export function ProductCard({ name, imageUrl, teaser, price, stock }) {
  return (
    <div className="flex shadow-lg min-h-60 shadow-gray-500 text-left p-2 rounded-xl">
      <div className="flex min-h-40 py-2 gap-2">
        <img className="self-center w-32 h-32 object-cover" src={'http://localhost:4000' + imageUrl} alt="Produktet" />
        <div className="text-left items-center">
          <h2 className="font-bold text-xl">{name}</h2>
          <p>{teaser}</p>
        </div>
      </div>
      <div className="flex flex-col flex-nowrap text-nowrap self-end">
        {stock > 0 ? (
          <p className="text-green-600 text-2xl">På lager</p>
        ) : (
          <p className="text-red-600 text-2xl">Ikke på lager</p>
        )}
        <p className="text-4xl">
          <b>{parseInt(price).toFixed(2).replace('.', ',')}</b> DKK
        </p>
      </div>
    </div>
  );
}
