"use client";

import { FieldContainer } from "@/components/ui/field-container";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LockIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAction } from "./login.action";
import { toast } from "sonner";
import { FormMessage } from "@/components/ui/form-message";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { FormError } from "@/components/ui/form-error";

export function LoginForm() {
  const { mutate, isPending, error } = useMutation({
    async mutationFn(e: FormData) {
      const response = await loginAction(e);
      return response;
    },
    onError() {
      toast.error("Failed to login");
    },
    onSuccess() {
      toast.success("Logged in successfully");
    },
  });

  return (
    <form
      action={async (e) => {
        toast.info("Logging in...");
        mutate(e);
      }}
      className="space-y-4"
    >
      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <FieldWrapper>
          <MailIcon className="size-4 shrink-0" />
          <Input required type="email" name="email" placeholder="Email" />
        </FieldWrapper>
        {error?.errors?.email && <FormError>{error.errors.email}</FormError>}
      </FieldContainer>

      <FieldContainer>
        <div className="w-full flex items-center gap-2 justify-between">
          <Label htmlFor="password">Password</Label>
          <FormMessage className="text-right">
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </FormMessage>
        </div>
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

      <Button className="w-full mt-2" type="submit" isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}
