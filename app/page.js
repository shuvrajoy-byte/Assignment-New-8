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
        const arr = Array.isArray(data) ? data : data.tiles || [];
        setFeaturedTiles(arr.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=90"
          alt="Luxury Tile Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-300 mb-6">
            Premium Tile Collection 2024
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-none tracking-tight">
            Discover Your
            <br />
            <span className="italic">Perfect Aesthetic</span>
          </h1>
          <p className="text-base text-gray-300 mb-10 max-w-xl mx-auto font-light">
            Explore our curated collection of premium tiles — from classic
            marble to modern geometric designs. Transform your space today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/all-tiles"
              className="bg-white text-black px-10 py-4 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors"
            >
              Browse Collection
            </Link>
            <Link
              href="/all-tiles"
              className="border border-white text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              View All Tiles
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-gray-300">Scroll</span>
          <div className="w-px h-10 bg-gray-300 animate-pulse"></div>
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
              Handcrafted Terracotta
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Collection Showcase */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Our Range</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Shop By <span className="italic">Category</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Marble", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
              { name: "Ceramic", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80" },
              { name: "Terracotta", img: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&q=80" },
              { name: "Mosaic", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
              { name: "Stone", img: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=600&q=80" },
              { name: "Patterned", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/all-tiles?category=${cat.name}`}
                className="group relative overflow-hidden aspect-square"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-xl font-light tracking-widest uppercase">{cat.name}</p>
                    <p className="text-gray-300 text-xs tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Collection →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Why Us</p>
            <h2 className="text-4xl font-light text-gray-900">
              Crafted With <span className="italic">Precision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "🏆", title: "Premium Quality", desc: "Every tile is carefully selected for its quality, durability, and aesthetic appeal." },
              { icon: "🌍", title: "Worldwide Sourced", desc: "We source our tiles from the finest craftsmen and manufacturers around the globe." },
              { icon: "✨", title: "Unique Designs", desc: "Our collection features exclusive designs you won't find anywhere else." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-wider uppercase">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Banner */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&q=90"
          alt="Tile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-300 mb-4">New Collection</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Explore Our Latest <span className="italic">Arrivals</span>
            </h2>
            <Link
              href="/all-tiles"
              className="inline-block bg-white text-black px-10 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}