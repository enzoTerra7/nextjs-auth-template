import "server-only";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/table/user";
import { LoginFormSchema } from "@/features/auth/login/login.definitions";

export async function POST(request: Request) {
  const body = await request.json();

  const safeParsedBody = LoginFormSchema.safeParse(body);

  if (!safeParsedBody.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { email, password } = safeParsedBody.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 200 }
  );
}
