import { buttonVariants } from "../../_components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../_components/ui/card";
import { Separator } from "../../_components/ui/separator";
import { SigninForm } from "./signin.form";
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
        <SigninForm />
        <Separator className="mt-2.5" />
        <Link
          href="/auth/signup"
          className={buttonVariants({
            variant: "link",
          })}
        >
          Don&apos;t have an account? Sign up
        </Link>
      </CardContent>
    </>
  );
}
