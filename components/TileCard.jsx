import Link from "next/link";

export default function TileCard({ tile }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
        <img
          src={`https://picsum.photos/seed/${tile.id}/400/400`}
          alt={tile.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Link
            href={`/tile/${tile.id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
        {!tile.inStock && (
          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs px-2 py-1 tracking-wider">
            Sold Out
          </div>
        )}
      </div>
      <div>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{tile.category}</p>
        <h3 className="text-sm font-medium text-gray-900 mb-1">{tile.title}</h3>
        <p className="text-sm text-gray-600">${tile.price} <span className="text-gray-400 text-xs">{tile.dimensions}</span></p>
      </div>
    </div>
  );
}