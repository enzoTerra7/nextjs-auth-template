import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookie = await getSession();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/auth/signin");
  }

  return {
    isAuth: true,
    role: session.role,
    userId: session.userId,
    isVerified: session.verified,
  };
});

export const getSession = cache(async () => {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return undefined;
  }

  return session;
});

// export const getUser = cache(async () => {
//   const session = await verifySession();
//   if (!session) return null;

//   try {
//     const data = await db.query.users.findMany({
//       where: eq(users.id, session.userId),
//       // Explicitly return the columns you need rather than the whole user object
//       columns: {
//         id: true,
//         name: true,
//         email: true,
//       },
//     });

//     const user = data[0];

//     return user;
//   } catch (error) {
//     console.log("Failed to fetch user");
//     return null;
//   }
// });
