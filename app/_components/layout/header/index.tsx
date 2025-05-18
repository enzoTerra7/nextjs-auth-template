import { Logo } from "@/app/_components/ui/logo";

export async function Header() {
  return (
    <header className="w-full h-24 bg-card border-b border-border px-6 lg:px-16 flex items-center justify-between">
      <Logo />
    </header>
  );
}
