import * as React from "react";

interface IEmailErrorAlert {
  error: Error;
}

export const EmailErrorAlertTemplate: React.FC<Readonly<IEmailErrorAlert>> = ({
  error,
}) => (
  <div>
    <h1>ALERT!</h1>
    <p>Something went wrong in system. Follow the details:</p>
    <p>Error name: {String(error.name)}</p>
    <p>Error message: {String(error.message)}</p>
    <p>Error cause: {String(error.cause)}</p>
    <p>Error stack: {String(error.stack)}</p>
  </div>
);
