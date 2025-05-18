"use client";

import { FieldContainer } from "../../_components/ui/field-container";
import { FieldWrapper } from "../../_components/ui/field-wrapper";
import { Label } from "../../_components/ui/label";
import { Input } from "../../_components/ui/input";
import { LockIcon, MailIcon, User2Icon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { toast } from "sonner";
import { FormError } from "../../_components/ui/form-error";
import { useServerAction } from "zsa-react";
import { signUpAction } from "./signup.action";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const {
    execute: signup,
    isPending,
    error,
  } = useServerAction(signUpAction, {
    onError(err) {
      console.log(err);
      toast.error("Failed to sign up");
    },
    onSuccess() {
      toast.success("Signed up successfully", {
        description: "Please check your email to verify your account",
      });
      router.push("/onboard");
    },
  });

  return (
    <form
      action={async (e) => {
        toast.info("Signing up...");
        signup({
          name: e.get("name") as string,
          email: e.get("email") as string,
          password: e.get("password") as string,
          confirmPassword: e.get("confirmPassword") as string,
        });
      }}
      className="space-y-4"
    >
      <FieldContainer>
        <Label htmlFor="name">Full Name</Label>
        <FieldWrapper>
          <User2Icon className="size-4 shrink-0" />
          <Input required type="text" name="name" placeholder="John Doe" />
        </FieldWrapper>
        <FormError error={error?.fieldErrors?.name} />
      </FieldContainer>
      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <FieldWrapper>
          <MailIcon className="size-4 shrink-0" />
          <Input required type="email" name="email" placeholder="Email" />
        </FieldWrapper>
        <FormError error={error?.fieldErrors?.email} />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="password">Password</Label>
        <FieldWrapper>
          <LockIcon className="size-4 shrink-0" />
          <Input
            required
            name="password"
            type="password"
            placeholder="Password"
          />
        </FieldWrapper>
        <FormError error={error?.fieldErrors?.password} />
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <FieldWrapper>
          <LockIcon className="size-4 shrink-0" />
          <Input
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
        </FieldWrapper>
        <FormError error={error?.fieldErrors?.confirmPassword} />
      </FieldContainer>

      <Button className="w-full mt-2" type="submit" isLoading={isPending}>
        Sign Up
      </Button>
    </form>
  );
}
