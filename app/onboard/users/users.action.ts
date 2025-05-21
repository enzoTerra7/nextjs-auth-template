"use server";

import { adminProcedure } from "@/app/_lib/procedures/admin.procedure";
import { DiContainer } from "@/core/di/container";
import { CreateUserSchema } from "./create-user.definitions";
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

    console.log("user instantiated");

    await userBusiness.createUser(input);

    revalidatePath("/onboard/users");

    return {
      data: "User created successfully",
    };
  });
