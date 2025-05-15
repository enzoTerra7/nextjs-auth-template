import { loginService } from "@/services/auth/login/login.service";
import { LoginFormSchema } from "./login.definitions";

export async function loginAction(formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  console.log(validatedFields.data);

  const response = await loginService(validatedFields.data);

  return {
    data: response,
  };
}
