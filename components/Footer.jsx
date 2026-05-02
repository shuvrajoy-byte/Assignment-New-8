import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧱</span>
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                TilesGallery
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed text-gray-400 max-w-xs">
              Discover the finest tiles for your perfect space. Premium quality,
              timeless designs.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/all-tiles" className="text-sm text-gray-400 hover:text-white transition-colors">All Tiles</Link></li>
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">tilesgallery@email.com</li>
              <li className="text-sm text-gray-400">+880 1234-567890</li>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider">FB</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider">IG</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider">TW</a>
              </div>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-500">
            © 2024 TilesGallery. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}