import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-6">Error 404</p>
        <h1 className="text-8xl md:text-9xl font-light text-gray-900 mb-4">404</h1>
        <p className="text-xl font-light text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}