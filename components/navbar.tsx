"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          🔐 AuthApp
        </Link>

        <div className="flex items-center gap-6">
          {status === "loading" ? (
            <p className="text-gray-600">Cargando...</p>
          ) : session ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {session.user?.name}
                </p>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
