import { securefetch } from "./secure-fetch";

interface FirebaseAuthResponse {
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  displayName?: string;
  error?: {
    code?: number;
    message?: string;
  };
}

/**
 * Verifica las credenciales del usuario con Firebase
 */
export async function verifyFirebaseCredentials(
  email: string,
  password: string
): Promise<FirebaseAuthResponse> {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error("Firebase API key not configured");
  }

  const response = await securefetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const data: FirebaseAuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Firebase authentication failed"
    );
  }

  return data;
}

/**
 * Registra un nuevo usuario en Firebase
 */
export async function createFirebaseUser(
  email: string,
  password: string,
  displayName?: string
): Promise<FirebaseAuthResponse> {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error("Firebase API key not configured");
  }

  const response = await securefetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        displayName: displayName || email.split("@")[0],
        returnSecureToken: true,
      }),
    }
  );

  const data: FirebaseAuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Firebase registration failed"
    );
  }

  return data;
}

/**
 * Obtiene información del usuario desde Firebase usando el token ID
 */
export async function getFirebaseUser(idToken: string) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    throw new Error("Firebase API key not configured");
  }

  const response = await securefetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to get user info");
  }

  return data.users?.[0];
}
