/**
 * Realiza una solicitud HTTPS con verificación de certificados correcta
 * En Node.js 18+, fetch ya verifica certificados por defecto
 * @param url - URL de la solicitud
 * @param options - Opciones de fetch (method, headers, body, etc.)
 * @returns Response
 */
export async function securefetch(
  url: string | URL,
  options?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...options,
  });
}

// Para desarrollo si es necesario desactivar temporalmente (NO RECOMENDADO en producción)
export function disableCertificateVerification() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Para reactivar la verificación
export function enableCertificateVerification() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
}
