import { Card } from "../_components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw">
      <Card className="bg-card/80 p-4 w-full max-w-lg">{children}</Card>
    </div>
  );
}
