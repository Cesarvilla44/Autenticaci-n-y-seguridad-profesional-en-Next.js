import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="animated-bg min-h-screen flex flex-col" suppressHydrationWarning>
      {/* Wave Container */}
      <div className="wave-container" suppressHydrationWarning>
        <div className="wave" suppressHydrationWarning></div>
        <div className="wave" suppressHydrationWarning></div>
        <div className="wave" suppressHydrationWarning></div>
      </div>

      {/* Glow Orbs */}
      <div className="glow-orb glow-orb-1" suppressHydrationWarning></div>
      <div className="glow-orb glow-orb-2" suppressHydrationWarning></div>
      <div className="glow-orb glow-orb-3" suppressHydrationWarning></div>

      {/* Pulse Rings */}
      <div className="pulse-ring pulse-ring-1" suppressHydrationWarning></div>
      <div className="pulse-ring pulse-ring-2" suppressHydrationWarning></div>
      <div className="pulse-ring pulse-ring-3" suppressHydrationWarning></div>

      {/* Floating Particles */}
      <div className="particle" suppressHydrationWarning></div>
      <div className="particle" suppressHydrationWarning></div>
      <div className="particle" suppressHydrationWarning></div>
      <div className="particle" suppressHydrationWarning></div>
      <div className="particle" suppressHydrationWarning></div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative z-10 fade-in-up" suppressHydrationWarning>
        <div className="max-w-4xl w-full text-center" suppressHydrationWarning>
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl" suppressHydrationWarning>
            <span className="text-white font-bold text-4xl">A</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Autenticación Empresarial
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              de Nivel Profesional.
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Plataforma segura con autenticación moderna, OAuth integrado y gestión de sesiones empresarial.
          </p>

          {/* CTA Buttons */}
          {session ? (
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700" suppressHydrationWarning>
              <p className="text-lg text-slate-300 mb-2">
                Bienvenido.
              </p>
              <p className="text-3xl font-bold text-white mb-2">
                {session.user?.name}
              </p>
              <p className="text-slate-400 mb-6">
                {session.user?.email}
              </p>
              <Link
                href="/dashboard"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50"
              >
                Ir al Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" suppressHydrationWarning>
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-all border border-slate-600 hover:border-slate-500"
              >
                Crear Cuenta
              </Link>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16" suppressHydrationWarning>
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 hover:border-blue-500 transition group card-hover" suppressHydrationWarning>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition" suppressHydrationWarning>
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Seguridad Empresarial.</h3>
              <p className="text-slate-400">
                JWT con cookies HttpOnly, CSRF protection y encriptación de nivel profesional.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 hover:border-blue-500 transition group card-hover" suppressHydrationWarning>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition" suppressHydrationWarning>
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">OAuth Integrado.</h3>
              <p className="text-slate-400">
                Autenticación con GitHub y Google para acceso rápido y seguro.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 hover:border-blue-500 transition group card-hover" suppressHydrationWarning>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition" suppressHydrationWarning>
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Firebase Backend.</h3>
              <p className="text-slate-400">
                Gestión de usuarios con Firebase Auth y contraseñas hasheadas con bcrypt.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-2xl p-8" suppressHydrationWarning>
            <h2 className="text-2xl font-bold text-white mb-8">Características Incluidas.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" suppressHydrationWarning>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">Autenticación por Email/Contraseña.</span>
              </div>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">Middleware de Protección de Rutas.</span>
              </div>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">Server Components Seguros.</span>
              </div>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">TypeScript Completo.</span>
              </div>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">Diseño Responsivo.</span>
              </div>
              <div className="flex items-center gap-3" suppressHydrationWarning>
                <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">✓</span>
                </span>
                <span className="text-slate-300">Listo para Producción.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm" suppressHydrationWarning>
          <p>© 2026, Proyecto de Autenticación Profesional en Next.js.</p>
        </div>
      </footer>
    </main>
  );
}
