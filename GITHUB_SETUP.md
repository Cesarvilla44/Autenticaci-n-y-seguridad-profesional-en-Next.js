# 🚀 Guía para Subir a GitHub y Desplegar en Vercel

## Paso 1: Preparar el Repositorio Local

### 1.1 Inicializar Git

```bash
cd auth-app
git init
```

### 1.2 Crear .gitignore

El proyecto ya tiene `.gitignore`, pero verifica que incluya:

```
node_modules/
.env.local
.env.*.local
.next/
out/
build/
dist/
*.log
.DS_Store
```

### 1.3 Hacer el Primer Commit

```bash
git add .
git commit -m "Initial commit: Professional authentication app with NextAuth, Firebase, and OAuth"
```

## Paso 2: Crear Repositorio en GitHub

### 2.1 Crear Repositorio

1. Ve a [GitHub](https://github.com/new)
2. Nombre del repositorio: `auth-app`
3. Descripción: "Professional authentication app with NextAuth.js, Firebase, and OAuth 2.0"
4. Selecciona "Public" o "Private"
5. NO inicialices con README (ya lo tenemos)
6. Haz clic en "Create repository"

### 2.2 Conectar Repositorio Local

Después de crear el repositorio, GitHub te mostrará comandos. Ejecuta:

```bash
git remote add origin https://github.com/tu-usuario/auth-app.git
git branch -M main
git push -u origin main
```

Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.

## Paso 3: Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Verifica que todos los archivos estén presentes
3. Verifica que el README se muestre correctamente

## Paso 4: Desplegar en Vercel

### 4.1 Conectar a Vercel

1. Ve a [Vercel](https://vercel.com/)
2. Haz clic en "New Project"
3. Haz clic en "Import Git Repository"
4. Busca y selecciona `auth-app`
5. Haz clic en "Import"

### 4.2 Configurar Variables de Entorno

En la página de configuración del proyecto:

1. Ve a "Environment Variables"
2. Añade todas las variables de `.env.local`:

```
NEXTAUTH_URL=https://tu-app.vercel.app
NEXTAUTH_SECRET=tu-secret-generado
GITHUB_ID=tu-github-id
GITHUB_SECRET=tu-github-secret
GOOGLE_ID=tu-google-id
GOOGLE_SECRET=tu-google-secret
NEXT_PUBLIC_FIREBASE_API_KEY=tu-firebase-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-firebase-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-firebase-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-firebase-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-firebase-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-firebase-app-id
```

3. Haz clic en "Deploy"

### 4.3 Esperar el Despliegue

Vercel compilará y desplegará tu aplicación. Esto puede tomar 2-5 minutos.

Una vez completado, verás un URL como: `https://auth-app-xxxxx.vercel.app`

## Paso 5: Actualizar URLs de Callback

### 5.1 GitHub OAuth

1. Ve a [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Selecciona tu aplicación
3. Actualiza "Authorization callback URL":
   ```
   https://tu-app.vercel.app/api/auth/callback/github
   ```
4. Haz clic en "Update application"

### 5.2 Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a "Credenciales"
4. Selecciona tu aplicación OAuth
5. Actualiza "URIs de redirección autorizados":
   ```
   https://tu-app.vercel.app/api/auth/callback/google
   ```
6. Haz clic en "Guardar"

### 5.3 Actualizar NEXTAUTH_URL en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a "Settings" → "Environment Variables"
3. Actualiza `NEXTAUTH_URL` a tu URL de Vercel
4. Haz clic en "Save"
5. Vercel redesplegará automáticamente

## Paso 6: Probar la Aplicación Desplegada

1. Ve a tu URL de Vercel
2. Prueba el registro
3. Prueba el login con credenciales
4. Prueba el login con GitHub
5. Prueba el login con Google
6. Verifica que el dashboard funcione

## Paso 7: Configurar Despliegue Automático

Vercel ya está configurado para desplegar automáticamente cuando hagas push a `main`.

Para hacer cambios:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Vercel automáticamente:
1. Detectará los cambios
2. Compilará el proyecto
3. Ejecutará pruebas (si las hay)
4. Desplegará la nueva versión

## Paso 8: Monitoreo y Logs

### Ver Logs de Despliegue

1. Ve a tu proyecto en Vercel
2. Ve a "Deployments"
3. Haz clic en el despliegue más reciente
4. Ve a "Logs" para ver detalles

### Ver Logs en Tiempo Real

1. Ve a "Functions" para ver logs de API Routes
2. Ve a "Analytics" para ver métricas

## Paso 9: Configuración Adicional (Opcional)

### Dominio Personalizado

1. Ve a "Settings" → "Domains"
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### Protección de Rama

En GitHub:

1. Ve a "Settings" → "Branches"
2. Añade una regla de protección para `main`
3. Requiere pull requests antes de merge
4. Requiere revisiones de código

### Configurar CI/CD

Vercel ya incluye CI/CD automático, pero puedes añadir:

1. GitHub Actions para pruebas
2. Verificación de tipos TypeScript
3. Linting automático

## Solución de Problemas

### Error: "Redirect URI mismatch"

**Solución**: Verifica que la URL de callback en GitHub/Google coincida exactamente con la de Vercel.

### Error: "NEXTAUTH_SECRET not found"

**Solución**: Verifica que `NEXTAUTH_SECRET` esté configurado en Vercel.

### Error: "Firebase API Key not found"

**Solución**: Verifica que todas las variables de Firebase estén configuradas en Vercel.

### El login no funciona en Vercel

**Solución**:
1. Verifica que `NEXTAUTH_URL` sea la URL de Vercel
2. Verifica que las URLs de callback estén actualizadas
3. Revisa los logs en Vercel

### Cambios no se reflejan después de push

**Solución**:
1. Verifica que el push fue exitoso: `git log`
2. Verifica que Vercel está desplegando: Ve a "Deployments"
3. Limpia el caché del navegador: Ctrl+Shift+Delete

## Próximos Pasos

- [ ] Configurar dominio personalizado
- [ ] Configurar protección de rama en GitHub
- [ ] Añadir GitHub Actions para CI/CD
- [ ] Configurar alertas de Vercel
- [ ] Documentar el proceso de despliegue
- [ ] Crear guía de contribución

## Recursos Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de GitHub](https://docs.github.com/)
- [Documentación de NextAuth.js](https://next-auth.js.org/)
- [Documentación de Firebase](https://firebase.google.com/docs)

---

¡Tu aplicación está lista para ser compartida con el mundo! 🚀
