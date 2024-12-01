import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = "secret";
const key = new TextEncoder().encode(secret);
// 12 hours
const EXPIRES_IN = 1000 * 60 * 60 * 12 * 1;

export const encrypt = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires as Date)
    .sign(key);
};

export const decrypt = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email === "" || password === "") {
    throw new Error("Email and password are required");
  }

  const user = {
    email,
    password,
  };

  const expires = new Date(Date.now() + EXPIRES_IN);
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, {
    expires,
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });
};

export const logout = async () => {
  (await cookies()).set("session", "", {
    expires: new Date(0),
  });
};

export const getSession = async () => {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return null;
  }

  return await decrypt(session);
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return null;
  }

  const parsed = await decrypt(session);
  const exp = new Date(Date.now() + EXPIRES_IN);
  parsed.expires = exp;
  const res = NextResponse.next();
  res.cookies.set("session", await encrypt(parsed), {
    httpOnly: true,
    expires: exp,
  });
  return res;
};
