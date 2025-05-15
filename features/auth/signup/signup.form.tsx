"use client";

import { FieldContainer } from "@/components/ui/field-container";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LockIcon, MailIcon, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signupAction } from "./signup.action";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { FormError } from "@/components/ui/form-error";

export function SignUpForm() {
  const { mutate, isPending, error } = useMutation({
    async mutationFn(e: FormData) {
      const response = await signupAction(e);
      return response;
    },
    onError() {
      toast.error("Failed to sign up");
    },
    onSuccess() {
      toast.success("Signed up successfully");
    },
    retry: false,
  });

  return (
    <form
      action={async (e) => {
        toast.info("Signing up...");
        mutate(e);
      }}
      className="space-y-4"
    >
      <FieldContainer>
        <Label htmlFor="name">Full Name</Label>
        <FieldWrapper>
          <User2Icon className="size-4 shrink-0" />
          <Input required type="text" name="name" placeholder="John Doe" />
        </FieldWrapper>
        {error?.errors?.name && <FormError>{error.errors.name}</FormError>}
      </FieldContainer>
      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <FieldWrapper>
          <MailIcon className="size-4 shrink-0" />
          <Input required type="email" name="email" placeholder="Email" />
        </FieldWrapper>
        {error?.errors?.email && <FormError>{error.errors.email}</FormError>}
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
        {error?.errors?.password && (
          <FormError>{error.errors.password}</FormError>
        )}
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
        {error?.errors?.confirmPassword && (
          <FormError>{error.errors.confirmPassword}</FormError>
        )}
      </FieldContainer>

      <Button className="w-full mt-2" type="submit" isLoading={isPending}>
        Sign Up
      </Button>
    </form>
  );
}
