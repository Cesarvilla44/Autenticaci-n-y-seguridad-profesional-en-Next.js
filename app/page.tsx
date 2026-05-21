import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Autenticación Profesional
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Una aplicación Next.js con autenticación segura usando NextAuth.js,
          Firebase y OAuth
        </p>

        {session ? (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 mb-4">
              ¡Bienvenido, <span className="font-bold">{session.user?.name}</span>!
            </p>
            <p className="text-gray-600 mb-6">
              Email: <span className="font-mono">{session.user?.email}</span>
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Ir al Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center mb-8">
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Registrarse
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">🔐 Seguro</h3>
            <p className="text-gray-600">
              Autenticación con JWT y cookies HttpOnly
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">🌐 OAuth</h3>
            <p className="text-gray-600">
              Integración con GitHub y Google
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">🔥 Firebase</h3>
            <p className="text-gray-600">
              Gestión de usuarios con Firebase Auth
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
