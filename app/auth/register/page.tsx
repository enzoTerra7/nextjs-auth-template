import { buttonVariants } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/features/auth/signup/signup.form";
import Link from "next/link";
export default function Register() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to continue</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <SignUpForm />
        <Separator className="mt-2.5" />
        <Link
          href="/auth/login"
          className={buttonVariants({
            variant: "link",
          })}
        >
          Already have an account? Login
        </Link>
      </CardContent>
    </>
  );
}
