# 🧪 Guía de Pruebas

Guía completa de pruebas para la aplicación de autenticación.

---

## Requisitos Previos

- Proyecto de Firebase creado y configurado
- Archivo `.env.local` con credenciales de Firebase
- `npm install --legacy-peer-deps` completado
- `npm run dev` ejecutándose en `http://localhost:3000`

---

## Suite de Pruebas 1: Flujo de Registro

### Prueba 1.1: Registro Exitoso

**Pasos:**
1. Navega a `http://localhost:3000`
2. Haz clic en el botón **"Registrarse"**
3. Completa el formulario:
   - **Nombre**: John Doe
   - **Email**: john@example.com
   - **Contraseña**: Test123456
   - **Confirmar Contraseña**: Test123456
4. Haz clic en **"Registrarse"**

**Resultado Esperado:**
- ✅ Usuario creado en Firebase
- ✅ Automáticamente logueado
- ✅ Redirigido a `/dashboard`
- ✅ El dashboard muestra la información del usuario

**Verificación:**
- Revisa Firebase Console → Authentication → Users
- Verifica que el usuario aparece en la lista

---

### Prueba 1.2: Contraseñas No Coinciden

**Pasos:**
1. Navega a `/register`
2. Completa el formulario:
   - **Nombre**: Jane Doe
   - **Email**: jane@example.com
   - **Contraseña**: Test123456
   - **Confirmar Contraseña**: Different123
3. Haz clic en **"Registrarse"**

**Resultado Esperado:**
- ✅ Mensaje de error: "Las contraseñas no coinciden"
- ✅ El formulario permanece en la página
- ✅ Usuario no creado

---

### Prueba 1.3: Contraseña Muy Corta

**Pasos:**
1. Navega a `/register`
2. Completa el formulario:
   - **Nombre**: Bob Smith
   - **Email**: bob@example.com
   - **Contraseña**: Test
   - **Confirmar Contraseña**: Test
3. Haz clic en **"Registrarse"**

**Resultado Esperado:**
- ✅ Mensaje de error: "La contraseña debe tener al menos 6 caracteres"
- ✅ El formulario permanece en la página
- ✅ Usuario no creado

---

### Prueba 1.4: Email Duplicado

**Pasos:**
1. Registra un usuario con email: `duplicate@example.com`
2. Intenta registrarse de nuevo con el mismo email
3. Completa el formulario con el mismo email

**Resultado Esperado:**
- ✅ Mensaje de error: "Este email ya está registrado"
- ✅ El formulario permanece en la página
- ✅ No se crea usuario duplicado

---

### Prueba 1.5: Formato de Email Inválido

**Pasos:**
1. Navega a `/register`
2. Completa el formulario:
   - **Email**: no-es-un-email
   - **Contraseña**: Test123456
3. Intenta enviar

**Resultado Esperado:**
- ✅ La validación del navegador previene el envío
- ✅ Mensaje de error del navegador: "Por favor incluye un '@' en la dirección de correo"

---

## Suite de Pruebas 2: Flujo de Login

### Prueba 2.1: Login Exitoso

**Pasos:**
1. Navega a `http://localhost:3000/login`
2. Completa el formulario:
   - **Email**: john@example.com (de la Prueba 1.1)
   - **Contraseña**: Test123456
3. Haz clic en **"Iniciar Sesión"**

**Resultado Esperado:**
- ✅ Redirigido a `/dashboard`
- ✅ El dashboard muestra la información del usuario
- ✅ La barra de navegación muestra el nombre y email del usuario
- ✅ Botón "Cerrar Sesión" visible

---

### Prueba 2.2: Contraseña Incorrecta

**Pasos:**
1. Navega a `/login`
2. Completa el formulario:
   - **Email**: john@example.com
   - **Contraseña**: ContraseñaIncorrecta123
3. Haz clic en **"Iniciar Sesión"**

**Resultado Esperado:**
- ✅ Mensaje de error: "Email o contraseña incorrectos"
- ✅ El formulario permanece en la página
- ✅ Usuario no logueado

---

### Prueba 2.3: Email No Existe

**Pasos:**
1. Navega a `/login`
2. Completa el formulario:
   - **Email**: noexiste@example.com
   - **Contraseña**: Test123456
3. Haz clic en **"Iniciar Sesión"**

**Resultado Esperado:**
- ✅ Mensaje de error: "Email o contraseña incorrectos"
- ✅ El formulario permanece en la página
- ✅ Usuario no logueado

---

### Prueba 2.4: Campos Vacíos

**Pasos:**
1. Navega a `/login`
2. Deja email y contraseña vacíos
3. Intenta enviar

**Resultado Esperado:**
- ✅ La validación del navegador previene el envío
- ✅ Mensaje de error: "Por favor completa este campo"

---

## Suite de Pruebas 3: Rutas Protegidas

### Prueba 3.1: Acceder al Dashboard Sin Login

**Pasos:**
1. Abre una nueva ventana de navegación privada/incógnita
2. Navega a `http://localhost:3000/dashboard`

**Resultado Esperado:**
- ✅ Redirigido a `/login?callbackUrl=%2Fdashboard`
- ✅ Después del login, redirigido de vuelta a `/dashboard`

---

### Prueba 3.2: Acceder al Dashboard Después del Login

**Pasos:**
1. Inicia sesión con credenciales válidas
2. Navega a `/dashboard`

**Resultado Esperado:**
- ✅ La página del dashboard carga
- ✅ Información del usuario mostrada
- ✅ Características de seguridad listadas

---

### Prueba 3.3: Protección del Middleware

**Pasos:**
1. Abre DevTools del navegador (F12)
2. Ve a Application → Cookies
3. Elimina la cookie `next-auth.session-token`
4. Recarga `/dashboard`

**Resultado Esperado:**
- ✅ Redirigido a `/login`
- ✅ El middleware interceptó la solicitud

---

## Suite de Pruebas 4: Gestión de Sesiones

### Prueba 4.1: Persistencia de Sesión

**Pasos:**
1. Inicia sesión con credenciales válidas
2. Cierra la pestaña del navegador (no el navegador completo)
3. Abre una nueva pestaña y navega a `http://localhost:3000/dashboard`

**Resultado Esperado:**
- ✅ Aún logueado
- ✅ El dashboard se muestra sin necesidad de login

---

### Prueba 4.2: Sesión Entre Pestañas

**Pasos:**
1. Inicia sesión en la Pestaña 1
2. Abre la Pestaña 2 y navega a `/dashboard`

**Resultado Esperado:**
- ✅ La Pestaña 2 muestra el dashboard (sesión compartida)
- ✅ Información del usuario mostrada en ambas pestañas

---

### Prueba 4.3: Logout Limpia la Sesión

**Pasos:**
1. Inicia sesión con credenciales válidas
2. Haz clic en el botón **"Cerrar Sesión"**
3. Intenta acceder a `/dashboard`

**Resultado Esperado:**
- ✅ Redirigido a `/login`
- ✅ Cookie de sesión eliminada
- ✅ No se puede acceder a rutas protegidas

---

## Suite de Pruebas 5: Interfaz de Usuario

### Prueba 5.1: Barra de Navegación Cuando Está Logueado

**Pasos:**
1. Inicia sesión con credenciales válidas
2. Revisa la barra de navegación

**Resultado Esperado:**
- ✅ Nombre del usuario mostrado
- ✅ Email del usuario mostrado
- ✅ Botón "Cerrar Sesión" visible
- ✅ Botón "Iniciar Sesión" NO visible

---

### Prueba 5.2: Barra de Navegación Cuando No Está Logueado

**Pasos:**
1. Cierra sesión o abre una ventana incógnita
2. Revisa la barra de navegación

**Resultado Esperado:**
- ✅ Botón "Iniciar Sesión" visible
- ✅ Información del usuario NO mostrada
- ✅ Botón "Cerrar Sesión" NO visible

---

### Prueba 5.3: Mostrar Información del Dashboard

**Pasos:**
1. Inicia sesión con credenciales válidas
2. Navega a `/dashboard`
3. Revisa todas las secciones

**Resultado Esperado:**
- ✅ Sección "Información de tu Cuenta" muestra:
  - Nombre del usuario
  - Email del usuario
  - ID del usuario
- ✅ Sección "Información de Sesión" muestra:
  - Proveedor (Credenciales)
  - Estado (Autenticado)
  - Tipo de sesión (JWT)
- ✅ Sección "Características de Seguridad" lista todas las características

---

## Suite de Pruebas 6: Navegación

### Prueba 6.1: Navegación de Página de Inicio

**Pasos:**
1. Navega a `http://localhost:3000`
2. Revisa el contenido de la página

**Resultado Esperado:**
- ✅ Página de inicio se muestra
- ✅ Botón "Iniciar Sesión" visible
- ✅ Botón "Registrarse" visible

---

### Prueba 6.2: Navegación de Página de Login

**Pasos:**
1. Navega a `/login`
2. Revisa el contenido de la página

**Resultado Esperado:**
- ✅ Formulario de login se muestra
- ✅ Campo de entrada de email
- ✅ Campo de entrada de contraseña
- ✅ Botón "Iniciar Sesión"
- ✅ Botones OAuth (GitHub, Google)
- ✅ Enlace "Registrarse"

---

### Prueba 6.3: Navegación de Página de Registro

**Pasos:**
1. Navega a `/register`
2. Revisa el contenido de la página

**Resultado Esperado:**
- ✅ Formulario de registro se muestra
- ✅ Campo de entrada de nombre
- ✅ Campo de entrada de email
- ✅ Campo de entrada de contraseña
- ✅ Campo de entrada de confirmación de contraseña
- ✅ Botón "Registrarse"
- ✅ Enlace "Iniciar sesión"

---

## Suite de Pruebas 7: Manejo de Errores

### Prueba 7.1: Error de Conexión a Firebase

**Pasos:**
1. Desconecta internet
2. Intenta iniciar sesión
3. Reconecta internet

**Resultado Esperado:**
- ✅ Mensaje de error mostrado
- ✅ El usuario puede reintentar después de reconectar

---

### Prueba 7.2: Credenciales de Firebase Inválidas

**Pasos:**
1. Modifica `NEXT_PUBLIC_FIREBASE_API_KEY` en `.env.local` a un valor inválido
2. Reinicia `npm run dev`
3. Intenta iniciar sesión

**Resultado Esperado:**
- ✅ Mensaje de error mostrado
- ✅ Indicación clara del problema de configuración

---

## Suite de Pruebas 8: Seguridad

### Prueba 8.1: Contraseña No Visible en Pestaña de Red

**Pasos:**
1. Abre DevTools → Pestaña Network
2. Inicia sesión con credenciales
3. Revisa las solicitudes de red

**Resultado Esperado:**
- ✅ Contraseña no visible en el cuerpo de la solicitud
- ✅ Solicitud enviada a la API de Firebase
- ✅ Respuesta contiene token, no contraseña

---

### Prueba 8.2: Token JWT en Cookies

**Pasos:**
1. Inicia sesión con credenciales
2. Abre DevTools → Application → Cookies
3. Revisa `next-auth.session-token`

**Resultado Esperado:**
- ✅ Cookie existe
- ✅ Cookie es HttpOnly (no accesible vía JavaScript)
- ✅ Cookie es Secure (solo enviada por HTTPS en producción)
- ✅ Cookie tiene flag SameSite

---

### Prueba 8.3: Expiración del Token

**Pasos:**
1. Inicia sesión con credenciales
2. Espera a que el token expire (o modifica la expiración en el código)
3. Intenta acceder a una ruta protegida

**Resultado Esperado:**
- ✅ Redirigido a login
- ✅ Mensaje de sesión expirada (opcional)

---

## Suite de Pruebas 9: Diseño Responsivo

### Prueba 9.1: Vista Móvil

**Pasos:**
1. Abre DevTools → Toggle device toolbar
2. Selecciona dispositivo móvil (iPhone 12)
3. Prueba todas las páginas

**Resultado Esperado:**
- ✅ Todas las páginas responsivas
- ✅ Formularios legibles en móvil
- ✅ Botones clickeables en móvil
- ✅ Sin desplazamiento horizontal

---

### Prueba 9.2: Vista de Tablet

**Pasos:**
1. Abre DevTools → Toggle device toolbar
2. Selecciona dispositivo tablet (iPad)
3. Prueba todas las páginas

**Resultado Esperado:**
- ✅ Todas las páginas responsivas
- ✅ Layout optimizado para tablet
- ✅ Sin problemas de layout

---

## Suite de Pruebas 10: Compatibilidad de Navegadores

### Prueba 10.1: Chrome

**Pasos:**
1. Abre en Chrome
2. Ejecuta todas las pruebas de las Suites 1-9

**Resultado Esperado:**
- ✅ Todas las pruebas pasan

---

### Prueba 10.2: Firefox

**Pasos:**
1. Abre en Firefox
2. Ejecuta todas las pruebas de las Suites 1-9

**Resultado Esperado:**
- ✅ Todas las pruebas pasan

---

### Prueba 10.3: Edge

**Pasos:**
1. Abre en Edge
2. Ejecuta todas las pruebas de las Suites 1-9

**Resultado Esperado:**
- ✅ Todas las pruebas pasan

---

## Suite de Pruebas 11: Rendimiento

### Prueba 11.1: Tiempo de Carga de Página

**Pasos:**
1. Abre DevTools → Pestaña Performance
2. Navega a `/dashboard` mientras estás logueado
3. Registra el rendimiento

**Resultado Esperado:**
- ✅ La página carga en < 2 segundos
- ✅ Sin cambios de layout
- ✅ Animaciones suaves

---

### Prueba 11.2: Rendimiento de Login

**Pasos:**
1. Abre DevTools → Pestaña Performance
2. Inicia sesión con credenciales
3. Registra el rendimiento

**Resultado Esperado:**
- ✅ El login se completa en < 3 segundos
- ✅ Redirección al dashboard suave

---

## Pruebas Automatizadas (Opcional)

### Configurar Jest + React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Ejemplo de Prueba

```typescript
// __tests__/login.test.tsx
import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';

describe('Página de Login', () => {
  it('renderiza el formulario de login', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
  });
});
```

---

## Plantilla de Resultados de Pruebas

```
Suite de Pruebas: [Nombre]
Fecha: [Fecha]
Probador: [Nombre]
Entorno: [Local/Staging/Producción]

Prueba 1: [Nombre]
Estado: ✅ PASÓ / ❌ FALLÓ
Notas: [Cualquier nota]

Prueba 2: [Nombre]
Estado: ✅ PASÓ / ❌ FALLÓ
Notas: [Cualquier nota]

General: ✅ TODAS PASARON / ❌ ALGUNAS FALLARON
Problemas Encontrados: [Lista de problemas]
```

---

## Pruebas Continuas

### Verificaciones Pre-commit
```bash
npm run lint
npm run type-check
npm run build
```

### Verificaciones Pre-despliegue
1. Ejecuta todas las suites de pruebas
2. Revisa métricas de rendimiento
3. Verifica headers de seguridad
4. Prueba en múltiples navegadores
5. Prueba en dispositivos móviles

---

## Solución de Problemas de Pruebas Fallidas

### El login falla con "Email o contraseña incorrectos"
- Verifica que el usuario existe en Firebase Console
- Revisa la ortografía del email
- Verifica que la contraseña es correcta
- Revisa la clave API de Firebase en `.env.local`

### El dashboard no carga
- Revisa que el middleware está protegiendo la ruta
- Verifica el token JWT en las cookies
- Revisa que `NEXTAUTH_SECRET` está establecido
- Reinicia el servidor de desarrollo

### La sesión no persiste
- Revisa que las cookies estén habilitadas
- Verifica que `NEXTAUTH_SECRET` está establecido
- Revisa la consola del navegador para errores
- Limpia las cookies e intenta de nuevo

---

## Puntos de Referencia de Rendimiento

| Métrica | Objetivo | Real |
|---------|----------|------|
| Carga de Página | < 2s | - |
| Login | < 3s | - |
| Dashboard | < 1s | - |
| Logout | < 1s | - |

---

## Lista de Verificación de Seguridad

- [ ] Contraseñas hasheadas en Firebase
- [ ] Tokens JWT en cookies HttpOnly
- [ ] Protección CSRF habilitada
- [ ] Middleware protege rutas
- [ ] Sin datos sensibles en código del cliente
- [ ] HTTPS forzado en producción
- [ ] Variables de entorno no expuestas
- [ ] Sin console.log de datos sensibles

---

## Aprobación

- [ ] Todas las pruebas pasaron
- [ ] Sin problemas críticos
- [ ] Rendimiento aceptable
- [ ] Seguridad verificada
- [ ] Listo para despliegue

**Probado por:** _______________
**Fecha:** _______________
**Estado:** ✅ APROBADO / ❌ NECESITA CORRECCIONES
