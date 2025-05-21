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
import { useState } from "react";
import { MailIcon, PlusIcon, User2Icon } from "lucide-react";
import { FieldContainer } from "@/app/_components/ui/field-container";
import { Input } from "@/app/_components/ui/input";
import { FormError } from "@/app/_components/ui/form-error";
import { FieldWrapper } from "@/app/_components/ui/field-wrapper";
import { Label } from "@/app/_components/ui/label";
import { Select, SelectItem } from "@/app/_components/ui/select";
import { useServerAction } from "zsa-react";
import { createUser } from "./users.action";
import { toast } from "sonner";

export function CreateUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, error, isPending } = useServerAction(createUser, {
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      toast.success("User created successfully");
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
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Create a new user to get started in your workspace
          </DialogDescription>
        </DialogHeader>
        <form
          action={(e) => {
            toast.info("Creating user...", {
              duration: 2000,
            });
            execute({
              name: e.get("name") as string,
              email: e.get("email") as string,
              role: e.get("role") as "admin" | "user",
            });
          }}
          className="space-y-4"
        >
          <FieldContainer>
            <Label htmlFor="name">Full Name</Label>
            <FieldWrapper>
              <User2Icon className="size-4 shrink-0" />
              <Input
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
            <Label htmlFor="email">Email</Label>
            <FieldWrapper>
              <MailIcon className="size-4 shrink-0" />
              <Input
                disabled={isPending}
                required
                type="email"
                name="email"
                placeholder="Email"
              />
            </FieldWrapper>
            <FormError error={error?.fieldErrors?.email} />
          </FieldContainer>
          <FieldContainer>
            <Label htmlFor="role">Role</Label>
            <FieldWrapper>
              <Select
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
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
