export default function Wishlist({ onNavigate, wishlistItems }) {
  return (
    <main className="min-h-screen pt-40 px-8">
      <h1 className="text-4xl font-[Panchang-Bold] mb-4 flex justify-center">Wishlist</h1>
      <h3 className="text-2xl font-[Panchang-Semibold] mb-4 flex justify-center">Your favorite products</h3>

      {wishlistItems && wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img src={`/images/${item.collection}/${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="text-lg font-[Panchang-Semibold]">{item.name}</h3>
              <p className="text-sm">{item.price}€</p>
            </div>
          </div>
        ))
      ) : (
        <p className="font-[Panchang-Regular]">No Products on the Wishlist.</p>
      )}
    </main>
  );
}
