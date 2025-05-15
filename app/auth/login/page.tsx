import { buttonVariants } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/features/auth/login/login.form";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <LoginForm />
        <Separator className="mt-2.5" />
        <Link
          href="/auth/register"
          className={buttonVariants({
            variant: "link",
          })}
        >
          Don&apos;t have an account? Register
        </Link>
      </CardContent>
    </>
  );
}
