# Flujo OAuth 2.0 en NextAuth.js

## ¿Qué es OAuth 2.0?

OAuth 2.0 es un protocolo de autorización abierto que permite a los usuarios autenticarse en aplicaciones de terceros usando sus credenciales de proveedores confiables (como Google, GitHub, etc.) sin compartir sus contraseñas directamente con la aplicación.

## Flujo OAuth 2.0 Paso a Paso

### 1. **El Usuario Hace Clic en "Iniciar Sesión con Google"**
```
Usuario → Aplicación (AuthApp)
```
El usuario hace clic en el botón "Iniciar Sesión con Google" en nuestra aplicación.

### 2. **Redirección a Google**
```
Aplicación → Google OAuth Server
```
NextAuth redirige al usuario a Google con los siguientes parámetros:
- `client_id`: Identificador único de nuestra aplicación registrada en Google
- `redirect_uri`: URL donde Google redirigirá después de autenticar (ej: `http://localhost:3000/api/auth/callback/google`)
- `scope`: Permisos solicitados (ej: `profile`, `email`)
- `state`: Token CSRF para prevenir ataques

### 3. **Autenticación en Google**
```
Google OAuth Server ← Usuario
```
Google muestra su pantalla de login. El usuario ingresa sus credenciales de Google.

### 4. **Consentimiento de Permisos**
```
Google OAuth Server → Usuario
```
Google muestra una pantalla pidiendo permiso para compartir información (nombre, email, foto de perfil).

### 5. **Redirección de Vuelta a la Aplicación**
```
Google OAuth Server → Aplicación (callback)
```
Si el usuario autoriza, Google redirige a la URL de callback con un `authorization_code`:
```
http://localhost:3000/api/auth/callback/google?code=4/0AY22...&state=xyz123
```

### 6. **Intercambio de Código por Token**
```
Aplicación (Backend) → Google OAuth Server
```
NextAuth intercambia el `authorization_code` por un `access_token` y `refresh_token`:
```json
{
  "access_token": "ya29.a0AfH6SMBx...",
  "refresh_token": "1//0gF...",
  "expires_in": 3599,
  "token_type": "Bearer"
}
```

### 7. **Obtención de Información del Usuario**
```
Aplicación (Backend) → Google API
```
Usando el `access_token`, NextAuth obtiene la información del usuario:
```json
{
  "id": "118364144313...",
  "email": "usuario@gmail.com",
  "name": "Juan Pérez",
  "picture": "https://lh3.googleusercontent.com/..."
}
```

### 8. **Creación de Sesión JWT**
```
Aplicación (Backend) → Aplicación (Frontend)
```
NextAuth crea un JWT con los datos del usuario y lo almacena en una cookie HttpOnly:
```
Set-Cookie: next-auth.session-token=eyJhbGciOiJIUzI1NiIs...; HttpOnly; Secure; SameSite=Lax
```

### 9. **Redirección al Dashboard**
```
Aplicación → Usuario
```
El usuario es redirigido a `/dashboard` con la sesión activa.

## Diagrama Completo

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ 1. Clic en "Iniciar Sesión con Google"
       ▼
┌──────────────────────┐
│   AuthApp (Frontend) │
└──────┬───────────────┘
       │ 2. Redirige a Google
       ▼
┌──────────────────────┐
│  Google OAuth Server │
└──────┬───────────────┘
       │ 3. Usuario ingresa credenciales
       │ 4. Usuario autoriza permisos
       │ 5. Redirige con authorization_code
       ▼
┌──────────────────────┐
│  AuthApp (Backend)   │
└──────┬───────────────┘
       │ 6. Intercambia código por token
       │ 7. Obtiene información del usuario
       │ 8. Crea JWT y lo almacena en cookie
       ▼
┌──────────────────────┐
│   Usuario Logueado   │
└──────────────────────┘
```

## Implementación en NextAuth.js

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  // ... resto de configuración
};
```

## Ventajas de OAuth 2.0

✅ **Seguridad**: El usuario nunca comparte su contraseña con nuestra aplicación
✅ **Facilidad**: El usuario no necesita crear otra cuenta
✅ **Confianza**: Usa proveedores confiables como Google o GitHub
✅ **Información Verificada**: Los datos del usuario ya están verificados por el proveedor
✅ **Revocación**: El usuario puede revocar el acceso en cualquier momento

## Riesgos y Mitigaciones

### ⚠️ Riesgo: Ataques CSRF
**Mitigación**: NextAuth incluye el parámetro `state` que valida que la redirección viene del mismo navegador.

### ⚠️ Riesgo: Token Interceptado
**Mitigación**: Los tokens se almacenan en cookies HttpOnly que no pueden ser accedidas por JavaScript.

### ⚠️ Riesgo: Información del Usuario Comprometida
**Mitigación**: Usar HTTPS en producción para encriptar la comunicación.

## Configuración en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de Google+ Identity
4. Crea credenciales OAuth 2.0 (tipo: Aplicación Web)
5. Añade `http://localhost:3000` como origen autorizado
6. Añade `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizado
7. Copia el `Client ID` y `Client Secret` a tu `.env.local`

## Conclusión

OAuth 2.0 es el estándar de la industria para autenticación segura. NextAuth.js simplifica enormemente su implementación, manejando automáticamente todos los detalles de seguridad y flujo.
