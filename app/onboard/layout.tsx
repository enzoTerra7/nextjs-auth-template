import { Fragment, Suspense } from "react";
import { Header } from "../_components/layout/header";
import { Sidebar } from "../_components/layout/sidebar";
import { verifySession } from "@/app/_lib/auth/dal";
import { redirect } from "next/navigation";
import { Skeleton } from "../_components/ui/skeleton";
import { MessageAlert } from "../_components/ui/message-alert";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <div className="w-dvw h-dvh flex">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          {!session.isVerified && (
            <MessageAlert variant="destructive">
              Please verify your email. If you don&apos;t verify your email,
              your account will be deleted soon.
            </MessageAlert>
          )}
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <div className=" w-full h-full p-4 lg:p-8 space-y-4">
              {children}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}
