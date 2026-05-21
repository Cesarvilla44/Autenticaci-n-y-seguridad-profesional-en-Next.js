# Guía de Configuración - AuthApp

Esta guía te ayudará a configurar la aplicación con autenticación profesional usando NextAuth.js, Firebase y OAuth.

## Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Cuentas en:
  - [Firebase Console](https://console.firebase.google.com/)
  - [GitHub Developer Settings](https://github.com/settings/developers)
  - [Google Cloud Console](https://console.cloud.google.com/)

## Paso 1: Configuración de Firebase

### 1.1 Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Ingresa un nombre (ej: "auth-app")
4. Desactiva Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### 1.2 Habilitar Autenticación por Email/Contraseña

1. En el panel de Firebase, ve a "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Proveedores de signos"
4. Haz clic en "Email/Contraseña"
5. Activa "Email/Contraseña"
6. Haz clic en "Guardar"

### 1.3 Obtener Credenciales de Firebase

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Ve a la pestaña "General"
3. Desplázate hasta "Tus aplicaciones"
4. Haz clic en "Aplicación web" (ícono `</>`
5. Copia la configuración que aparece

Debería verse así:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "auth-app-xxxxx.firebaseapp.com",
  projectId: "auth-app-xxxxx",
  storageBucket: "auth-app-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 1.4 Obtener API Key para Identity Toolkit

1. Ve a "Configuración del proyecto"
2. Ve a la pestaña "Claves de API"
3. Copia la "Clave de API del navegador"

## Paso 2: Configuración de GitHub OAuth (Opcional)

### 2.1 Crear Aplicación OAuth en GitHub

1. Ve a [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Haz clic en "New OAuth App"
3. Completa el formulario:
   - **Application name**: AuthApp
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Haz clic en "Register application"

### 2.2 Obtener Credenciales

1. Copia el "Client ID"
2. Haz clic en "Generate a new client secret"
3. Copia el "Client Secret"

## Paso 3: Configuración de Google OAuth (Opcional)

### 3.1 Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en "Crear proyecto"
3. Ingresa un nombre (ej: "auth-app")
4. Haz clic en "Crear"

### 3.2 Habilitar Google+ API

1. Ve a "APIs y servicios"
2. Haz clic en "Habilitar APIs y servicios"
3. Busca "Google+ API"
4. Haz clic en "Habilitar"

### 3.3 Crear Credenciales OAuth

1. Ve a "Credenciales"
2. Haz clic en "Crear credenciales" → "ID de cliente OAuth"
3. Selecciona "Aplicación web"
4. Completa:
   - **Orígenes autorizados de JavaScript**: `http://localhost:3000`
   - **URIs de redirección autorizados**: `http://localhost:3000/api/auth/callback/google`
5. Haz clic en "Crear"

### 3.4 Obtener Credenciales

1. Copia el "ID de cliente"
2. Copia la "Contraseña de cliente"

## Paso 4: Configurar Variables de Entorno

### 4.1 Generar NEXTAUTH_SECRET

En tu terminal, ejecuta:

```bash
# En Windows (PowerShell)
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Out-String

# O usa openssl si lo tienes instalado
openssl rand -base64 32
```

### 4.2 Actualizar .env.local

Abre el archivo `.env.local` y completa con tus credenciales:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado-arriba

# GitHub OAuth
GITHUB_ID=tu_github_client_id
GITHUB_SECRET=tu_github_client_secret

# Google OAuth
GOOGLE_ID=tu_google_client_id
GOOGLE_SECRET=tu_google_client_secret

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_firebase_app_id
```

## Paso 5: Ejecutar la Aplicación

### 5.1 Instalar Dependencias

```bash
npm install --legacy-peer-deps
```

### 5.2 Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Paso 6: Probar la Aplicación

### 6.1 Página de Inicio

1. Ve a `http://localhost:3000`
2. Deberías ver la página de inicio con opciones de login

### 6.2 Registro

1. Haz clic en "Registrarse"
2. Completa el formulario con:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Contraseña: MiContraseña123
3. Haz clic en "Registrarse"

### 6.3 Login con Credenciales

1. Ve a `http://localhost:3000/login`
2. Ingresa el email y contraseña que registraste
3. Deberías ser redirigido a `/dashboard`

### 6.4 Login con OAuth

1. Ve a `http://localhost:3000/login`
2. Haz clic en "GitHub" o "Google"
3. Autoriza la aplicación
4. Deberías ser redirigido a `/dashboard`

### 6.5 Dashboard Protegido

1. En `/dashboard` deberías ver:
   - Tu información de usuario
   - Información de sesión
   - Características de seguridad

### 6.6 Cerrar Sesión

1. Haz clic en "Cerrar Sesión" en la barra de navegación
2. Deberías ser redirigido a la página de inicio

## Paso 7: Desplegar en Vercel

### 7.1 Preparar Repositorio

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/auth-app.git
git push -u origin main
```

### 7.2 Conectar a Vercel

1. Ve a [Vercel](https://vercel.com/)
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Haz clic en "Import"

### 7.3 Configurar Variables de Entorno

1. En Vercel, ve a "Settings" → "Environment Variables"
2. Añade todas las variables de `.env.local`
3. Haz clic en "Deploy"

### 7.4 Actualizar URLs de Callback

Después de desplegar, actualiza:

**En GitHub:**
- Authorization callback URL: `https://tu-app.vercel.app/api/auth/callback/github`

**En Google Cloud:**
- URIs de redirección autorizados: `https://tu-app.vercel.app/api/auth/callback/google`

**En .env.local (para producción):**
```env
NEXTAUTH_URL=https://tu-app.vercel.app
```

## Solución de Problemas

### Error: "Firebase API Key not found"

**Solución**: Verifica que `NEXT_PUBLIC_FIREBASE_API_KEY` esté en `.env.local`

### Error: "Invalid client_id"

**Solución**: Verifica que `GITHUB_ID` y `GOOGLE_ID` sean correctos

### Error: "Redirect URI mismatch"

**Solución**: Asegúrate de que las URLs de callback coincidan exactamente en GitHub/Google

### Error: "NEXTAUTH_SECRET not found"

**Solución**: Genera un nuevo secret con `openssl rand -base64 32`

### El login no funciona

**Solución**: 
1. Verifica que Firebase esté habilitado
2. Verifica que el email esté registrado en Firebase
3. Revisa la consola del navegador para errores

## Documentación

Consulta los archivos de documentación en `docs/seguridad/`:

- `oauth.md` - Explicación del flujo OAuth 2.0
- `middleware.md` - Protección de rutas con middleware
- `credenciales.md` - Gestión segura de contraseñas

## Próximos Pasos

- Implementar 2FA (Two-Factor Authentication)
- Añadir más proveedores OAuth (Microsoft, Apple, etc.)
- Implementar refresh tokens
- Añadir roles y permisos
- Implementar auditoría de seguridad

¡Felicidades! Tu aplicación con autenticación profesional está lista. 🎉
