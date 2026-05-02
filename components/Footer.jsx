export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className="footer p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-2xl font-bold">🧱 TilesGallery</span>
          <p className="mt-2 text-sm opacity-70">
            Discover the finest tiles for your perfect space.
          </p>
        </div>
        <div>
          <span className="footer-title">Quick Links</span>
          <a href="/" className="link link-hover">Home</a>
          <a href="/all-tiles" className="link link-hover">All Tiles</a>
        </div>
        <div>
          <span className="footer-title">Contact Us</span>
          <p className="text-sm">📧 tilesgallery@email.com</p>
          <p className="text-sm">📞 +880 1234-567890</p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="btn btn-ghost btn-sm">Facebook</a>
            <a href="#" className="btn btn-ghost btn-sm">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-sm opacity-50">
        © 2024 TilesGallery. All rights reserved.
      </div>
    </footer>
  );
}