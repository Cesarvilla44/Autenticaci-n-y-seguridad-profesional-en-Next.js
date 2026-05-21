# 🏗️ Arquitectura de la Aplicación

Este documento explica cómo funciona el sistema de autenticación en esta aplicación Next.js.

---

## Descripción General del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    Navegador (Cliente)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Componentes React (Client Components)                   │  │
│  │  - Formulario de Login                                   │  │
│  │  - Formulario de Registro                                │  │
│  │  - Barra de navegación con menú de usuario              │  │
│  │  - Hook useSession() para datos de sesión              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Librería Cliente de NextAuth.js                         │  │
│  │  - Funciones signIn() / signOut()                        │  │
│  │  - Hook useSession()                                    │  │
│  │  - Wrapper SessionProvider                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Cookies HTTP (HttpOnly)                                 │  │
│  │  - Token JWT (encriptado)                               │  │
│  │  - ID de Sesión                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ Solicitudes HTTP
┌─────────────────────────────────────────────────────────────────┐
│                  Servidor Next.js (Node.js)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware (middleware.ts)                              │  │
│  │  - Intercepta todas las solicitudes                     │  │
│  │  - Valida el token JWT                                 │  │
│  │  - Protege rutas /dashboard                            │  │
│  │  - Redirige a /login si no está autorizado             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Librería Servidor de NextAuth.js                        │  │
│  │  - Manejador de ruta /api/auth/[...nextauth]           │  │
│  │  - Gestiona proveedores de autenticación               │  │
│  │  - Emite tokens JWT                                    │  │
│  │  - Valida credenciales                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↕                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Componentes del Servidor                                │  │
│  │  - getServerSession() para páginas protegidas          │  │
│  │  - Página del Dashboard                                │  │
│  │  - Obtención segura de datos                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ Llamadas API REST
┌─────────────────────────────────────────────────────────────────┐
│                  Autenticación de Firebase                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API de Identity Toolkit                                 │  │
│  │  - /v1/accounts:signUp (registro)                       │  │
│  │  - /v1/accounts:signInWithPassword (login)             │  │
│  │  - Hash de contraseñas (bcrypt)                        │  │
│  │  - Almacenamiento de usuarios                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Autenticación

### 1. Flujo de Registro

```
El usuario completa el formulario de registro
         ↓
[Página de Registro] (Client Component)
         ↓
POST a la API de Identity Toolkit de Firebase
  - Email: test@example.com
  - Contraseña: Test123456
  - Nombre: John Doe
         ↓
Firebase valida y crea el usuario
  - Hashea la contraseña con bcrypt
  - Almacena el usuario en la base de datos
  - Devuelve ID de usuario y token
         ↓
Inicia sesión automáticamente con credenciales
  - Llama a signIn("credentials", {...})
         ↓
NextAuth valida las credenciales
  - Llama a la API de Firebase de nuevo
  - Recibe datos del usuario
  - Crea token JWT
         ↓
Token JWT almacenado en cookie HttpOnly
         ↓
Redirige a /dashboard
         ↓
El middleware valida el JWT
         ↓
El Server Component renderiza el dashboard
  - getServerSession() obtiene datos del usuario
  - Muestra información del usuario
```

### 2. Flujo de Login

```
El usuario completa el formulario de login
         ↓
[Página de Login] (Client Component)
         ↓
Llama a signIn("credentials", {email, password})
         ↓
NextAuth llama a CredentialsProvider.authorize()
         ↓
POST a la API de Identity Toolkit de Firebase
  - Email: test@example.com
  - Contraseña: Test123456
         ↓
Firebase valida las credenciales
  - Compara el hash de la contraseña
  - Devuelve datos del usuario si es válido
  - Devuelve error si es inválido
         ↓
NextAuth crea token JWT
  - Firma el token con NEXTAUTH_SECRET
  - Establece expiración (30 días)
         ↓
JWT almacenado en cookie HttpOnly
         ↓
Redirige a /dashboard
         ↓
El middleware valida el JWT
         ↓
El Server Component renderiza el dashboard
```

### 3. Acceso a Rutas Protegidas

```
El usuario navega a /dashboard
         ↓
El navegador envía la solicitud con la cookie JWT
         ↓
El middleware intercepta la solicitud
  - Lee el JWT de la cookie
  - Valida la firma con NEXTAUTH_SECRET
  - Verifica la expiración
         ↓
Si es válido:
  - La solicitud continúa a la página
  - getServerSession() obtiene datos del usuario
  - La página se renderiza con la información del usuario
         ↓
Si es inválido:
  - El middleware redirige a /login
  - Incluye parámetro callbackUrl
  - El usuario es redirigido después del login
```

### 4. Flujo de Logout

```
El usuario hace clic en "Cerrar Sesión"
         ↓
[Barra de Navegación] (Client Component)
         ↓
Llama a signOut({redirect: false})
         ↓
NextAuth limpia la cookie JWT
         ↓
Redirige a la página de inicio
         ↓
El usuario ya no puede acceder a /dashboard
  - El middleware detecta la falta de JWT
  - Redirige a /login
```

---

## Estructura de Archivos y Responsabilidades

```
auth-app/
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   │       └── route.ts              ← Configuración de NextAuth
│   │                                   - Configuración de proveedores
│   │                                   - Estrategia JWT
│   │                                   - Callbacks
│   │
│   ├── login/
│   │   └── page.tsx                  ← Página de Login (Client)
│   │                                   - Formulario email/contraseña
│   │                                   - Botones OAuth
│   │
│   ├── register/
│   │   └── page.tsx                  ← Página de Registro (Client)
│   │                                   - Registro en Firebase
│   │                                   - Auto-login después del registro
│   │
│   ├── dashboard/
│   │   ├── page.tsx                  ← Dashboard Protegido (Server)
│   │   │                               - getServerSession()
│   │   │                               - Mostrar información del usuario
│   │   └── layout.tsx                ← Layout del Dashboard
│   │
│   ├── page.tsx                      ← Página de Inicio (pública)
│   ├── layout.tsx                    ← Layout raíz
│   └── providers.tsx                 ← Wrapper SessionProvider
│
├── components/
│   └── navbar.tsx                    ← Navegación (Client)
│                                       - Hook useSession()
│                                       - Botón de logout
│
├── middleware.ts                     ← Protección de rutas
│                                       - Valida JWT
│                                       - Protege /dashboard
│                                       - Redirige a /login
│
├── types/
│   └── next-auth.d.ts               ← Tipos de TypeScript
│                                       - Extensiones de tipo Session
│                                       - Extensiones de tipo User
│
├── .env.local                        ← Variables de entorno
│                                       - Credenciales de Firebase
│                                       - Secret de NextAuth
│                                       - Credenciales OAuth
│
└── docs/seguridad/
    ├── oauth.md                      ← Explicación de OAuth 2.0
    ├── middleware.md                 ← Guía de protección de rutas
    └── credenciales.md               ← Guía de seguridad de contraseñas
```

---

## Flujo de Datos: Gestión de Sesiones

### Creación de Sesión (Después del Login)

```
1. El usuario envía credenciales
   ↓
2. NextAuth valida con Firebase
   ↓
3. Firebase devuelve datos del usuario:
   {
     localId: "user123",
     email: "test@example.com",
     displayName: "John Doe"
   }
   ↓
4. NextAuth crea payload JWT:
   {
     sub: "user123",
     email: "test@example.com",
     name: "John Doe",
     iat: 1234567890,
     exp: 1234567890 + (30 * 24 * 60 * 60)
   }
   ↓
5. JWT firmado con NEXTAUTH_SECRET
   ↓
6. JWT almacenado en cookie HttpOnly:
   Set-Cookie: next-auth.session-token=eyJhbGc...; HttpOnly; Secure; SameSite=Lax
   ↓
7. Cookie enviada con cada solicitud
```

### Obtención de Sesión (En Componentes)

#### Server Component (Seguro)
```typescript
// app/dashboard/page.tsx
const session = await getServerSession(authOptions);
// Devuelve: { user: { id, email, name }, expires }
// Validado en el servidor - sin exposición al cliente
```

#### Client Component (Para UI)
```typescript
// components/navbar.tsx
const { data: session, status } = useSession();
// Devuelve: { user: { id, email, name }, expires }
// Sincronizado automáticamente con el servidor
```

---

## Características de Seguridad

### 1. Seguridad del Token JWT
- ✅ Firmado con `NEXTAUTH_SECRET`
- ✅ Almacenado en cookies HttpOnly (no accesible vía JavaScript)
- ✅ Flag Secure establecido (solo enviado por HTTPS en producción)
- ✅ Flag SameSite establecido (previene ataques CSRF)
- ✅ Expiración establecida (30 días)

### 2. Seguridad de Contraseñas
- ✅ Nunca almacenadas en texto plano
- ✅ Hasheadas por Firebase usando bcrypt
- ✅ Salt incluido en el hash
- ✅ Transmitidas solo por HTTPS

### 3. Protección de Rutas
- ✅ Middleware valida JWT antes de renderizar
- ✅ Server Components usan `getServerSession()`
- ✅ Usuarios no autorizados redirigidos a login
- ✅ URL de callback preservada para redirigir después del login

### 4. Protección CSRF
- ✅ NextAuth incluye tokens CSRF
- ✅ Cookies SameSite previenen solicitudes entre sitios
- ✅ Headers seguros configurados

### 5. Seguridad de Tipos
- ✅ TypeScript para verificaciones en tiempo de compilación
- ✅ Tipos de NextAuth extendidos para campos personalizados
- ✅ Sin tipos `any` en código de autenticación

---

## Variables de Entorno

```env
# Configuración de NextAuth
NEXTAUTH_URL=http://localhost:3000          # URL de la aplicación
NEXTAUTH_SECRET=secret-codificado-en-base64 # Clave de firma JWT

# Configuración de Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...     # Clave API pública
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...        # Dominio de autenticación
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...         # ID del proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...     # Bucket de almacenamiento
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...# ID del remitente
NEXT_PUBLIC_FIREBASE_APP_ID=...             # ID de la aplicación

# Proveedores OAuth (Opcional)
GITHUB_ID=tu_id_github                      # OAuth de GitHub
GITHUB_SECRET=tu_secret_github
GOOGLE_ID=tu_id_google                      # OAuth de Google
GOOGLE_SECRET=tu_secret_google
```

---

## Tecnologías Clave

| Tecnología | Propósito |
|-----------|---------|
| **Next.js 16** | Framework React con App Router |
| **NextAuth.js 4** | Librería de autenticación |
| **Firebase** | Almacenamiento de usuarios y hash de contraseñas |
| **JWT** | Tokens de sesión sin estado |
| **TypeScript** | Seguridad de tipos |
| **Tailwind CSS** | Estilos |
| **React 19** | Librería de UI |

---

## Consideraciones de Rendimiento

1. **Server Components**: La página del dashboard se renderiza en el servidor (sin retraso de hidratación del cliente)
2. **Middleware**: La protección de rutas ocurre antes de renderizar (eficiente)
3. **Tokens JWT**: Sin estado (no requiere búsqueda en base de datos para validación)
4. **Cookies HttpOnly**: Automáticas con cada solicitud (sin gestión manual de tokens)
5. **Caché de Sesión**: NextAuth cachea datos de sesión (reduce llamadas a API)

---

## Escalabilidad

Esta arquitectura escala bien porque:

1. **Sin estado**: Los tokens JWT no requieren almacenamiento en el servidor
2. **Distribuida**: Puede ejecutarse en múltiples servidores/funciones edge
3. **Firebase**: Maneja almacenamiento de usuarios y escalado
4. **Middleware**: Se ejecuta en edge (Vercel Edge Functions)
5. **Server Components**: Se renderizan bajo demanda (sin sobrecarga de pre-renderizado)

---

## Próximos Pasos

1. **Configurar Firebase** - Ve a `QUICK_START.md`
2. **Probar Localmente** - Ejecuta `npm run dev`
3. **Añadir OAuth** - Configura GitHub/Google (opcional)
4. **Desplegar en Vercel** - Ve a `GITHUB_SETUP.md`
5. **Añadir 2FA** - Implementa autenticación de dos factores
6. **Añadir Roles** - Implementa control de acceso basado en roles

---

## Solución de Problemas

### La sesión no persiste
- Verifica que `NEXTAUTH_SECRET` esté establecido
- Verifica que las cookies estén habilitadas en el navegador
- Revisa la consola del navegador para errores

### El middleware no protege rutas
- Verifica que `middleware.ts` esté en el directorio raíz
- Verifica la configuración de `matcher`
- Reinicia el servidor de desarrollo después de cambios

### Errores de Firebase
- Verifica que las credenciales de Firebase estén en `.env.local`
- Verifica que el proyecto de Firebase tenga Email/Contraseña habilitado
- Verifica que la clave API tenga permisos correctos

---

## Referencias

- [Documentación de NextAuth.js](https://next-auth.js.org/)
- [Autenticación de Firebase](https://firebase.google.com/docs/auth)
- [Middleware de Next.js](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Tokens JWT](https://jwt.io/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
