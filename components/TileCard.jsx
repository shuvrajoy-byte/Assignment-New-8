import Link from "next/link";

const categoryColors = {
  ceramic: "badge-primary",
  marble: "badge-secondary",
  terracotta: "badge-warning",
  mosaic: "badge-success",
  stone: "badge-neutral",
  metallic: "badge-error",
  default: "badge-ghost",
};

export default function TileCard({ tile }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-200">
      <figure className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${tile.id}/400/300`}
          alt={tile.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className={`badge ${tile.inStock ? "badge-success" : "badge-error"} badge-sm`}>
            {tile.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </figure>
      <div className="card-body p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-sm font-bold line-clamp-1">{tile.title}</h2>
          <span className={`badge ${categoryColors[tile.category] || categoryColors.default} badge-sm shrink-0`}>
            {tile.category}
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{tile.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">${tile.price}</span>
          <span className="text-xs text-gray-400">{tile.dimensions}</span>
        </div>
        <div className="card-actions mt-2">
          <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}