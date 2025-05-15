"use server";
import { signupService } from "@/services/auth/signup/signup.service";
import { SignUpFormSchema } from "./signup.definitions";
import { createSession } from "@/lib/auth/session";

export async function signupAction(formData: FormData) {
  // Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  const response = await signupService(validatedFields.data);

  await createSession({
    userId: response.user.id,
    role: response.user.role,
  });

  return {
    data: response,
  };
}
