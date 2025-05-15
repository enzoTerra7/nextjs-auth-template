import "server-only";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/table/user";
import { SignUpFormSchema } from "@/features/auth/signup/signup.definitions";

export async function POST(request: Request) {
  const body = await request.json();

  const safeParsedBody = SignUpFormSchema.safeParse(body);

  if (!safeParsedBody.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: safeParsedBody.error },
      { status: 400 }
    );
  }

  const { name, email, password } = safeParsedBody.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const [newUser] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .onConflictDoNothing()
    .returning();

  return NextResponse.json(
    {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    },
    { status: 201 }
  );
}
