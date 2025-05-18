import Link from "next/link";

export function Logo() {
  return (
    <Link href="/onboard">
      <span className="text-xl lg:text-2xl font-bold">
        ACME <span className="text-primary">Management</span>
      </span>
    </Link>
  );
}
