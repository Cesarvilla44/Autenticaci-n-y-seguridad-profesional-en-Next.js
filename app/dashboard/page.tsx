import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bienvenido al Dashboard
        </h1>
        <p className="text-gray-600">
          Esta es una página protegida que solo pueden ver usuarios autenticados
        </p>
      </div>

      {/* Información del Usuario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Información de tu Cuenta
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="text-lg font-semibold text-gray-900">
                {session?.user?.name || "No disponible"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-900">
                {session?.user?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID de Usuario</p>
              <p className="text-sm font-mono text-gray-700 break-all">
                {session?.user?.id || "No disponible"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Información de Sesión
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Proveedor</p>
              <p className="text-lg font-semibold text-gray-900">
                {session?.user?.email ? "Credenciales" : "OAuth"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Autenticado
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tipo de Sesión</p>
              <p className="text-lg font-semibold text-gray-900">JWT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Características de Seguridad
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <div>
              <p className="font-semibold text-gray-900">Middleware de Protección</p>
              <p className="text-sm text-gray-600">
                Esta ruta está protegida por middleware que valida la sesión antes de renderizar
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <div>
              <p className="font-semibold text-gray-900">JWT Seguro</p>
              <p className="text-sm text-gray-600">
                La sesión se almacena en un JWT firmado y se transmite en cookies HttpOnly
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <div>
              <p className="font-semibold text-gray-900">Server Components</p>
              <p className="text-sm text-gray-600">
                Los datos de sesión se obtienen en el servidor sin exposición al cliente
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <div>
              <p className="font-semibold text-gray-900">CSRF Protection</p>
              <p className="text-sm text-gray-600">
                NextAuth incluye protección contra ataques CSRF automáticamente
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Documentación */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          📚 Documentación
        </h2>
        <p className="text-blue-800 mb-4">
          Consulta la documentación de seguridad para entender cómo funciona la autenticación:
        </p>
        <div className="space-y-2">
          <Link
            href="/docs/seguridad/oauth.md"
            className="block text-blue-600 hover:text-blue-800 font-semibold"
          >
            → Flujo OAuth 2.0
          </Link>
          <Link
            href="/docs/seguridad/middleware.md"
            className="block text-blue-600 hover:text-blue-800 font-semibold"
          >
            → Protección de Rutas con Middleware
          </Link>
          <Link
            href="/docs/seguridad/credenciales.md"
            className="block text-blue-600 hover:text-blue-800 font-semibold"
          >
            → Gestión Segura de Credenciales
          </Link>
        </div>
      </div>
    </div>
  );
}
