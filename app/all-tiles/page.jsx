"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllTiles() {
  const [tiles, setTiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Ceramic", "Marble", "Terracotta", "Mosaic", "Stone", "Metallic", "Patterned", "Hexagon", "Zellige", "Concrete", "Subway", "Encaustic"];

  useEffect(() => {
    fetch("http://localhost:5000/tiles")
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.tiles || [];
        setTiles(arr);
        setFiltered(arr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = tiles;
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, activeCategory, tiles]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#f5f0eb] py-20 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Our Collection</p>
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
          All <span className="italic">Tiles</span>
        </h1>
        <p className="text-gray-500 font-light max-w-md mx-auto">
          Browse our complete collection of premium tiles
        </p>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search tiles by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 px-5 py-4 text-sm focus:outline-none focus:border-black transition-colors pr-12"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "border border-gray-200 text-gray-600 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-8 text-center">
          Showing {filtered.length} tiles
        </p>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-gray-400 tracking-widest uppercase text-sm">No tiles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((tile) => (
              <div key={tile.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
                  <img
                    src={`https://picsum.photos/seed/${tile.id}/500/500`}
                    alt={tile.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`/tile/${tile.id}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white"
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
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 font-medium">${tile.price}</p>
                    <p className="text-xs text-gray-400">{tile.dimensions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}