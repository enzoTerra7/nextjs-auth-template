import * as React from "react";

interface IEmailVerifyTemplate {
  name: string;
  token: string;
}

export const EmailVerifyTemplate: React.FC<Readonly<IEmailVerifyTemplate>> = ({
  name,
  token,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`}
    >
      <button>Verify Email</button>
    </a>
    <p>
      Or click the link below:
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`}
      >
        Verify Email
      </a>
    </p>
    <p>
      After 7 days, if you didn&apos;t verify your email, your account will be
      deleted.
    </p>
  </div>
);
