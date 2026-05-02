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
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold text-primary">
          🧱 TilesGallery
        </Link>
      </div>

      {/* Center - Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link href="/" className="font-medium">Home</Link></li>
          <li><Link href="/all-tiles" className="font-medium">All Tiles</Link></li>
          {session && (
            <li><Link href="/my-profile" className="font-medium">My Profile</Link></li>
          )}
        </ul>
      </div>

      {/* Right - Auth */}
      <div className="navbar-end gap-2">
        {session ? (
          <div className="flex items-center gap-3">
            <img
              src={session.user.image || "https://i.pravatar.cc/40"}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-primary"
            />
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}