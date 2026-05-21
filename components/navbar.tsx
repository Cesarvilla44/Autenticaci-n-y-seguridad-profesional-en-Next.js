"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl border-b border-slate-700 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-lg">AuthApp</p>
            <p className="text-slate-400 dark:text-slate-400 text-xs">Enterprise Security</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {mounted && <ThemeToggle />}
          
          <div className="flex items-center gap-6">
            {!mounted ? (
              <div className="w-32 h-10 bg-slate-700 rounded-lg animate-pulse"></div>
            ) : status === "loading" ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-slate-300 dark:text-slate-300 text-sm">Cargando...</p>
              </div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-white text-sm">
                    {session.user?.name}
                  </p>
                  <p className="text-slate-400 dark:text-slate-400 text-xs">{session.user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-lg hover:shadow-red-500/50"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
