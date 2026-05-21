# 🔐 AuthApp - Autenticación Profesional en Next.js

Una aplicación completa de autenticación y seguridad construida con **Next.js 16**, **NextAuth.js**, **Firebase** y **OAuth 2.0**.

## ✨ Características

- ✅ **Autenticación con Credenciales**: Email y contraseña con Firebase
- ✅ **OAuth 2.0**: Integración con GitHub y Google
- ✅ **Middleware de Protección**: Rutas protegidas a nivel de Edge
- ✅ **JWT Seguro**: Sesiones con tokens firmados
- ✅ **Cookies HttpOnly**: Protección contra XSS
- ✅ **Server Components**: Datos sensibles en el servidor
- ✅ **Diseño Responsivo**: Interfaz moderna con Tailwind CSS
- ✅ **Documentación Completa**: Análisis de seguridad incluido

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/auth-app.git
cd auth-app
```

### 2. Instalar Dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Configurar Variables de Entorno

Copia `.env.local.example` a `.env.local` y completa con tus credenciales:

```bash
cp .env.local.example .env.local
```

Consulta [SETUP.md](./SETUP.md) para instrucciones detalladas de configuración.

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
auth-app/
├── app/
│   ├── api/auth/[...nextauth]/    # Configuración de NextAuth
│   ├── dashboard/                  # Área protegida
│   ├── login/                      # Página de login
│   ├── register/                   # Página de registro
│   ├── layout.tsx                  # Layout principal
│   ├── page.tsx                    # Página de inicio
│   └── providers.tsx               # SessionProvider
├── components/
│   └── navbar.tsx                  # Barra de navegación
├── docs/
│   └── seguridad/
│       ├── oauth.md                # Explicación de OAuth 2.0
│       ├── middleware.md           # Protección de rutas
│       └── credenciales.md         # Gestión de contraseñas
├── types/
│   └── next-auth.d.ts              # Tipos de NextAuth
├── middleware.ts                   # Middleware de protección
├── SETUP.md                        # Guía de configuración
└── package.json
```

## 🔐 Flujo de Autenticación

### Registro

```
Usuario → Formulario de Registro
        → Validación de Contraseña
        → Firebase Auth (signUp)
        → Inicio de Sesión Automático
        → Redirección a Dashboard
```

### Login con Credenciales

```
Usuario → Formulario de Login
        → Firebase Auth (signInWithPassword)
        → Creación de JWT
        → Cookie HttpOnly
        → Redirección a Dashboard
```

### Login con OAuth

```
Usuario → Botón "Iniciar Sesión con Google/GitHub"
        → Redirección a Proveedor
        → Autorización del Usuario
        → Callback a la Aplicación
        → Creación de Sesión
        → Redirección a Dashboard
```

## 🛡️ Seguridad

### Protección de Rutas

Las rutas protegidas se validan en **dos niveles**:

1. **Middleware (Edge)**: Valida la sesión antes de renderizar
2. **Server Components**: Obtiene datos sensibles en el servidor

```typescript
// middleware.ts
export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### Gestión de Contraseñas

- ✅ Nunca se almacenan en texto plano
- ✅ Firebase usa algoritmos seguros (scrypt)
- ✅ Incluye salt automáticamente
- ✅ Validación en servidor

### Sesiones

- ✅ JWT firmado y encriptado
- ✅ Almacenado en cookies HttpOnly
- ✅ Protección CSRF automática
- ✅ Expiración configurable

## 📚 Documentación

### Guías de Seguridad

- **[oauth.md](./docs/seguridad/oauth.md)**: Explicación detallada del flujo OAuth 2.0
- **[middleware.md](./docs/seguridad/middleware.md)**: Protección de rutas con middleware
- **[credenciales.md](./docs/seguridad/credenciales.md)**: Gestión segura de contraseñas

### Configuración

- **[SETUP.md](./SETUP.md)**: Guía paso a paso de configuración

## 🧪 Pruebas

### Probar Registro

1. Ve a `/register`
2. Completa el formulario
3. Deberías ser redirigido a `/dashboard`

### Probar Login

1. Ve a `/login`
2. Ingresa credenciales
3. Deberías ser redirigido a `/dashboard`

### Probar Protección de Rutas

1. Intenta acceder a `/dashboard` sin estar logueado
2. Deberías ser redirigido a `/login`

### Probar OAuth

1. Ve a `/login`
2. Haz clic en "GitHub" o "Google"
3. Autoriza la aplicación
4. Deberías ser redirigido a `/dashboard`

## 🚀 Desplegar en Vercel

### 1. Preparar Repositorio

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/auth-app.git
git push -u origin main
```

### 2. Conectar a Vercel

1. Ve a [Vercel](https://vercel.com/)
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Haz clic en "Import"

### 3. Configurar Variables de Entorno

En Vercel, ve a "Settings" → "Environment Variables" y añade:

```
NEXTAUTH_URL=https://tu-app.vercel.app
NEXTAUTH_SECRET=tu-secret
GITHUB_ID=tu-github-id
GITHUB_SECRET=tu-github-secret
GOOGLE_ID=tu-google-id
GOOGLE_SECRET=tu-google-secret
NEXT_PUBLIC_FIREBASE_API_KEY=tu-firebase-key
... (resto de variables)
```

### 4. Actualizar URLs de Callback

**En GitHub:**
- Authorization callback URL: `https://tu-app.vercel.app/api/auth/callback/github`

**En Google Cloud:**
- URIs de redirección autorizados: `https://tu-app.vercel.app/api/auth/callback/google`

## 🔧 Tecnologías Utilizadas

- **Next.js 16**: Framework React con App Router
- **NextAuth.js 4**: Autenticación profesional
- **Firebase**: Gestión de usuarios y autenticación
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos modernos
- **OAuth 2.0**: Autenticación con terceros

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- Cuentas en Firebase, GitHub y Google Cloud

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

## 🙋 Soporte

¿Tienes preguntas? Abre un issue en el repositorio.

## 🎓 Aprendizaje

Este proyecto es una excelente manera de aprender sobre:

- Autenticación y autorización
- OAuth 2.0
- JWT y sesiones
- Seguridad en aplicaciones web
- Next.js App Router
- Server Components vs Client Components
- Middleware en Next.js

---

**Hecho con ❤️ para desarrolladores que se preocupan por la seguridad**
