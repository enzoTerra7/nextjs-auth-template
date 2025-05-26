import { Button } from "../_components/ui/button";
import { sendGlobalErrorAlert } from "./global-error.action";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: VoidFunction;
}) {
  sendGlobalErrorAlert(error);
  return (
    <>
      <html>
        <body className="flex items-center justify-center w-dvw h-dvh bg-background">
          <h2 className="text-primary text-4xl font-semibold">
            Something went wrong!
          </h2>
          <Button onClick={() => reset()}>Try again</Button>
        </body>
      </html>
    </>
  );
}
