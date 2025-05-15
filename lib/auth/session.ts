import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "../definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Function to encrypt a session
 * @param payload - The payload to encrypt
 * @returns The encrypted session
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Function to decrypt a session
 * @param session - The session to decrypt
 * @returns The payload of the session or null if the session is invalid
 */
export async function decrypt(
  session: string | undefined = ""
): Promise<(JWTPayload & SessionPayload) | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & SessionPayload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

/**
 * Function to create a new session
 * @param payload - The payload to encrypt
 * @returns void
 */
export async function createSession(
  payload: Omit<SessionPayload, "expiresAt">
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...payload, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Function to delete a session
 * @returns void
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
