"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧱</span>
            <span className="text-xl font-bold tracking-widest uppercase text-gray-900">
              TilesGallery
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium tracking-wider uppercase text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/all-tiles" className="text-sm font-medium tracking-wider uppercase text-gray-700 hover:text-black transition-colors">
              All Tiles
            </Link>
            {session && (
              <Link href="/my-profile" className="text-sm font-medium tracking-wider uppercase text-gray-700 hover:text-black transition-colors">
                My Profile
              </Link>
            )}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <img
                  src={session.user.image || "https://i.pravatar.cc/40"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium tracking-wider uppercase text-gray-700 hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium tracking-wider uppercase bg-black text-white px-5 py-2 hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}