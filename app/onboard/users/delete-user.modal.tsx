"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { PropsWithChildren, useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteUser } from "./users.action";
import { toast } from "sonner";

export function DeleteUserAlert({ id }: { id: number } & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, execute } = useServerAction(deleteUser, {
    onSuccess() {
      toast.success("User deleted successfully");
    },
  });
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e && isPending) {
          return;
        }
        setIsOpen(e);
      }}
    >
      <AlertDialogTrigger className="w-full focus:bg-accent focus:text-accent-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent cursor-pointer">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this user
            account and remove his data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.info("Deleting...", {
                duration: 2000,
              });
              execute({
                id,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
