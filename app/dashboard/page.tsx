import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="animated-bg min-h-screen py-12 px-4 relative" suppressHydrationWarning>
      {/* Glow Orbs */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido al Dashboard
          </h1>
          <p className="text-slate-400">
            Panel de control empresarial seguro
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 hover:border-blue-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Estado</p>
                <p className="text-2xl font-bold text-green-400">Activo</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 hover:border-blue-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Seguridad</p>
                <p className="text-2xl font-bold text-blue-400">JWT</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 hover:border-blue-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Sesión</p>
                <p className="text-2xl font-bold text-purple-400">30 días</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Info */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">👤</span>
              Información de tu Cuenta
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Nombre Completo</p>
                <p className="text-xl font-semibold text-white">
                  {session?.user?.name || "No disponible"}
                </p>
              </div>
              <div className="pb-6 border-b border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Email Corporativo</p>
                <p className="text-xl font-semibold text-white">
                  {session?.user?.email}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">ID de Usuario</p>
                <p className="text-sm font-mono text-slate-300 break-all bg-slate-900 p-3 rounded-lg">
                  {session?.user?.id || "No disponible"}
                </p>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">🔐</span>
              Sesión
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">Proveedor</p>
                <p className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                  Credenciales
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Estado</p>
                <p className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                  Autenticado
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Tipo de Token</p>
                <p className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                  JWT
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">⚡</span>
            Características de Seguridad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Middleware de Protección</p>
                <p className="text-slate-400 text-sm">
                  Validación de JWT antes de renderizar
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Cookies HttpOnly</p>
                <p className="text-slate-400 text-sm">
                  Tokens no accesibles desde JavaScript
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Server Components</p>
                <p className="text-slate-400 text-sm">
                  Datos de sesión obtenidos en el servidor
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Protección CSRF</p>
                <p className="text-slate-400 text-sm">
                  Tokens CSRF automáticos incluidos
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">Contraseñas Hasheadas</p>
                <p className="text-slate-400 text-sm">
                  Bcrypt con salt en Firebase
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="font-semibold text-white">TypeScript</p>
                <p className="text-slate-400 text-sm">
                  Seguridad de tipos en todo el código
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            Documentación
          </h2>
          <p className="text-slate-300 mb-6">
            Consulta la documentación de seguridad para entender cómo funciona la autenticación:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/docs/seguridad/oauth.md"
              className="block p-4 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-blue-500 transition text-blue-400 hover:text-blue-300 font-semibold"
            >
              → Flujo OAuth 2.0
            </Link>
            <Link
              href="/docs/seguridad/middleware.md"
              className="block p-4 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-blue-500 transition text-blue-400 hover:text-blue-300 font-semibold"
            >
              → Protección de Rutas
            </Link>
            <Link
              href="/docs/seguridad/credenciales.md"
              className="block p-4 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-blue-500 transition text-blue-400 hover:text-blue-300 font-semibold"
            >
              → Gestión de Credenciales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
