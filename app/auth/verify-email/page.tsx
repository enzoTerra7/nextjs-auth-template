import { PageProps } from "@/app/_lib/definitions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailAction } from "./verifyEmail.action";
import { Logo } from "@/app/_components/ui/logo";

export default async function VerifyEmailPage({
  searchParams,
}: PageProps<undefined, { token: string }>) {
  const params = await searchParams;
  const { token } = params;

  if (!token) {
    toast.error("Something went wrong", {
      description: "The url is invalid",
    });
    redirect("/");
  }

  verifyEmailAction({
    token,
  });

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
