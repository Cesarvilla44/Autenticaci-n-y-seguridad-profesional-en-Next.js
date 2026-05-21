# 🚀 Guía de Inicio Rápido - Configuración de Firebase y Pruebas

Esta guía te ayudará a poner la aplicación de autenticación en funcionamiento en 5 minutos.

## Requisitos Previos

- Node.js 18+ instalado
- npm instalado
- Una [cuenta de Firebase](https://firebase.google.com/)

---

## Paso 1: Crear Proyecto en Firebase (2 minutos)

### 1.1 Crear el Proyecto
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Crear proyecto"**
3. Ingresa el nombre: `auth-app` (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Haz clic en **"Crear proyecto"** y espera a que se complete

### 1.2 Habilitar Autenticación por Email/Contraseña
1. En Firebase Console, ve a **"Authentication"**
2. Haz clic en **"Comenzar"**
3. Haz clic en el proveedor **"Email/Contraseña"**
4. Activa el toggle **"Habilitar"**
5. Haz clic en **"Guardar"**

### 1.3 Obtener Credenciales de Firebase
1. Ve a **"Configuración del proyecto"** (ícono de engranaje ⚙️)
2. Ve a la pestaña **"General"**
3. Desplázate hasta la sección **"Tus aplicaciones"**
4. Haz clic en el ícono de aplicación web `</>`
5. Copia toda la configuración

Verás algo como esto:
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

---

## Paso 2: Configurar Variables de Entorno (1 minuto)

### 2.1 Generar NEXTAUTH_SECRET

Abre PowerShell y ejecuta:
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Out-String
```

Copia el resultado (será una cadena larga).

### 2.2 Actualizar `.env.local`

Abre el archivo `.env.local` en tu proyecto y reemplaza los valores:

```env
# Configuración de NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=pega-tu-secret-generado-aqui

# GitHub OAuth (opcional - déjalo como está por ahora)
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Google OAuth (opcional - déjalo como está por ahora)
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret

# Configuración de Firebase (REEMPLAZA ESTOS)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auth-app-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=auth-app-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=auth-app-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**Importante**: Reemplaza los valores de Firebase con los que copiaste de Firebase Console.

---

## Paso 3: Instalar Dependencias (1 minuto)

Abre la terminal en el directorio del proyecto y ejecuta:

```bash
npm install --legacy-peer-deps
```

---

## Paso 4: Ejecutar la Aplicación (1 minuto)

```bash
npm run dev
```

Deberías ver:
```
▲ Next.js 16.2.6
- Local:        http://localhost:3000
```

Abre tu navegador y ve a `http://localhost:3000`

---

## Paso 5: Probar la Aplicación (1 minuto)

### Probar Registro
1. Haz clic en **"Registrarse"**
2. Completa el formulario:
   - **Nombre**: Tu nombre
   - **Email**: test@example.com
   - **Contraseña**: Test123456
   - **Confirmar Contraseña**: Test123456
3. Haz clic en **"Registrarse"**
4. Deberías ser redirigido a `/dashboard`

### Probar Login
1. Haz clic en **"Cerrar Sesión"** en la barra de navegación
2. Serás redirigido a la página de inicio
3. Haz clic en **"Iniciar Sesión"**
4. Ingresa:
   - **Email**: test@example.com
   - **Contraseña**: Test123456
5. Haz clic en **"Iniciar Sesión"**
6. Deberías ver el dashboard con tu información

### Probar Rutas Protegidas
1. Intenta acceder a `http://localhost:3000/dashboard` sin estar logueado
2. Deberías ser redirigido a `/login`
3. Después de loguearte, puedes acceder a `/dashboard`

### Probar Logout
1. Haz clic en **"Cerrar Sesión"** en la barra de navegación
2. Serás redirigido a la página de inicio
3. Intentar acceder a `/dashboard` te redirigirá a `/login`

---

## ✅ Lista de Verificación de Éxito

- [ ] Proyecto de Firebase creado
- [ ] Autenticación por Email/Contraseña habilitada
- [ ] Credenciales de Firebase copiadas a `.env.local`
- [ ] NEXTAUTH_SECRET generado y añadido a `.env.local`
- [ ] `npm install --legacy-peer-deps` completado
- [ ] `npm run dev` ejecutándose sin errores
- [ ] El registro funciona
- [ ] El login funciona
- [ ] El dashboard está protegido
- [ ] El logout funciona

---

## 🔧 Solución de Problemas

### Error: "Firebase API Key not found"
**Solución**: Verifica que `NEXT_PUBLIC_FIREBASE_API_KEY` esté en `.env.local` con el valor correcto.

### Error: "Email o contraseña incorrectos"
**Solución**: Asegúrate de registrar el usuario primero antes de intentar iniciar sesión.

### Error: "NEXTAUTH_SECRET not found"
**Solución**: Genera un nuevo secret y añádelo a `.env.local`.

### La aplicación no inicia
**Solución**: 
1. Elimina la carpeta `node_modules`
2. Ejecuta `npm install --legacy-peer-deps` de nuevo
3. Ejecuta `npm run dev`

### El puerto 3000 ya está en uso
**Solución**: Ejecuta `npm run dev -- -p 3001` para usar un puerto diferente.

---

## 📚 Próximos Pasos

### Opcional: Configurar Proveedores OAuth

#### GitHub OAuth
1. Ve a [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Haz clic en **"New OAuth App"**
3. Completa:
   - **Application name**: AuthApp
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copia **Client ID** y **Client Secret**
5. Actualiza `.env.local`:
   ```env
   GITHUB_ID=tu_client_id
   GITHUB_SECRET=tu_client_secret
   ```
6. Reinicia `npm run dev`
7. Prueba el botón de login con GitHub

#### Google OAuth
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Google+ API**
4. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente OAuth**
5. Selecciona **Aplicación web**
6. Añade URI de redirección autorizado: `http://localhost:3000/api/auth/callback/google`
7. Copia **Client ID** y **Client Secret**
8. Actualiza `.env.local`:
   ```env
   GOOGLE_ID=tu_client_id
   GOOGLE_SECRET=tu_client_secret
   ```
9. Reinicia `npm run dev`
10. Prueba el botón de login con Google

### Desplegar en Vercel
Ve a `GITHUB_SETUP.md` para instrucciones de despliegue.

### Aprender Más
- `SETUP.md` - Guía de configuración detallada
- `README.md` - Descripción general del proyecto
- `docs/seguridad/` - Documentación de seguridad

---

## 🎉 ¡Listo!

Tu aplicación de autenticación profesional está en funcionamiento. Tienes:

✅ Autenticación por Email/Contraseña con Firebase
✅ Rutas protegidas con middleware
✅ Gestión de sesiones de usuario
✅ Tokens JWT seguros
✅ Interfaz profesional con Tailwind CSS
✅ Soporte completo de TypeScript
✅ Listo para integración con OAuth

¡Felicidades! 🚀
