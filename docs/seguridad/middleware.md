# Protección de Rutas con Middleware en Next.js

## ¿Qué es un Middleware?

Un middleware es una función que se ejecuta **antes** de que una solicitud HTTP llegue a tu aplicación. En Next.js, los middlewares se ejecutan en el Edge (cerca del usuario), lo que los hace extremadamente rápidos y seguros.

## Protección a Nivel de Middleware vs Cliente

### ❌ Protección Solo en Cliente (INSEGURO)

```typescript
// ❌ MAL: Protección solo en useEffect
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return <div>Dashboard</div>;
}
```

**Problemas:**
1. **Parpadeo**: El usuario ve el contenido protegido por un momento antes de ser redirigido
2. **Exposición de Datos**: El componente se renderiza antes de validar la sesión
3. **Vulnerabilidad**: Un atacante podría interceptar la solicitud y acceder a datos sensibles
4. **Lentitud**: La validación ocurre en el cliente, después de descargar todo el JavaScript

### ✅ Protección en Middleware (SEGURO)

```typescript
// ✅ BIEN: Protección en middleware
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

**Ventajas:**
1. **Sin Parpadeo**: La redirección ocurre antes de renderizar
2. **Seguridad**: Los datos nunca se exponen a usuarios no autenticados
3. **Velocidad**: La validación ocurre en el Edge, cerca del usuario
4. **Eficiencia**: No se renderiza contenido innecesario

## Cómo Funciona el Middleware en Next.js

### Flujo de Solicitud

```
Usuario hace solicitud a /dashboard
         ↓
┌─────────────────────────────────┐
│  Middleware (Edge)              │
│  - Valida sesión                │
│  - Verifica token JWT           │
│  - Redirige si no autenticado   │
└─────────────────────────────────┘
         ↓
    ¿Autenticado?
    /    \
  SÍ      NO
  ↓       ↓
Renderiza  Redirige a
Dashboard  /login
```

## Implementación en Nuestra Aplicación

### 1. Archivo middleware.ts

```typescript
// middleware.ts (en la raíz del proyecto)
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protege /dashboard y todas sus subrutas
  matcher: ["/dashboard/:path*"],
};
```

### 2. Validación en Server Component

```typescript
// app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
```

## Diferencias Clave

| Aspecto | Middleware | Cliente |
|--------|-----------|---------|
| **Ejecución** | Edge (servidor) | Navegador |
| **Velocidad** | Muy rápido | Más lento |
| **Seguridad** | Muy seguro | Vulnerable |
| **Parpadeo** | No | Sí |
| **Exposición de Datos** | No | Sí |
| **Validación** | Antes de renderizar | Después de renderizar |

## Riesgos de Protección Solo en Cliente

### 1. **Parpadeo de Contenido**
El usuario ve el dashboard por un momento antes de ser redirigido.

### 2. **Exposición de Datos Sensibles**
```typescript
// ❌ INSEGURO: Los datos se cargan antes de validar
export default function DashboardPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Esto se ejecuta ANTES de validar la sesión
    fetch("/api/user-data").then(res => setUserData(res.json()));
  }, []);

  // Si no hay sesión, el usuario ve los datos por un momento
  return <div>{userData?.email}</div>;
}
```

### 3. **Ataques de Fuerza Bruta**
Un atacante podría intentar acceder a `/dashboard` múltiples veces sin ser bloqueado en el middleware.

### 4. **Consumo de Recursos**
Se renderiza contenido innecesario que luego se descarta.

## Mejores Prácticas

### ✅ Usa Middleware para Rutas Protegidas
```typescript
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/protected/:path*",
  ],
};
```

### ✅ Valida en Server Components
```typescript
export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return <div>Contenido protegido</div>;
}
```

### ✅ Usa useSession en Client Components para UI
```typescript
"use client";
import { useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();
  
  // Solo para mostrar UI, no para proteger datos
  return <div>{session?.user?.name}</div>;
}
```

### ❌ NO Protejas Datos Sensibles Solo en Cliente
```typescript
// ❌ NUNCA hagas esto
"use client";
export default function SensitiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!session) return; // Demasiado tarde, ya se renderizó
    fetch("/api/sensitive").then(res => setData(res.json()));
  }, [session]);

  return <div>{data}</div>;
}
```

## Conclusión

La protección de rutas debe ocurrir en **múltiples niveles**:

1. **Middleware**: Valida la sesión antes de renderizar
2. **Server Components**: Obtiene datos sensibles en el servidor
3. **Client Components**: Usa `useSession` solo para UI

Esta estrategia de defensa en profundidad garantiza que tu aplicación sea segura, rápida y proporcione una buena experiencia de usuario.
