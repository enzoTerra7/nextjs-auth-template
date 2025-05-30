"use server";

import { adminProcedure } from "@/app/_lib/procedures/admin.procedure";
import { DiContainer } from "@/core/di/container";
import {
  CreateUserSchema,
  DeleteUserSchema,
  EditUserSchema,
} from "./users.definitions";
import { revalidatePath } from "next/cache";

export const getUsers = adminProcedure
  .createServerAction()
  .handler(async () => {
    const userBusiness = DiContainer.get("IUserBusiness");
    const users = await userBusiness.getUsers();

    return users;
  });

export const createUser = adminProcedure
  .createServerAction()
  .input(CreateUserSchema)
  .handler(async ({ input }) => {
    console.log("input", input);
    const userBusiness = DiContainer.get("IUserBusiness");

    await userBusiness.createUser(input);

    revalidatePath("/onboard/users");

    return {
      data: "User created successfully",
    };
  });

export const editUser = adminProcedure
  .createServerAction()
  .input(EditUserSchema)
  .handler(async ({ input: { id, ...input } }) => {
    const userBusiness = DiContainer.get("IUserBusiness");

    await userBusiness.editUser(id, input);

    revalidatePath("/onboard/users");

    return {
      data: "User created successfully",
    };
  });

export const deleteUser = adminProcedure
  .createServerAction()
  .input(DeleteUserSchema)
  .handler(async ({ input: { id } }) => {
    const userBusiness = DiContainer.get("IUserBusiness");

    await userBusiness.deleteUser(id);

    revalidatePath("/onboard/users");

    return {
      data: "User created successfully",
    };
  });
