import * as React from "react";

interface INewUserWelcomeTemplate {
  name: string;
  password: string;
}

export const NewUserWelcomeTemplate: React.FC<
  Readonly<INewUserWelcomeTemplate>
> = ({ name, password }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>You have been invited to join in the app. Your password is</p>
    <strong>{password}</strong>
    <p>After your first sign in, you will be asked to change your password.</p>
    <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`}>
      <button>Sign in</button>
    </a>
    <p>
      Or click the link below:
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`}>Sign in</a>
    </p>
    <p>
      After 7 days, if you didn&apos;t verify your email, your account will be
      deleted.
    </p>
  </div>
);
