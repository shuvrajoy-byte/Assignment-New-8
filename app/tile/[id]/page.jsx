"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function TileDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending]);

  useEffect(() => {
    fetch(`http://localhost:5000/tiles`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.tiles || [];
        const found = arr.find((t) => t.id === id);
        setTile(found);
        const rel = arr.filter((t) => t.category === found?.category && t.id !== id).slice(0, 4);
        setRelated(rel);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading || isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-6xl mb-4">🧱</p>
        <h2 className="text-2xl font-light mb-4">Tile not found</h2>
        <Link href="/all-tiles" className="bg-black text-white px-8 py-3 text-sm tracking-widest uppercase">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 tracking-wider uppercase">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/all-tiles" className="hover:text-black transition-colors">All Tiles</Link>
          <span>/</span>
          <span className="text-gray-900">{tile.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={`https://picsum.photos/seed/${tile.id}/800/800`}
                alt={tile.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square overflow-hidden bg-gray-100 cursor-pointer">
                  <img
                    src={`https://picsum.photos/seed/${tile.id}${i}/300/300`}
                    alt={tile.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-start">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">{tile.category}</p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">{tile.title}</h1>
            <p className="text-2xl font-light text-gray-900 mb-6">${tile.price} <span className="text-sm text-gray-400">USD</span></p>

            <div className="w-full h-px bg-gray-100 mb-6"></div>

            <p className="text-gray-500 font-light leading-relaxed mb-8">{tile.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Material", value: tile.material },
                { label: "Finish", value: tile.finish },
                { label: "Dimensions", value: tile.dimensions },
                { label: "Style", value: tile.style },
                { label: "Creator", value: tile.creator },
                { label: "SKU", value: tile.sku },
              ].map((spec) => (
                <div key={spec.label} className="border border-gray-100 p-4">
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{spec.label}</p>
                  <p className="text-sm font-medium text-gray-900">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Room Types */}
            {tile.roomType && (
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Suitable For</p>
                <div className="flex flex-wrap gap-2">
                  {tile.roomType.map((room) => (
                    <span key={room} className="border border-gray-200 px-3 py-1 text-xs tracking-wider text-gray-600">
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tile.tags && (
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-3 py-1 text-xs tracking-wider text-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className={`inline-flex items-center gap-2 mb-8 px-4 py-2 text-xs tracking-widest uppercase ${tile.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              <span className={`w-2 h-2 rounded-full ${tile.inStock ? "bg-green-500" : "bg-red-500"}`}></span>
              {tile.inStock ? "In Stock" : "Out of Stock"}
            </div>

            <Link
              href="/all-tiles"
              className="border border-black text-black px-8 py-4 text-sm tracking-widest uppercase text-center hover:bg-black hover:text-white transition-colors"
            >
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Related Tiles */}
      {related.length > 0 && (
        <section className="bg-[#f5f0eb] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">
              You May Also <span className="italic">Like</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((t) => (
                <Link href={`/tile/${t.id}`} key={t.id} className="group">
                  <div className="aspect-square overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={`https://picsum.photos/seed/${t.id}/400/400`}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">{t.category}</p>
                  <p className="text-sm font-medium text-gray-900">{t.title}</p>
                  <p className="text-sm text-gray-600">${t.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}