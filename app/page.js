"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TileCard from "@/components/TileCard";

export default function Home() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tiles")
      .then((res) => res.json())
      .then((data) => {
        const tilesArray = Array.isArray(data) ? data : data.tiles || [];
        setFeaturedTiles(tilesArray.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#f5f0eb] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-gray-400 aspect-square"></div>
          ))}
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mb-6">
            Premium Collection 2024
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 leading-none tracking-tight">
            Discover Your
            <br />
            <span className="italic">Perfect Aesthetic</span>
          </h1>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto font-light">
            Explore our curated collection of premium tiles — from classic
            marble to modern geometric designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/all-tiles"
              className="bg-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Browse Collection
            </Link>
            <Link
              href="/all-tiles"
              className="border border-black text-black px-10 py-4 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              View All Tiles
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-gray-400">Scroll</span>
          <div className="w-px h-10 bg-gray-400 animate-pulse"></div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-black text-white py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map((_, i) => (
            <span key={i} className="mx-8 text-xs tracking-[0.3em] uppercase font-light">
              New Arrivals: Ocean Blue Ceramic
              <span className="mx-4 text-gray-500">◆</span>
              Weekly Feature: Modern Geometric Patterns
              <span className="mx-4 text-gray-500">◆</span>
              Premium Marble Collection
              <span className="mx-4 text-gray-500">◆</span>
              Transform Your Space
              <span className="mx-4 text-gray-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { number: "20+", label: "Tile Designs" },
            { number: "8+", label: "Categories" },
            { number: "100%", label: "Premium Quality" },
          ].map((stat, i) => (
            <div key={i} className="py-12 text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{stat.number}</div>
              <div className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tiles */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">
              Handpicked For You
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Featured Tiles
            </h2>
          </div>
          <Link
            href="/all-tiles"
            className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase text-gray-600 hover:text-black transition-colors"
          >
            View All <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/all-tiles"
            className="inline-block border border-black text-black px-12 py-4 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            View All Tiles
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#f5f0eb] py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">About Us</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Crafted With <br /><span className="italic">Precision</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              We curate the finest tiles from around the world. Each piece is
              selected for its quality, design, and ability to transform any
              space into something extraordinary.
            </p>
            <Link
              href="/all-tiles"
              className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["tile003", "tile004", "tile007", "tile008"].map((seed, i) => (
              <div key={i} className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={`https://picsum.photos/seed/${seed}/400/400`}
                  alt="tile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}