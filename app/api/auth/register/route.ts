import { NextRequest, NextResponse } from "next/server";
import { createFirebaseUser } from "../../../../src/utils/firebase-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, displayName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Registrar en Firebase
    const firebaseUser = await createFirebaseUser(
      email,
      password,
      displayName
    );

    // Crear respuesta con cookie
    const user = {
      id: firebaseUser.localId,
      email: firebaseUser.email,
      name: firebaseUser.displayName || email.split("@")[0],
    };

    const response = NextResponse.json({
      success: true,
      user,
      token: firebaseUser.idToken,
    });

    // Guardar token en cookie
    response.cookies.set("auth-token", firebaseUser.idToken || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 días
    });
    response.cookies.set("auth-user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 días
    });

    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al procesar la solicitud";
    console.error("Error en register:", errorMessage);

    // Manejar errores específicos de Firebase
    if (errorMessage.includes("EMAIL_EXISTS")) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}
