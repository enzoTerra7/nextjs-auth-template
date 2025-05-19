"use client";
import { PageProps } from "@/app/_lib/definitions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Logo } from "@/app/_components/ui/logo";
import { use, useEffect } from "react";
import { verifyEmailAction } from "./verifyEmail.action";
import { useServerAction } from "zsa-react";

export default function VerifyEmailPage({
  searchParams,
}: PageProps<undefined, { token: string }>) {
  const params = use(searchParams);
  const { token } = params;

  if (!token) {
    toast.error("Something went wrong", {
      description: "The url is invalid",
    });
    redirect("/");
  }

  const { execute } = useServerAction(verifyEmailAction, {
    onSuccess: () => {
      toast.success("Email verified successfully");
      redirect("/");
    },
    onError: () => {
      toast.error("Something went wrong", {
        description: "The url is invalid",
      });
      redirect("/");
    },
  });

  useEffect(() => {
    execute({
      token,
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <Logo />
      <h1 className="text-2xl font-bold">Verifying your email...</h1>
      <p className="text-sm text-muted-foreground">
        Please wait while we verify your email.
      </p>
    </div>
  );
}
