"use server";

import { DiContainer } from "@/core/di/container";
import { User } from "@/db/table/user";

export async function createUserInDb(user: User) {
  const userBusiness = DiContainer.get("IUserBusiness");

  await userBusiness.createUser({
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return user;
}

export async function deleteUserInDb(user: User) {
  const userBusiness = DiContainer.get("IUserBusiness");

  const users = await userBusiness.getUsers();

  const searchedUser = users.find((e) => e.email === user.email);

  if (!searchedUser) {
    throw new Error("User not found", {
      cause: "not found user",
    });
  }

  await userBusiness.deleteUser(searchedUser.id);
}
