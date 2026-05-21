# Gestión Segura de Credenciales y Contraseñas

## ¿Por Qué NUNCA Guardar Contraseñas en Texto Plano?

### El Riesgo

Si almacenas contraseñas en texto plano en tu base de datos:

1. **Brechas de Seguridad**: Si alguien accede a tu base de datos, obtiene todas las contraseñas
2. **Reutilización de Contraseñas**: Los usuarios usan la misma contraseña en múltiples sitios
3. **Responsabilidad Legal**: Violas regulaciones como GDPR, CCPA, etc.
4. **Confianza**: Los usuarios pierden confianza en tu aplicación

### Ejemplo de Desastre

```
Base de datos comprometida:
┌─────────────┬──────────────────┐
│ Email       │ Contraseña       │
├─────────────┼──────────────────┤
│ juan@ex.com │ MiContraseña123  │ ← ¡EXPUESTA!
│ ana@ex.com  │ Password456      │ ← ¡EXPUESTA!
└─────────────┴──────────────────┘

Atacante ahora puede:
- Acceder a la cuenta del usuario
- Intentar la misma contraseña en Gmail, Facebook, etc.
- Vender las credenciales en el mercado negro
```

## Hashing de Contraseñas

### ¿Qué es Hashing?

Hashing es una función matemática que convierte una contraseña en una cadena de caracteres única e irreversible.

```
Contraseña: "MiContraseña123"
         ↓ (función hash)
Hash: "$2b$12$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ee3O2eB/pZm2Oy"
```

**Características importantes:**
- ✅ Irreversible: No se puede obtener la contraseña del hash
- ✅ Determinista: La misma contraseña siempre produce el mismo hash
- ✅ Rápido de calcular: Pero lento a propósito (para evitar ataques)
- ✅ Único: Cambios mínimos en la entrada producen hashes completamente diferentes

### Ejemplo de Base de Datos Segura

```
Base de datos segura:
┌─────────────┬──────────────────────────────────────────────┐
│ Email       │ Hash de Contraseña                           │
├─────────────┼──────────────────────────────────────────────┤
│ juan@ex.com │ $2b$12$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi │
│ ana@ex.com  │ $2b$12$K8m2dJPz1hi.VSMMX4lh3PPST9/PgBkqquzi │
└─────────────┴──────────────────────────────────────────────┘

Incluso si se compromete, el atacante solo obtiene hashes.
```

## Algoritmos de Hashing: bcrypt vs Argon2

### bcrypt

**¿Qué es?**
bcrypt es un algoritmo de hashing de contraseñas basado en el cifrado Blowfish. Es el estándar de la industria desde 2006.

**Características:**
- ✅ Lento a propósito (adaptativo)
- ✅ Incluye "salt" automáticamente
- ✅ Ampliamente soportado
- ✅ Seguro contra ataques de fuerza bruta

**Ejemplo:**
```typescript
import bcrypt from "bcrypt";

// Registrar usuario
const password = "MiContraseña123";
const hashedPassword = await bcrypt.hash(password, 10);
// Resultado: $2b$10$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ee3O2eB/pZm2Oy

// Verificar contraseña
const isValid = await bcrypt.compare(password, hashedPassword);
// Resultado: true
```

### Argon2

**¿Qué es?**
Argon2 es un algoritmo más moderno (ganador de Password Hashing Competition 2015) que es más resistente a ataques.

**Características:**
- ✅ Más seguro que bcrypt
- ✅ Resistente a ataques GPU y ASIC
- ✅ Configurable (tiempo, memoria, paralelismo)
- ✅ Recomendado por OWASP

**Ejemplo:**
```typescript
import argon2 from "argon2";

// Registrar usuario
const password = "MiContraseña123";
const hashedPassword = await argon2.hash(password);
// Resultado: $argon2id$v=19$m=65540,t=3,p=4$...

// Verificar contraseña
const isValid = await argon2.verify(hashedPassword, password);
// Resultado: true
```

### Comparación

| Aspecto | bcrypt | Argon2 |
|--------|--------|--------|
| **Antigüedad** | 2006 | 2015 |
| **Seguridad** | Muy buena | Excelente |
| **Velocidad** | Lenta | Muy lenta |
| **Resistencia GPU** | Buena | Excelente |
| **Configurabilidad** | Limitada | Alta |
| **Adopción** | Muy alta | Creciente |
| **Recomendación OWASP** | Sí | Sí (preferida) |

## ¿Qué es un "Salt"?

### El Problema sin Salt

```
Contraseña: "password123"
Hash: "5f4dcc3b5aa765d61d8327deb882cf99"

Si dos usuarios tienen la misma contraseña:
Usuario 1: "password123" → "5f4dcc3b5aa765d61d8327deb882cf99"
Usuario 2: "password123" → "5f4dcc3b5aa765d61d8327deb882cf99"

¡Los hashes son idénticos! Un atacante puede identificar usuarios
con la misma contraseña.
```

### La Solución: Salt

Un "salt" es una cadena aleatoria que se añade a la contraseña antes de hashearla.

```
Salt: "a7f3k9m2"
Contraseña: "password123"
Entrada: "password123a7f3k9m2"
Hash: "7x9dcc3b5aa765d61d8327deb882cf99"

Usuario 1: "password123" + salt1 → hash1
Usuario 2: "password123" + salt2 → hash2

¡Los hashes son diferentes aunque la contraseña sea igual!
```

### Cómo Funciona bcrypt con Salt

```typescript
// bcrypt genera un salt automáticamente
const hashedPassword = await bcrypt.hash("password123", 10);
// $2b$10$R9h7cIPz0gi.URNNX3kh2O... ← El salt está incluido en el hash

// Cuando verificas, bcrypt extrae el salt del hash
const isValid = await bcrypt.compare("password123", hashedPassword);
```

## Implementación en Nuestra Aplicación

### Registro Seguro con Firebase

```typescript
// app/register/page.tsx
const signUpRes = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      displayName: formData.displayName,
      returnSecureToken: true,
    }),
  }
);
```

**¿Por qué Firebase?**
- ✅ Firebase maneja el hashing automáticamente
- ✅ Usa algoritmos seguros (scrypt)
- ✅ Incluye salt automáticamente
- ✅ Cumple con estándares de seguridad

### Verificación Segura

```typescript
// app/api/auth/[...nextauth]/route.ts
async authorize(credentials) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        returnSecureToken: true,
      }),
    }
  );

  const user = await res.json();
  
  // Firebase verifica el hash automáticamente
  if (res.ok && user.localId) {
    return { id: user.localId, email: user.email };
  }
  
  return null;
}
```

## Mejores Prácticas

### ✅ SIEMPRE

- ✅ Hashea todas las contraseñas antes de guardarlas
- ✅ Usa bcrypt o Argon2
- ✅ Incluye salt (automático en bcrypt/Argon2)
- ✅ Usa HTTPS en producción
- ✅ Implementa rate limiting en login
- ✅ Usa cookies HttpOnly para sesiones
- ✅ Implementa 2FA para cuentas sensibles

### ❌ NUNCA

- ❌ Guardes contraseñas en texto plano
- ❌ Encriptes contraseñas (usa hashing)
- ❌ Compartas contraseñas por email
- ❌ Permitas contraseñas débiles
- ❌ Registres contraseñas en logs
- ❌ Envíes contraseñas en URLs
- ❌ Almacenes contraseñas en cookies normales

## Conclusión

La gestión segura de contraseñas es fundamental para la seguridad de tu aplicación. Usa Firebase, bcrypt o Argon2, y nunca guardes contraseñas en texto plano. Tus usuarios te lo agradecerán.
