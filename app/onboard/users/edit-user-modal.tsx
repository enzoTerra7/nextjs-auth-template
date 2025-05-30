"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { MailIcon, User2Icon } from "lucide-react";
import { FieldContainer } from "@/app/_components/ui/field-container";
import { Input } from "@/app/_components/ui/input";
import { FormError } from "@/app/_components/ui/form-error";
import { FieldWrapper } from "@/app/_components/ui/field-wrapper";
import { Label } from "@/app/_components/ui/label";
import { Select, SelectItem } from "@/app/_components/ui/select";
import { useServerAction } from "zsa-react";
import { editUser } from "./users.action";
import { toast } from "sonner";
import { Separator } from "@/app/_components/ui/separator";

export function EditUserModal({
  email,
  name,
  role,
  id,
  children,
}: {
  email: string;
  name: string;
  role: string;
  id: number;
} & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, error, isPending } = useServerAction(editUser, {
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      toast.success("User edited successfully");
      setIsOpen(false);
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e && isPending) {
          return;
        }
        setIsOpen(e);
      }}
    >
      <DialogTrigger className="w-full focus:bg-accent focus:text-accent-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit the user information.</DialogDescription>
        </DialogHeader>
        <form
          action={(e) => {
            toast.info("Editing user...", {
              duration: 2000,
            });
            execute({
              id,
              name: e.get("name") as string,
              role: e.get("role") as "admin" | "user",
            });
          }}
          className="space-y-4"
        >
          <FieldContainer>
            <Label htmlFor="email">Email</Label>
            <FieldWrapper>
              <MailIcon className="size-4 shrink-0" />
              <Input
                defaultValue={email}
                disabled
                readOnly
                type="email"
                name="email"
                placeholder="Email"
              />
            </FieldWrapper>
          </FieldContainer>
          <Separator />
          <FieldContainer>
            <Label htmlFor="name">Full Name</Label>
            <FieldWrapper>
              <User2Icon className="size-4 shrink-0" />
              <Input
                defaultValue={name}
                disabled={isPending}
                required
                type="text"
                name="name"
                placeholder="John Doe"
              />
            </FieldWrapper>
            <FormError error={error?.fieldErrors?.name} />
          </FieldContainer>
          <FieldContainer>
            <Label htmlFor="role">Role</Label>
            <FieldWrapper>
              <Select
                defaultValue={role}
                disabled={isPending}
                required
                name="role"
                placeholder="Select Role"
              >
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </Select>
            </FieldWrapper>
            <FormError error={error?.fieldErrors?.role} />
          </FieldContainer>
          <DialogFooter>
            <Button
              type="reset"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button isLoading={isPending} type="submit">
              Edit User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
