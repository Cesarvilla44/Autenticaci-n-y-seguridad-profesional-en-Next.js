export default function TestPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Test Page</h1>
        <p className="text-slate-300 mb-6">
          Si ves este mensaje sin errores, NextAuth está funcionando correctamente.
        </p>
        <div className="space-y-3">
          <a href="/login" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Ir a Login
          </a>
          <a href="/register" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
            Ir a Register
          </a>
          <a href="/" className="block bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded text-center">
            Ir a Home
          </a>
        </div>
      </div>
    </div>
  );
}
