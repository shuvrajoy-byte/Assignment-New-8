"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TileCard from "@/components/TileCard";

export default function Home() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tiles?_limit=4")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedTiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)"
        }}>
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full opacity-10 bg-purple-500 -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-72 h-72 rounded-full opacity-10 bg-blue-500 top-40 right-10 animate-pulse delay-1000"></div>
          <div className="absolute w-56 h-56 rounded-full opacity-10 bg-pink-500 bottom-10 left-1/3 animate-pulse delay-500"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="badge badge-primary badge-outline mb-4 text-white border-purple-400 px-4 py-3">
            ✨ Premium Tile Collection 2024
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Perfect Aesthetic
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium tiles — from classic marble to modern geometric designs. Transform your space today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/all-tiles"
              className="btn btn-primary btn-lg px-8 bg-gradient-to-r from-purple-600 to-blue-600 border-none hover:from-purple-700 hover:to-blue-700">
              Browse Now 🧱
            </Link>
            <Link href="/all-tiles"
              className="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-gray-900">
              View Collection
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">20+</div>
              <div className="text-gray-400 text-sm">Tile Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">8+</div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-gray-400 text-sm">Premium Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-primary-content py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3].map((_, i) => (
            <span key={i} className="mx-4 text-sm font-medium">
              🆕 New Arrivals: Ocean Blue Ceramic &nbsp;|&nbsp;
              ⭐ Weekly Feature: Modern Geometric Patterns &nbsp;|&nbsp;
              🎨 Join the Community &nbsp;|&nbsp;
              💎 Premium Marble Collection &nbsp;|&nbsp;
              🏠 Transform Your Space &nbsp;|&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Featured Tiles */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tiles</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hand-picked premium tiles from our collection
          </p>
          <div className="divider max-w-xs mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/all-tiles" className="btn btn-primary btn-wide">
            View All Tiles →
          </Link>
        </div>
      </section>
    </div>
  );
}