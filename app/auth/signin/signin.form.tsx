"use client";

import { FieldContainer } from "../../_components/ui/field-container";
import { FieldWrapper } from "../../_components/ui/field-wrapper";
import { Label } from "../../_components/ui/label";
import { Input } from "../../_components/ui/input";
import { LockIcon, MailIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";

import { toast } from "sonner";
import Link from "next/link";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { signInAction } from "./signin.action";
import { FormError } from "@/app/_components/ui/form-error";

export function SigninForm() {
  const router = useRouter();
  const {
    execute: mutate,
    isPending,
    error,
  } = useServerAction(signInAction, {
    onError() {
      toast.error("Failed to login");
    },
    onSuccess() {
      toast.success("Logged in successfully");
      router.push("/onboard");
    },
  });

  console.log("error", error);

  return (
    <form
      action={async (e) => {
        toast.info("Logging in...");
        mutate({
          email: e.get("email") as string,
          password: e.get("password") as string,
        });
      }}
      className="space-y-4"
    >
      <FieldContainer>
        <Label htmlFor="email">Email</Label>
        <FieldWrapper>
          <MailIcon className="size-4 shrink-0" />
          <Input required type="email" name="email" placeholder="Email" />
        </FieldWrapper>
        <FormError error={error?.fieldErrors?.email} />
      </FieldContainer>

      <FieldContainer>
        <div className="w-full flex items-center gap-2 justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/auth/forgot-password"
            className="hover:underline text-right text-xs text-neutral-500 font-medium"
          >
            Forgot password?
          </Link>
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
        <FormError error={error?.fieldErrors?.password} />
      </FieldContainer>

      <Button className="w-full mt-2" type="submit" isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}
